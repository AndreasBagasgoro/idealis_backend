const { User, UserProfile } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    async register(req, res) {
        try {
            const { first_name, last_name, username, email, password, birth_date, gender, height_cm, weight_kg } = req.body;
            
            // Checking if user exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email is already registered' });
            }
            
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(password, salt);
            
            // Generate username if not provided
            let finalUsername = username;
            if (!finalUsername && first_name && last_name) {
                finalUsername = `${first_name}${last_name}`.toLowerCase().replace(/\s+/g, '');
            }
            
            const newUser = await User.create({
                username: finalUsername,
                email,
                password_hash
            });

            await UserProfile.create({
                userId: newUser.id,
                first_name,
                last_name,
                birth_date,
                gender,
                height_cm,
                weight_kg
            });
            
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ 
                where: { email },
                include: [{ model: UserProfile, as: 'profile' }]
            });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            
            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    first_name: user.profile ? user.profile.first_name : null,
                    last_name: user.profile ? user.profile.last_name : null
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
        }
    }
};

module.exports = authController;
