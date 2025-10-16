# 💬 ChatHub

A real-time chat application built with the MERN stack and Socket.io, enabling seamless communication with friends from anywhere in the world.

🔗 **[Live Demo](https://chat-app-jm55l.sevalla.app/)**

![ChatHub Login](./Frontend/public/img1.png)
![ChatHub Chat Interface](./Frontend/public/img2.png)

## ✨ Features

- **Real-time Messaging** - Instant message delivery using WebSocket technology
- **User Authentication** - Secure sign-up and login system
- **Online Status** - See when your contacts are online or offline
- **Chat History** - Access your previous conversations
- **Modern UI** - Clean and intuitive interface with dark mode
- **Image Sharing** - Send and receive images in conversations
- **Bot Protection** - Arcjet integration to prevent spam and malicious activities
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Socket.io Client

**Backend:**
- Node.js
- Express.js
- Socket.io
- MongoDB

**Additional Services:**
- Cloudinary (Image storage)
- Arcjet (Bot protection)
- Sevalla (Deployment)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krushna/ChatHub
   ```

2. **Navigate to the project directory**
   ```bash
   cd Chat-App
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ARCJET_KEY=your_arcjet_key
   PORT=3000
   ```

5. **Run the application**
   
   For development:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Chat-App/
├── client/          # React frontend
├── server/          # Express backend
├── models/          # MongoDB schemas
├── routes/          # API routes
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
└── socket/          # Socket.io configuration
```

## 🎯 Usage

1. **Sign Up** - Create a new account with your email and password
2. **Login** - Access your account with your credentials
3. **Find Contacts** - Browse and add contacts to start chatting
4. **Start Chatting** - Select a contact and begin your real-time conversation
5. **Share Images** - Click the image icon to upload and share photos

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Arcjet bot protection to prevent automated attacks
- Input validation and sanitization

## 🌟 Future Enhancements

- Group chat functionality
- Message reactions and emojis
- Read receipts
- Typing indicators
- Push notifications
- File sharing 


## 👨‍💻 Author

**Krushna Raut**

- GitHub: [@Krushna](https://github.com/Krushna)

## 📧 Contact

For any queries or suggestions, feel free to reach out!

---

**Note:** This is a personal project created to explore WebSocket technology and real-time communication patterns.
