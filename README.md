# Medinexa

A modern telemedicine platform for weight management medications, built with Next.js 16 and MongoDB.

## Overview

Medinexa is a comprehensive healthcare e-commerce platform that enables patients to access weight management medications through a streamlined online consultation process. The platform features patient intake forms, medication information, order management, and secure payment processing.

## Features

### Patient Features

- **Medical Intake Forms** - Comprehensive health questionnaires with BMI calculation
- **Medication Information** - Detailed pages for Semaglutide, Tirzepatide, and Orlistat
- **Eligibility Assessment** - Interactive forms to determine treatment suitability
- **Secure Checkout** - Payment processing and order placement
- **Order Tracking** - View order status and history
- **User Authentication** - Secure login and registration system

### Admin Features

- **Order Management** - View and manage patient orders
- **Dashboard Analytics** - Track orders, revenue, and patient data
- **Admin Authentication** - Role-based access control

### Technical Features

- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **MongoDB Integration** - Secure data storage with Mongoose ODM
- **JWT Authentication** - Token-based user sessions
- **Form Validation** - Client and server-side validation
- **Modern UI Components** - Reusable components with Lucide icons

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS 4
- **Authentication**: JWT + bcryptjs
- **Icons**: Lucide React
- **Charts**: Chart.js with react-chartjs-2

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd medinexa
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
medinexa/
├── app/
│   ├── admin/           # Admin dashboard and order management
│   ├── api/             # API routes
│   ├── checkout/        # Checkout flow
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── dashboard/       # User dashboard
│   ├── database/        # Database utilities
│   ├── hooks/           # Custom React hooks
│   ├── intake/          # Medical intake forms
│   ├── lib/             # Utility functions
│   ├── medications/     # Medication detail pages
│   ├── models/          # Mongoose models
│   ├── order/           # Order pages
│   ├── payment/         # Payment processing
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── middleware.ts        # Next.js middleware for auth
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Key Medications

1. **Semaglutide** - GLP-1 receptor agonist for weight management
2. **Tirzepatide** - Dual GIP/GLP-1 receptor agonist
3. **Orlistat** - Lipase inhibitor for weight loss


## Security

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Role-based access control (User/Admin)
- Secure middleware for route protection

## Contributing

This is a private project. For any questions or issues, please contact the development team.

## License

Private and Confidential
