# 🚀 Quick Start Guide - Run Backend Locally

Follow these simple steps to get your ZEN-MIND backend running locally in **under 10 minutes**!

---

## 📋 Step 1: Install MongoDB

You have **two options** - choose the one that works best for you:

### Option A: MongoDB Atlas (Cloud) - **RECOMMENDED FOR BEGINNERS** ✨

**No installation needed! Free forever!**

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

2. **Create a cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select a cloud provider and region close to you
   - Click "Create Cluster"

3. **Create a database user:**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `zenmind`
   - Password: `yourpassword123` (remember this!)
   - User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist your IP:**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get your connection string:**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)
   - **IMPORTANT:** Replace `<password>` with your actual password!
   
   Example:
   ```
   mongodb+srv://zenmind:yourpassword123@cluster0.xxxxx.mongodb.net/zen-mind?retryWrites=true&w=majority
   ```

✅ **Done!** Skip to Step 2.

---

### Option B: Local MongoDB Installation

Choose your operating system:

#### **macOS:**
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Verify it's running
brew services list | grep mongodb
```

#### **Windows:**
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install as a Windows Service (check the box)
5. Open Command Prompt and verify:
```cmd
mongod --version
```

#### **Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

---

## 📦 Step 2: Install Backend Dependencies

Open your terminal and navigate to the server folder:

```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install
```

You should see all packages installing. This may take 1-2 minutes.

---

## 🔧 Step 3: Create Environment File

Create a `.env` file in the `/server` directory:

```bash
# Copy the example file
cp .env.example .env
```

**OR** manually create a file named `.env` and paste this:

### If using MongoDB Atlas (Option A):
```env
PORT=5000
NODE_ENV=development

# Replace this with YOUR connection string from Atlas!
MONGODB_URI=mongodb+srv://zenmind:yourpassword123@cluster0.xxxxx.mongodb.net/zen-mind?retryWrites=true&w=majority

JWT_SECRET=zen-mind-super-secret-jwt-key-2024-mental-health-app
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:3000
```

### If using Local MongoDB (Option B):
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/zen-mind

JWT_SECRET=zen-mind-super-secret-jwt-key-2024-mental-health-app
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:3000
```

⚠️ **IMPORTANT:** 
- For Atlas: Replace the `MONGODB_URI` with YOUR actual connection string!
- The `JWT_SECRET` should be a long random string in production.

---

## 🎯 Step 4: Start the Server

In the `/server` directory, run:

```bash
# Start the server
npm start
```

**OR** for development mode with auto-reload:

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net (or localhost)
🚀 Server is running on port 5000 in development mode
```

🎉 **SUCCESS!** Your backend is now running at `http://localhost:5000`

---

## ✅ Step 5: Test the Connection

### Test 1: Health Check

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "ZEN-MIND API is running",
  "timestamp": "2025-11-11T..."
}
```

### Test 2: Register a User

Open a new terminal and run:

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

You should get a response with a JWT token!

---

## 🌱 Step 6: Add Sample Data (Optional but Recommended)

Load sample users, therapists, and resources:

```bash
# In the /server directory
node utils/seeder.js -i
```

This creates:
- **Test User:** `user@test.com` / `password123`
- **Therapist:** `sarah@therapist.com` / `password123`
- Sample therapist profiles
- Sample mental health resources

To delete all data:
```bash
node utils/seeder.js -d
```

---

## 🎨 Step 7: Connect Frontend to Backend

In your **frontend** code, you'll make API calls to:

```
http://localhost:5000/api
```

Example in your React components:

```javascript
// Example: Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data.token); // Your JWT token
```

---

## 🛠️ Troubleshooting

### Problem: "MongoServerError: bad auth"
**Solution:** Check your username and password in the MongoDB Atlas connection string.

### Problem: "ECONNREFUSED localhost:27017"
**Solution:** 
- For local MongoDB: Make sure MongoDB is running
  ```bash
  # macOS
  brew services start mongodb-community
  
  # Windows
  net start MongoDB
  
  # Linux
  sudo systemctl start mongod
  ```

### Problem: "Port 5000 already in use"
**Solution:** Change the `PORT` in your `.env` file to `5001` or any other port.

### Problem: "Cannot find module"
**Solution:** Make sure you ran `npm install` in the `/server` directory.

### Problem: MongoDB Atlas - "IP not whitelisted"
**Solution:** 
1. Go to Network Access in Atlas
2. Add your current IP or use `0.0.0.0/0` (allow from anywhere) for development

---

## 📚 Available API Endpoints

Once running, you can access:

- **Authentication:**
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - Login user

- **Moods:**
  - `POST /api/moods` - Create mood entry
  - `GET /api/moods` - Get all moods
  - `GET /api/moods/stats` - Get mood statistics

- **Journals:**
  - `POST /api/journals` - Create journal entry
  - `GET /api/journals` - Get all journals

- **Therapists:**
  - `GET /api/therapists` - Get all therapists
  - `GET /api/therapists/featured` - Get featured therapists

- **And many more!** See `README.md` for complete list.

---

## 🔒 Security Notes

For **development:**
- The current `.env` settings are fine

For **production:**
- Use a strong, random `JWT_SECRET` (at least 32 characters)
- Set `NODE_ENV=production`
- Use MongoDB Atlas with proper IP whitelisting
- Enable MongoDB authentication
- Use HTTPS

---

## 🎉 You're All Set!

Your backend is now running and ready to handle requests from your ZEN-MIND frontend!

**Next Steps:**
1. Test the API endpoints using Postman or curl
2. Connect your React frontend
3. Start building features!

**Need help?** Check the full `README.md` and `SETUP.md` files for more details.

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

To stop MongoDB (if running locally):

```bash
# macOS
brew services stop mongodb-community

# Windows
net stop MongoDB

# Linux
sudo systemctl stop mongod
```

---

**Happy coding! 🚀**
