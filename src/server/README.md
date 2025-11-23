# ZEN-MIND Backend Server

Backend API for ZEN-MIND - A comprehensive AI teen companion app focused on promoting mental wellness.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based authentication with bcrypt password hashing
- **User Management**: Complete user profile management with settings and subscriptions
- **Mood Tracking**: Track daily moods with emotions, activities, and detailed analytics
- **Journal System**: Rich journaling with tags, favorites, and AI insights
- **Therapist Matching**: Browse and connect with verified mental health professionals
- **Appointment Booking**: Schedule, manage, and review therapy sessions
- **Chat System**: Real-time messaging with AI and therapist support
- **Resource Library**: Curated mental health resources and educational content
- **Analytics & Statistics**: Comprehensive mood and progress tracking

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting, Input Sanitization
- **Validation**: Express Validator

## 📦 Installation

1. **Install dependencies**:
```bash
cd server
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

Then edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/zen-mind
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

3. **Start MongoDB**:
Make sure MongoDB is running locally or update `MONGODB_URI` with your MongoDB Atlas connection string.

4. **Run the server**:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🗂️ Project Structure

```
server/
├── models/              # Database models
│   ├── User.js
│   ├── Mood.js
│   ├── Journal.js
│   ├── Therapist.js
│   ├── Appointment.js
│   ├── ChatMessage.js
│   ├── Conversation.js
│   └── Resource.js
├── routes/              # API routes
│   ├── auth.js
│   ├── user.js
│   ├── mood.js
│   ├── journal.js
│   ├── therapist.js
│   ├── appointment.js
│   ├── chat.js
│   └── resource.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   └── validation.js
├── utils/               # Utility functions
│   ├── generateToken.js
│   └── errorHandler.js
├── server.js            # Entry point
├── package.json
└── .env.example
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token

### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `PUT /api/users/me/password` - Change password
- `PUT /api/users/me/subscription` - Update subscription
- `POST /api/users/me/check-in` - Daily check-in (streak)
- `DELETE /api/users/me` - Delete account

### Mood Tracking
- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get all mood entries
- `GET /api/moods/stats` - Get mood statistics
- `GET /api/moods/:id` - Get single mood entry
- `PUT /api/moods/:id` - Update mood entry
- `DELETE /api/moods/:id` - Delete mood entry

### Journal
- `POST /api/journals` - Create journal entry
- `GET /api/journals` - Get all journals
- `GET /api/journals/stats` - Get journal statistics
- `GET /api/journals/search` - Search journals
- `GET /api/journals/:id` - Get single journal
- `PUT /api/journals/:id` - Update journal
- `PATCH /api/journals/:id/favorite` - Toggle favorite
- `DELETE /api/journals/:id` - Delete journal

### Therapists
- `GET /api/therapists` - Get all therapists
- `GET /api/therapists/featured` - Get featured therapists
- `GET /api/therapists/search` - Search therapists
- `GET /api/therapists/:id` - Get therapist details
- `POST /api/therapists` - Create therapist profile (Therapist role)
- `PUT /api/therapists/:id` - Update therapist profile
- `DELETE /api/therapists/:id` - Delete therapist profile

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/upcoming` - Get upcoming appointments
- `GET /api/appointments/stats` - Get appointment statistics
- `GET /api/appointments/:id` - Get single appointment
- `PUT /api/appointments/:id` - Update appointment
- `PATCH /api/appointments/:id/cancel` - Cancel appointment
- `PATCH /api/appointments/:id/complete` - Mark as completed
- `POST /api/appointments/:id/review` - Add review
- `DELETE /api/appointments/:id` - Delete appointment

### Chat
- `POST /api/chats/conversations` - Create conversation
- `GET /api/chats/conversations` - Get all conversations
- `GET /api/chats/conversations/:id` - Get single conversation
- `DELETE /api/chats/conversations/:id` - Delete conversation
- `POST /api/chats/:conversationId/messages` - Send message
- `GET /api/chats/:conversationId/messages` - Get messages
- `GET /api/chats/messages/unread` - Get unread count
- `PATCH /api/chats/messages/:id/read` - Mark as read
- `DELETE /api/chats/messages/:id` - Delete message

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/featured` - Get featured resources
- `GET /api/resources/search` - Search resources
- `GET /api/resources/categories` - Get categories
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Create resource (Admin only)
- `PUT /api/resources/:id` - Update resource (Admin only)
- `DELETE /api/resources/:id` - Delete resource (Admin only)
- `PATCH /api/resources/:id/like` - Like resource
- `PATCH /api/resources/:id/download` - Increment download

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Express Validator for request validation
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **CORS**: Cross-Origin Resource Sharing configured
- **Helmet**: Security headers
- **MongoDB Sanitization**: Prevent NoSQL injection
- **Input Sanitization**: Clean user inputs

## 📊 Database Models

### User
- Authentication credentials
- Profile information
- Settings & preferences
- Subscription details
- Streak tracking

### Mood
- Daily mood entries
- Emotions & activities
- Intensity ratings
- Sleep & social data

### Journal
- Rich text entries
- Tags & categories
- Favorites
- AI insights

### Therapist
- Professional credentials
- Specialties & approaches
- Availability schedule
- Ratings & reviews

### Appointment
- Booking details
- Session management
- Payment tracking
- Reviews & ratings

### ChatMessage
- Conversation messages
- AI & therapist chat
- Read status
- Attachments

### Resource
- Educational content
- Categories & tags
- Views & downloads
- Ratings

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing

```bash
npm test
```

## 📝 License

MIT

## 👥 Support

For support, please contact the development team or open an issue in the repository.
