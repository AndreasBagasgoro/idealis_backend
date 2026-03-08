# Idealis Backend

Backend API untuk aplikasi Idealis yang dibangun dengan Node.js dan Express.js.

## 🚀 Fitur

- RESTful API dengan Express.js
- CORS support
- Request logging dengan Morgan
- Error handling middleware
- Environment variables dengan dotenv
- Sample CRUD operations untuk users

## 📋 Prerequisites

- Node.js (version 14 atau lebih tinggi)
- npm atau yarn

## 🛠 Installation

1. Clone repository ini atau pastikan Anda berada di folder backend
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy file `.env.example` ke `.env` dan sesuaikan konfigurasi:
   ```bash
   cp .env.example .env
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server akan berjalan di `http://localhost:3000` (atau port yang Anda tentukan di environment variable).

## 📚 API Endpoints

### Base Endpoints
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api` - API information

### Users Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Sample API Calls

#### Get all users
```bash
curl http://localhost:3000/api/users
```

#### Create a new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'
```

## 🏗 Project Structure

```
src/
├── config/          # Configuration files
│   └── config.js    # App configuration
├── controllers/     # Route controllers (ready for future use)
├── middleware/      # Custom middleware
│   ├── errorHandler.js
│   └── logger.js
├── routes/          # API routes
│   ├── api.js       # Main API routes
│   └── users.js     # User routes
└── index.js         # Main application file
```

## 🔧 Environment Variables

Lihat file `.env` untuk konfigurasi yang tersedia:

- `PORT` - Port server (default: 3000)
- `NODE_ENV` - Environment mode
- `CORS_ORIGIN` - CORS origin settings

## 📝 TODO

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Add authentication & authorization
- [ ] Add input validation
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add rate limiting
- [ ] Add caching

## 🤝 Contributing

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini menggunakan lisensi MIT.