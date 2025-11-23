# 🎯 ZEN-MIND Backend - Commands Cheatsheet

Quick reference for all commands you'll need!

---

## 📦 Initial Setup (Do Once)

```bash
# 1. Navigate to server folder
cd server

# 2. Install dependencies
npm install

# 3. Create .env file (copy from .env.example)
cp .env.example .env

# 4. Edit .env file with your MongoDB connection string
# Use a text editor to update MONGODB_URI
```

---

## 🚀 Running the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

---

## 🌱 Database Seeding

```bash
# Import sample data (users, therapists, resources)
npm run seed

# Delete all data
npm run seed:delete
```

**Sample Credentials After Seeding:**
- User: `user@test.com` / `password123`
- Therapist: `sarah@therapist.com` / `password123`

---

## 🗄️ MongoDB Commands

### Local MongoDB:

```bash
# macOS - Start MongoDB
brew services start mongodb-community@7.0

# macOS - Stop MongoDB
brew services stop mongodb-community@7.0

# macOS - Check status
brew services list | grep mongodb

# Windows - Start MongoDB
net start MongoDB

# Windows - Stop MongoDB
net stop MongoDB

# Linux - Start MongoDB
sudo systemctl start mongod

# Linux - Stop MongoDB
sudo systemctl stop mongod

# Linux - Check status
sudo systemctl status mongod
```

### MongoDB Shell (To view data):

```bash
# Open MongoDB shell
mongosh

# Switch to zen-mind database
use zen-mind

# View collections
show collections

# View all users
db.users.find().pretty()

# View all moods
db.moods.find().pretty()

# Count documents
db.users.countDocuments()

# Exit shell
exit
```

---

## 🧪 Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 16
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get therapists
curl http://localhost:5000/api/therapists

# Create mood entry (replace YOUR_TOKEN with actual JWT token)
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "mood": "happy",
    "intensity": 8,
    "notes": "Had a great day!"
  }'
```

### Using Browser:

Just open these URLs:
- http://localhost:5000/api/health
- http://localhost:5000/api/therapists
- http://localhost:5000/api/resources

---

## 🔧 Troubleshooting Commands

```bash
# Check if port 5000 is in use
# macOS/Linux
lsof -i :5000

# Windows
netstat -ano | findstr :5000

# Kill process on port 5000
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows (replace PID with actual process ID)
taskkill /PID <PID> /F

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache (if install issues)
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Useful File Locations

```
/server
├── .env                    # Your environment variables (CREATE THIS!)
├── .env.example            # Example environment file
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── models/                 # Database models
├── routes/                 # API endpoints
├── middleware/             # Auth and validation
└── utils/                  # Helper functions
    └── seeder.js          # Data seeding utility
```

---

## 🌐 Default Ports

- **Backend API:** http://localhost:5000
- **MongoDB (local):** mongodb://localhost:27017
- **Frontend (typical):** http://localhost:3000

---

## ⚡ Quick Workflow

```bash
# 1. Start MongoDB (if using local)
brew services start mongodb-community  # macOS
# or
sudo systemctl start mongod            # Linux

# 2. Start backend
cd server
npm run dev

# 3. In another terminal - seed data (optional)
cd server
npm run seed

# 4. Test
curl http://localhost:5000/api/health

# 5. When done
# Press Ctrl+C to stop server
# Stop MongoDB if needed
```

---

## 🎯 Most Common Commands

You'll use these 90% of the time:

```bash
# Start server in dev mode
npm run dev

# Add sample data
npm run seed

# Test health
curl http://localhost:5000/api/health
```

---

## 📊 Monitoring

```bash
# Watch server logs
# Server logs appear in terminal where you ran `npm run dev`

# Check MongoDB logs (local installation)
# macOS
tail -f /usr/local/var/log/mongodb/mongo.log

# Linux
sudo tail -f /var/log/mongodb/mongod.log
```

---

## 🔐 Environment Variables Quick Reference

```env
PORT=5000                          # Server port
NODE_ENV=development               # development or production
MONGODB_URI=mongodb://...          # Your MongoDB connection
JWT_SECRET=your-secret-key         # JWT signing key (min 32 chars)
JWT_EXPIRE=7d                      # Token expiration
CLIENT_URL=http://localhost:3000   # Frontend URL
```

---

## 🆘 Get Help

```bash
# View README
cat README.md

# View setup guide
cat SETUP.md

# View this cheatsheet
cat COMMANDS_CHEATSHEET.md
```

---

**Pro Tip:** Bookmark this file! Keep it open while developing. 📌

---

Need more help? Check the detailed guides:
- **QUICK_START.md** - Step-by-step setup
- **SETUP.md** - Comprehensive setup guide
- **README.md** - Full API documentation
