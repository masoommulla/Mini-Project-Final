# ZEN-MIND Backend Setup Guide

Complete guide to set up and run the ZEN-MIND backend server.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community) OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database)
- **npm** or **yarn** package manager (comes with Node.js)

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/zen-mind

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zen-mind?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

⚠️ **IMPORTANT**: Change the `JWT_SECRET` to a long, random string in production!

### Step 3: Start MongoDB

#### Option A: Local MongoDB
If using local MongoDB, start the MongoDB service:

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string and update `MONGODB_URI` in `.env`

### Step 4: Seed Sample Data (Optional)

Import sample users, therapists, and resources:

```bash
npm run seed
```

This will create:
- Test user account: `user@test.com` / `password123`
- Therapist account: `sarah@therapist.com` / `password123`
- Sample therapist profiles
- Sample mental health resources

To delete all data:
```bash
npm run seed:delete
```

### Step 5: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## ✅ Verify Installation

### Check Server Health

Open your browser or use curl:
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "ZEN-MIND API is running",
  "timestamp": "2025-11-11T..."
}
```

### Test Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "age": 16
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

You'll receive a JWT token that you can use for authenticated requests.

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes |
| `JWT_EXPIRE` | JWT token expiration | 7d | No |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | 900000 | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 | No |

### MongoDB Connection

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/zen-mind
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zen-mind?retryWrites=true&w=majority
```

**MongoDB with Authentication:**
```env
MONGODB_URI=mongodb://username:password@localhost:27017/zen-mind
```

## 📡 API Testing

### Using Postman

1. Import the API endpoints into Postman
2. Create an environment with variables:
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: (set after login)

### Using curl

**Get all therapists:**
```bash
curl http://localhost:5000/api/therapists
```

**Create mood entry (requires authentication):**
```bash
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "mood": "happy",
    "intensity": 8,
    "notes": "Had a great day!"
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: bad auth"**
- Check your MongoDB credentials
- Ensure user has proper permissions

**Error: "MongooseServerSelectionError"**
- Ensure MongoDB is running
- Check if the connection string is correct
- For Atlas, ensure your IP is whitelisted

### Port Already in Use

If port 5000 is already in use:
1. Change `PORT` in `.env` to another port (e.g., 5001)
2. Or kill the process using port 5000:

**macOS/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### JWT Token Issues

**Error: "Not authorized"**
- Ensure you're including the token in the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN`
- Check if token is expired (default: 7 days)

### Validation Errors

Check the error response for specific validation issues:
- Password must be at least 6 characters
- Age must be between 13-19 for users
- Email must be valid format

## 📊 Database Management

### View Database Contents

**Using MongoDB Compass (GUI):**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MongoDB URI
3. Browse collections: users, moods, journals, etc.

**Using MongoDB Shell:**
```bash
mongosh
use zen-mind
db.users.find()
db.moods.find()
```

### Backup Database

```bash
mongodump --db zen-mind --out ./backup
```

### Restore Database

```bash
mongorestore --db zen-mind ./backup/zen-mind
```

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong, random string
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB authentication
- [ ] Enable rate limiting (already configured)
- [ ] Review and adjust rate limits as needed
- [ ] Set up monitoring and logging
- [ ] Regular database backups

## 🚀 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create zen-mind-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git push heroku main
```

### Deploy to Railway

1. Install Railway CLI
2. Run `railway init`
3. Add environment variables in Railway dashboard
4. Deploy: `railway up`

### Deploy to DigitalOcean

1. Create a Droplet with Node.js
2. Clone your repository
3. Set up PM2 for process management
4. Configure nginx as reverse proxy
5. Set up SSL with Let's Encrypt

## 📞 Support

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review server logs for error messages
3. Ensure all dependencies are installed correctly
4. Verify MongoDB is running and accessible

## 🎉 Next Steps

Once the backend is running:

1. Test all API endpoints
2. Connect the frontend application
3. Configure environment variables for production
4. Set up monitoring and logging
5. Implement additional features as needed

Happy coding! 🚀
