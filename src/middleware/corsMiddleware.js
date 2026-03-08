const cors = require('cors');

const corsOptions = {
    origin: function (origin, callback) {
        // Daftar domain yang diizinkan
        const whitelist = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173', // Vite default
            process.env.FRONTEND_URL
        ];
        
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);