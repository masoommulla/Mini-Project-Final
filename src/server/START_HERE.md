# ⭐ START HERE - Super Simple Guide

**Never set up a backend before? No problem!** Follow these 5 simple steps:

---

## 🎯 The 5-Minute Setup

### Step 1️⃣ - Get MongoDB (Choose ONE option)

#### **OPTION A: MongoDB Atlas (Cloud - EASIEST)** ⭐ Recommended

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free
3. Create a free cluster (click through the defaults)
4. Create a database user (username: `zenmind`, password: `test123`)
5. Whitelist all IPs: Click "Network Access" → "Add IP" → "Allow Access from Anywhere"
6. Get connection string: Click "Connect" → "Connect your application" → Copy the string
7. **Remember your connection string!** It looks like:
   ```
   mongodb+srv://zenmind:test123@cluster0.xxxxx.mongodb.net/zen-mind
   ```

**⏱️ Time:** 5 minutes  
**✅ Done!** Go to Step 2

---

#### **OPTION B: Local MongoDB**

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Windows:**
- Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Run installer → Install as Windows Service
- Done! MongoDB is running

**Linux:**
```bash
sudo apt-get install mongodb-org
sudo systemctl start mongod
```

---

### Step 2️⃣ - Install Dependencies

Open your terminal:

```bash
cd server
npm install
```

**⏱️ Time:** 1-2 minutes  
**✅ Done!** Wait for packages to install

---

### Step 3️⃣ - Create .env File

**Copy the example file:**

```bash
cp .env.example .env
```

**Then edit the `.env` file** (use any text editor):

**If using MongoDB Atlas:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://zenmind:test123@cluster0.xxxxx.mongodb.net/zen-mind
JWT_SECRET=my-super-secret-key-for-zen-mind-app
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**If using Local MongoDB:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/zen-mind
JWT_SECRET=my-super-secret-key-for-zen-mind-app
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

⚠️ **IMPORTANT:** Replace the `MONGODB_URI` with YOUR connection string!

**⏱️ Time:** 30 seconds  
**✅ Done!** Save the file

---

### Step 4️⃣ - Start the Server

```bash
npm start
```

**You should see:**
```
✅ MongoDB Connected: ...
🚀 Server is running on port 5000 in development mode
```

🎉 **SUCCESS!** Your backend is running!

**⏱️ Time:** 5 seconds  
**✅ Done!**

---

### Step 5️⃣ - Test It Works

**Open your browser and go to:**
```
http://localhost:5000/api/health
```

**You should see:**
```json
{
  "success": true,
  "message": "ZEN-MIND API is running",
  "timestamp": "..."
}
```

**⏱️ Time:** 5 seconds  
**✅ Done!** Your backend is working! 🎉

---

## 🌱 BONUS: Add Sample Data (Optional)

Want to test with real data? Open a **NEW terminal** and run:

```bash
cd server
npm run seed
```

This adds:
- Test user: `user@test.com` / `password123`
- Therapists
- Mental health resources

**Now you can login and test!**

---

## 🎮 Now What?

Your backend is running! Here's what you can do:

### ✅ Test the API

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "age": 16
  }'
```

### ✅ Connect Your Frontend

In your React app, make API calls to:
```
http://localhost:5000/api
```

Example:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
});
const data = await response.json();
```

### ✅ View Your Data

If you want to see what's in your database:

**MongoDB Atlas:**
- Go to your cluster → Browse Collections

**Local MongoDB:**
```bash
mongosh
use zen-mind
db.users.find()
```

---

## 🛑 How to Stop

**Stop the server:**
- Press `Ctrl + C` in the terminal

**Stop MongoDB (if local):**
```bash
# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod
```

---

## ❓ Something Wrong?

### "Can't connect to MongoDB"
- **Atlas:** Check your connection string has the correct password
- **Local:** Make sure MongoDB is running

### "Port 5000 already in use"
- Change `PORT=5001` in your `.env` file

### "npm install fails"
- Try: `npm cache clean --force` then `npm install` again

### "Module not found"
- Make sure you're in the `/server` folder
- Run `npm install` again

---

## 📚 Want More Details?

Check these guides:
- **QUICK_START.md** - Detailed setup instructions
- **COMMANDS_CHEATSHEET.md** - All commands in one place
- **README.md** - Complete API documentation
- **SETUP.md** - Advanced configuration

---

## 🎉 That's It!

You now have a **fully functional backend** running with:
- ✅ User authentication (JWT)
- ✅ MongoDB database
- ✅ Mood tracking API
- ✅ Journal API
- ✅ Therapist system
- ✅ Appointment booking
- ✅ Chat system
- ✅ Resources library

**Total setup time:** ~5-10 minutes

**You're ready to build!** 🚀

---

**Questions?** Check the other guides or the troubleshooting sections.

**Happy coding!** 💙
