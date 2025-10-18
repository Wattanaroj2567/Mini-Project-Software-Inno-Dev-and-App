# 📚 Fiction Book Review Application

A full-stack web application for reviewing and discovering fiction books, built with React and Node.js. Users can browse books, create reviews, manage their profiles, and interact with a community of book lovers.

## 🌟 Features

- **User Authentication**: Secure login/register with JWT tokens and Google OAuth
- **Book Management**: Browse and search through a curated collection of fiction books
- **Review System**: Create, edit, and delete book reviews with ratings
- **User Profiles**: Manage personal information and view review history
- **Responsive Design**: Modern UI/UX with Material-UI components
- **Real-time Updates**: Live data synchronization with React Query
- **Email Notifications**: Password reset and account verification via email

## 🏗️ Project Structure

```
fiction-book-review/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── books/         # Book-related components
│   │   │   ├── common/        # Shared components
│   │   │   ├── icons/         # Custom icons
│   │   │   ├── layout/        # Layout components
│   │   │   └── reviews/       # Review components
│   │   ├── contexts/          # React Context providers
│   │   ├── lib/              # Utility libraries
│   │   └── pages/            # Page components
│   ├── public/               # Static assets
│   ├── Dockerfile           # Client Docker configuration
│   └── package.json         # Client dependencies
├── server/                   # Node.js Backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── core/            # Core middleware and services
│   │   ├── features/        # Feature modules
│   │   │   ├── auth/        # Authentication
│   │   │   ├── books/       # Book management
│   │   │   ├── reviews/     # Review system
│   │   │   └── users/       # User management
│   │   ├── model-registry/  # Database model registry
│   │   ├── public/          # Static files
│   │   └── seeders/         # Database seeders
│   ├── uploads/             # File uploads
│   ├── Dockerfile          # Server Docker configuration
│   └── package.json        # Server dependencies
├── docker-compose.yml       # Multi-container setup
└── README.md               # Project documentation
```

## 🛠️ Technology Stack

### Frontend (Client)
- **React 19.1.1** - UI library
- **Vite 7.1.4** - Build tool and dev server
- **Material-UI 7.3.2** - Component library
- **React Router DOM 7.8.2** - Client-side routing
- **React Query 5.87.1** - Data fetching and caching
- **React Hook Form 7.62.0** - Form management
- **Zod 4.1.5** - Schema validation
- **Axios 1.11.0** - HTTP client
- **React Hot Toast 2.6.0** - Notifications

### Backend (Server)
- **Node.js 22.12.0+** - Runtime environment
- **Express 5.1.0** - Web framework
- **Sequelize 6.37.7** - ORM for MySQL
- **MySQL 8.0** - Database
- **JWT 9.0.2** - Authentication tokens
- **Passport.js 0.7.0** - Authentication middleware
- **Google OAuth 2.0** - Social authentication
- **Nodemailer 7.0.6** - Email service
- **Multer 2.0.2** - File upload handling
- **Helmet 8.1.0** - Security headers
- **CORS 2.8.5** - Cross-origin resource sharing
- **Express Rate Limit 8.1.0** - Rate limiting

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Ngrok** - Tunneling for development
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites
- Node.js 22.12.0 or higher
- Docker and Docker Compose
- MySQL 8.0 (or use Docker)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Wattanaroj2567/Mini-Project-Software-Inno-Dev-and-App.git
   cd Mini-Project-Software-Inno-Dev-and-App
   ```

2. **Environment Setup**
   ```bash
   # Copy environment files
   cp server/.env.example server/.env
   cp client/.env.example client/.env.local
   
   # Edit the environment variables
   nano server/.env
   nano client/.env.local
   ```

3. **Using Docker Compose (Recommended)**
   ```bash
   # Start all services
   docker-compose up --build
   
   # Or run in background
   docker-compose up -d --build
   ```

4. **Manual Setup (Alternative)**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   
   # Start database (if not using Docker)
   # Configure MySQL and run migrations
   
   # Start server
   cd ../server
   npm run dev
   
   # Start client (in new terminal)
   cd client
   npm run dev
   ```

### Environment Variables

#### Server (.env)
```env
NODE_ENV=development
PORT=8080
CLIENT_ORIGINS=http://localhost:5173
CLIENT_URL=http://localhost:5173
SERVER_HOST=localhost

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Database Configuration
DB_NAME=fiction_book_review
DB_USER=root
DB_PASS=password
DB_HOST=localhost
DB_PORT=3306

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM_ADDRESS=noreply@fictionbookreview.com

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback

# Ngrok (Optional)
NGROK_AUTHTOKEN=your_ngrok_token
```

#### Client (.env.local)
```env
VITE_API_BASE=http://localhost:8080/api
VITE_PROXY_TARGET=http://localhost:8080
```

## 📱 Usage

### Accessing the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:3307 (if using Docker)

### Key Features
1. **Registration/Login**: Create an account or sign in with Google
2. **Browse Books**: View the collection of fiction books
3. **Create Reviews**: Write and rate book reviews
4. **Manage Profile**: Update personal information and avatar
5. **View Reviews**: See reviews from other users

## 🔧 Development

### Available Scripts

#### Client
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

#### Server
```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run db:sync      # Sync database models
npm run seed:books   # Seed book data
npm run seed:all     # Run all seeders
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Database Management
```bash
# Sync database models
npm run db:sync

# Seed initial data
npm run seed:all

# Reset database (Docker)
docker-compose down -v
docker-compose up --build
```

## 🐳 Docker Configuration

The application uses Docker Compose for easy deployment:

- **client**: React development server on port 5173
- **server**: Node.js API server on port 8080
- **db**: MySQL database on port 3307
- **ngrok**: Tunneling service for external access

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS protection
- Helmet security headers
- Input validation and sanitization
- File upload restrictions

## 📊 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `PUT /api/auth/reset-password` - Password reset
- `DELETE /api/auth/account` - Delete user account (requires authentication)
- `GET /api/auth/google` - Initiate Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Books (`/api/books`)
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID

### Reviews (`/api/reviews`)
- `POST /api/reviews/books/:bookId/reviews` - Create review for a book (requires authentication)
- `GET /api/reviews/books/:bookId/reviews` - Get all reviews for a specific book
- `GET /api/reviews/users/:userId/reviews` - Get all reviews by a specific user
- `PUT /api/reviews/:reviewId` - Update review (requires authentication)
- `DELETE /api/reviews/:reviewId` - Delete review (requires authentication)

### Users (`/api/users`)
- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile with optional profile image (requires authentication)
- `PUT /api/users/email` - Update user email (requires authentication)
- `PUT /api/users/password` - Update user password (requires authentication)

## 📝 API Request/Response Examples

### Authentication Examples

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "displayName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "displayName": "John Doe",
      "email": "john@example.com",
      "profileImage": "https://example.com/avatar.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Book Examples

#### Get All Books
```http
GET /api/books
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A classic American novel...",
      "imageUrl": "https://example.com/book1.jpg",
      "averageRating": 4.5,
      "reviewCount": 120
    }
  ]
}
```

### Review Examples

#### Create Review
```http
POST /api/reviews/books/1/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```

#### Get Book Reviews
```http
GET /api/reviews/books/1/reviews
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Excellent book! Highly recommended.",
      "createdAt": "2024-01-15T10:30:00Z",
      "user": {
        "id": 1,
        "displayName": "John Doe",
        "profileImage": "https://example.com/avatar.jpg"
      }
    }
  ]
}
```

### User Profile Examples

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "displayName": "John Smith",
  "profileImage": <file>
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Wattanaroj2567** - *Initial work* - [GitHub](https://github.com/Wattanaroj2567)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- React Query for efficient data fetching
- Sequelize for database management
- The open-source community for various packages and tools

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Reading! 📚✨**
