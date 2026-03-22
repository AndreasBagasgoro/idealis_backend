const UserRepository = require('../repositories/userRepositories');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mengambil environment variables atau menggunakan default text jika kosong
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';

const registerUser = async(userData) => {
    // 1. Cek duplikasi email
    const existingUser = await UserRepository.findByEmail(userData.email);
    if(existingUser) throw new Error("Email sudah digunakan oleh akun lain");

    // 2. Hash password sebelum simpan (`password_hash` akan mengisi model sesuai DB)
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUserParams = { ...userData, password_hash: hashedPassword };
    delete newUserParams.password; // Hindari masuknya key password polos ke query db

    const newUser = await UserRepository.createUser(newUserParams);
    return newUser;
};

const loginUser = async(email, password) => {
    const user = await UserRepository.findByEmail(email);
    if(!user) throw new Error("Email atau password tidak valid");

    // Validasi hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if(!isPasswordValid) throw new Error("Email atau password tidak valid");

    // 1. Buat Access Token untuk di-attach ke header Auth (Umur pendek dan rawan dicuri, misal: 15 menit)
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "15m" });
    
    // 2. Buat Refresh Token untuk 'memanjang-panjangkan' umur Access Tokennya (Umur panjang, misal: 7 hari)
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // 3. Simpan Refresh Token ke Database lewat repository
    await UserRepository.updateRefreshToken(user.id, refreshToken);

    const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        profile: user.profile
    };

    return { user: userData, accessToken, refreshToken };
};

const refreshAccessToken = async(refreshToken) => {
    if (!refreshToken) throw new Error("Refresh token tidak boleh kosong");

    // 1. Cek validitas refresh token di dalam tabel pencarian Database 
    // Mencegah manipulasi/dicuri oleh hacker
    const user = await UserRepository.findByRefreshToken(refreshToken);
    if (!user) throw new Error("Refresh token ini sudah dilarang atau tidak terdaftar di database");

    return new Promise((resolve, reject) => {
        // 2. Verifikasi waktu expired JWT pada refresh token (apakah sudah 7 hari?)
        jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return reject(new Error("Refresh token telah kedaluwarsa, silakan login kembali"));

            // 3. Hanya jika sah & tercatat di database, terbitkan Access Token *Baru* (15 menit)
            const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "15m" });
            
            resolve({ accessToken: newAccessToken });
        });
    });
};

const logoutUser = async (userId) => {
    if(!userId) throw new Error("User ID tidak valid untuk permintaan logout");

    // MENGHAPUS (Null) jejak refresh token dari Database.
    // Jika ada yang mencoba memakai "refreshAccessToken" dengan token ini nanti, DB akan merespon Gagal.
    await UserRepository.updateRefreshToken(userId, null);
    
    return { success: true, message: "Berhasil logout. Sesi refresh token dihapus murni dari database." };
};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
};
