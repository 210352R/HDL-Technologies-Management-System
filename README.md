# HDL Technologies Management System

A comprehensive computer repair and sales shop management system designed specifically for laptop repair businesses in Sri Lanka.

## 📱 Multi-Platform Solution

- **🌐 Web Application** - Browser-based access for shop management
- **💻 Desktop Application** - Native desktop client for in-shop operations  
- **📱 Mobile Application** - On-the-go management and notifications

## 📋 About

HDL Technologies Management System is a specialized shop management solution tailored for laptop repair businesses. The system streamlines the entire repair workflow from customer intake to completion tracking.

### Core Functionality

**Customer & Laptop Management:**
- When customers bring laptops for repair, shop workers can easily enter customer and device information
- Comprehensive tracking of repair work performed on each device
- Real-time status updates accessible to both shop owners and customers
- Unique QR code generation for each laptop to enable easy identification
- Historical repair tracking - when the same laptop returns, view all previous repair records

**External Shop Orders:**
- Dedicated interface for processing orders from partner/external shops
- Bill generation and management for external clients
- Real-time updates and status tracking for external orders

## ✨ Key Advantages

- **Paperless Operations** - Eliminate manual record keeping and reduce errors
- **Enhanced Customer Experience** - Customers can track repair status in real-time
- **Improved Efficiency** - Quick access to device history and repair records
- **Better Inventory Management** - Track parts and components usage
- **Scalable Solution** - Supports multiple shops and external partnerships
- **Data Security** - Secure cloud storage with backup and recovery
- **Cost Effective** - Reduces operational costs and improves profitability
- **Professional Image** - Modern system enhances business credibility

## 🚀 Key Features

### 🔐 Authentication & Security
- **Role-based authentication** with different access levels
- Secure user management for shop workers, managers, and customers
- Firebase Authentication integration

### 📱 Multi-Platform Support
- **Web Application** for browser-based access
- **Desktop Application** built with Electron.js
- **Mobile Application** developed with React Native

### 📊 Smart Tracking
- **QR Code & Barcode scanning** for quick device identification
- Unique identifier generation for each laptop
- Historical repair tracking and analytics

### 🔔 Communication
- **Real-time notifications** for status updates
- **Email service integration** for automated communications
- Customer notification system for repair completion

### 📈 Management Features
- Comprehensive dashboard and reporting
- Inventory management
- Customer relationship management
- External shop order management

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js** - Server-side application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Prisma ORM** - Type-safe database access and migrations

### Frontend
- **React.js** - Web application framework
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Electron.js** - Cross-platform desktop application framework

### Mobile
- **React Native** - Cross-platform mobile application development

### Cloud & Services
- **Firebase Authentication** - User authentication and management
- **Firebase Storage** - File and image storage
- **AWS Cloud** - Cloud hosting and services
- **GitHub Actions** - CI/CD pipeline for automated deployment

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- Git

### Server Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hdl-technologies-management.git
cd hdl-technologies-management

# Install server dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure your MongoDB, Firebase, and AWS credentials in .env

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev
```

### Web Application Setup

```bash
# Navigate to web app directory
cd web-app

# Install dependencies
npm install

# Start development server
npm start
```

### Desktop Application Setup

```bash
# Navigate to desktop app directory
cd desktop-app

# Install dependencies
npm install

# Start desktop app in development mode
npm run electron-dev

# Build desktop app for production
npm run electron-build
```

### Mobile Application Setup

```bash
# Navigate to mobile app directory
cd mobile-app

# Install dependencies
npm install

# For iOS (requires macOS and Xcode)
cd ios && pod install && cd ..
npx react-native run-ios

# For Android (requires Android Studio and SDK)
npx react-native run-android
```

## 🔧 Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string
DATABASE_URL=your_prisma_database_url

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region

# Application
PORT=3000
JWT_SECRET=your_jwt_secret
```

## 📱 Platform-Specific Commands

### Development
```bash
# Start all services
npm run dev:all

# Start individual services
npm run dev:server    # Backend server
npm run dev:web       # Web application
npm run dev:desktop   # Desktop application
npm run dev:mobile    # Mobile application
```

### Production Build
```bash
# Build all platforms
npm run build:all

# Build individual platforms
npm run build:server    # Production server
npm run build:web       # Web app build
npm run build:desktop   # Desktop app executable
npm run build:mobile    # Mobile app APK/IPA
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Contact

**HDL Technologies**
- Email: contact@hdltechnologies.lk
- Phone: +94 XX XXX XXXX
- Website: [hdltechnologies.lk](https://hdltechnologies.lk)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this system
- Special thanks to the Sri Lankan tech community
- Built with ❤️ for local businesses

---

**Made with 💻 in Sri Lanka 🇱🇰**
