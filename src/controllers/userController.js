
const userService = require('../services/userService');

const userController = {
    // Get All User
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();

            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
            });
        }
    },

    
    // Get User by ID
    async getUserById(req, res){
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
            });
        }
    },

    async createUser(req, res){
        try {
            const userData = req.body;
            const newUser = await userService.createUser(userData);

            res.status(201).json({
                success: true,
                message: "Berhasil membuat user",
                data: newUser
            })
        } catch (error) {
            console.error('Error creating user: ', error);
            res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            });
        }
    },

    async updateUser(req, res){
        try {
            const { id } = req.params;
            const userData = req.body;
            const updateUser = await userService.updateUser(id, userData);

            if(!updateUser){
                return res.status(404).json({
                    success: false,
                    message: 'User tidak ditemukan'
                });

            }
            res.status(200).json({
                success: true,
                message: 'Berhasil memperbarui User',
                data: updateUser
            });
        } catch (error) {
            console.error('Gagal memperbarui user :', error);
            req.status(500).json({
                success: false,
                message: 'Gagal memperbarui user',
                error: error.message
            })
        } 
    },

    async deleteUser(req, res){
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);

            if(!deletedUser){
                return req.status(404).json({
                    success: false,
                    message: 'User tidak ditemukan'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus user'
            });
        } catch (error) {
            console.error('Error deleting user: ', error);
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus user',
                error: error.message
            });
        }
    }

}

module.exports = userController;