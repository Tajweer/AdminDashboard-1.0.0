# Tajweer Admin Dashboard

A modern, responsive admin dashboard built with React for managing the Tajweer marketplace platform. This dashboard provides administrators with tools to manage products, orders, and monitor platform analytics.

## 🚀 Features

### 🔐 Authentication & Security
- **Phone-based Authentication**: Secure login using Saudi phone numbers (+9665XXXXXXXX format)
- **OTP Verification**: Two-factor authentication via SMS
- **Session Management**: Automatic token refresh and secure logout
- **Role-based Access**: Admin-only access to dashboard features

### 📊 Dashboard Overview
- **Real-time Analytics**: Live statistics and metrics
- **Order Management**: View and track all platform orders
- **Product Overview**: Monitor product inventory and performance
- **Quick Actions**: Fast access to common administrative tasks

### 🛍️ Product Management
- **Add New Products**: Comprehensive product creation with image upload
- **Edit Products**: Update existing product information
- **Image Management**: Upload and manage product images
- **Category Management**: Organize products by categories
- **Auction Integration**: Set up products for auction functionality
- **Price Management**: Set initial and target prices

### 📋 Order Management
- **Order Tracking**: Monitor order status and progress
- **Order Details**: View comprehensive order information
- **Customer Information**: Access customer details and contact info
- **Order Analytics**: Track order trends and patterns

### 🌐 Internationalization
- **Multi-language Support**: Arabic and English language switching
- **RTL Support**: Right-to-left layout for Arabic
- **Localized Content**: All UI elements support both languages

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for user preference
- **Modern UI**: Clean, intuitive interface using Lucide React icons
- **Loading States**: Smooth loading indicators and error handling

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0**: Latest React with modern features
- **Vite 5.2.0**: Fast build tool and development server
- **React Router DOM 7.6.3**: Client-side routing
- **React Hook Form 7.60.0**: Form management and validation
- **Axios 1.10.0**: HTTP client for API communication
- **Lucide React 0.525.0**: Modern icon library

### Development Tools
- **TypeScript Support**: Type definitions for React and React DOM
- **Vite React Plugin**: Optimized React development experience
- **ES Modules**: Modern JavaScript module system

## 📁 Project Structure

```
Admin-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CurrencyIcon.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── config/           # Configuration files
│   │   └── config.js
│   ├── contexts/         # React contexts
│   │   └── LanguageContext.jsx
│   ├── pages/           # Main application pages
│   │   ├── Dashboard.jsx
│   │   ├── InsertProduct.jsx
│   │   ├── Login.jsx
│   │   ├── Main.jsx
│   │   ├── OTP.jsx
│   │   └── Signup.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── utils/          # Utility functions
│   │   ├── currency.jsx
│   │   └── errorHandler.js
│   ├── App.css         # Main application styles
│   ├── App.jsx         # Root component
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── dist/               # Production build output
├── env.example         # Environment variables template
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (Tajweer microservices)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_APP_NAME=Tajweer Admin Dashboard
   VITE_APP_VERSION=1.0.0
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build for production
npm run build

# Build for testing environment
npm run build:testing

# Build for development environment
npm run build:development
```

### Preview Production Build

```bash
# Preview production build
npm run preview

# Preview testing build
npm run preview:testing
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` | Yes |
| `VITE_APP_NAME` | Application name | `Tajweer Admin Dashboard` | No |
| `VITE_APP_VERSION` | Application version | `1.0.0` | No |

### API Configuration

The dashboard connects to the Tajweer backend microservices:

- **Authentication Service**: User login and OTP verification
- **Product Service**: Product management and CRUD operations
- **Order Service**: Order tracking and management
- **User Service**: User information and management

## 📱 Usage Guide

### Authentication Flow

1. **Login Page**
   - Enter Saudi phone number (+9665XXXXXXXX format)
   - Click "Login" to receive OTP
   - Verify phone number format and length

2. **OTP Verification**
   - Enter 6-digit OTP received via SMS
   - Click "Verify" to complete authentication
   - Automatic redirect to dashboard on success

### Dashboard Navigation

1. **Main Dashboard**
   - View platform statistics and metrics
   - Quick access to recent orders and products
   - Overview of platform performance

2. **Product Management**
   - Click "Add Product" to create new products
   - Fill in product details (name, description, price, category)
   - Upload product images
   - Set auction parameters if applicable

3. **Order Management**
   - View all orders in chronological order
   - Filter orders by status
   - Access detailed order information

### Language Switching

- **Language Toggle**: Click the language button in the header
- **Supported Languages**: Arabic (العربية) and English
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Persistent Selection**: Language preference saved in localStorage

## 🔌 API Integration

### Authentication Endpoints

```javascript
// Login request
POST /api/auth/login
{
  "phone": "+9665XXXXXXXX"
}

// OTP verification
POST /api/auth/verify-otp
{
  "phone": "+9665XXXXXXXX",
  "otp": "123456"
}
```

### Product Management Endpoints

```javascript
// Get all products
GET /api/products/

// Add new product
POST /api/products/
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100.00,
  "category": "Electronics",
  "images": [File]
}

// Update product
PUT /api/products/{id}
{
  "name": "Updated Name",
  "price": 150.00
}
```

### Order Management Endpoints

```javascript
// Get all orders
GET /api/orders/

// Get order details
GET /api/orders/{id}
```

## 🎨 Styling and Theming

### CSS Architecture
- **Global Styles**: `index.css` for base styles and CSS reset
- **Component Styles**: `App.css` for component-specific styling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Theme Variables**: CSS custom properties for consistent theming

### Color Scheme
- **Primary Colors**: Brand colors for main UI elements
- **Secondary Colors**: Supporting colors for accents
- **Neutral Colors**: Grays and whites for text and backgrounds
- **Status Colors**: Success, warning, error states

## 🚨 Error Handling

### Client-side Error Handling
- **Form Validation**: Real-time validation with error messages
- **API Error Handling**: Centralized error handling with user-friendly messages
- **Network Error Handling**: Offline detection and retry mechanisms
- **Loading States**: Loading indicators during async operations

### Error Types
- **Validation Errors**: Form input validation
- **Authentication Errors**: Login and OTP verification failures
- **Network Errors**: API connection issues
- **Server Errors**: Backend service errors

## 🔒 Security Features

### Authentication Security
- **Phone Number Validation**: Saudi phone number format validation
- **OTP Verification**: Time-limited OTP codes
- **Session Management**: Secure token storage and refresh
- **Automatic Logout**: Session timeout handling

### Data Security
- **HTTPS Only**: Secure communication in production
- **Input Sanitization**: XSS prevention
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: Security headers implementation

## 📊 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic code splitting with Vite
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and asset compression
- **Bundle Analysis**: Bundle size monitoring

### Runtime Optimization
- **Lazy Loading**: Component lazy loading
- **Memoization**: React.memo and useMemo optimization
- **Debouncing**: Search and input debouncing
- **Caching**: API response caching

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Phone number format validation
- [ ] OTP verification flow
- [ ] Session persistence
- [ ] Logout functionality

#### Product Management
- [ ] Add new product
- [ ] Edit existing product
- [ ] Image upload
- [ ] Form validation
- [ ] Category selection

#### Order Management
- [ ] View orders list
- [ ] Order details display
- [ ] Data loading states
- [ ] Error handling

#### UI/UX
- [ ] Responsive design
- [ ] Language switching
- [ ] Theme consistency
- [ ] Loading states

## 🚀 Deployment

### Production Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Web Server**
   - Upload `dist/` folder contents to your web server
   - Configure server for SPA routing
   - Set up HTTPS and security headers

3. **Environment Configuration**
   - Update `VITE_API_BASE_URL` to production API URL
   - Configure CORS settings on backend
   - Set up proper error monitoring

### Server Configuration

#### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Code Style Guidelines

- **ESLint Configuration**: Follow project ESLint rules
- **Component Structure**: Use functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities
- **Import Organization**: Group imports (React, third-party, local)

### Commit Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

## 📞 Support

### Troubleshooting

#### Common Issues

1. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility
   - Verify environment variables

2. **API Connection Issues**
   - Verify API base URL configuration
   - Check CORS settings on backend
   - Ensure backend services are running

3. **Authentication Problems**
   - Verify phone number format
   - Check OTP delivery
   - Clear localStorage and retry

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions

## 📄 License

This project is part of the Tajweer marketplace platform. All rights reserved.

## 🏆 Acknowledgments

- **React Team**: For the amazing React framework
- **Vite Team**: For the fast build tool
- **Lucide**: For the beautiful icon library
- **Tajweer Development Team**: For the platform architecture

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: Tajweer Development Team
