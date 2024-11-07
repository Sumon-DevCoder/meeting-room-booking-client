# Meeting Room Booking Service

A comprehensive Meeting Room Booking Service that allows users to book services online, manage their bookings through a secure dashboard, and process payments using AmarPay. The service is built using modern technologies such as React, TypeScript, Redux, NextUI, Tailwind CSS, Node.js, Express, MongoDB, and Cloudinary for image hosting.

## Live URL

You can access the live version of the application [here](https://meeting-room-booking-client-ochre.vercel.app/).

## Table of Contents

- [Introduction](#introduction)
- [Project Description](#project-description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation Guidelines](#installation-guidelines)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to the Meeting Room Booking Service! This platform allows users to easily book room services online, manage their room, and make secure payments. Whether you are a user looking to keep your car clean or an admin managing the services, this platform provides a seamless experience.

## Project Description

This project is a full-fledged Meeting Room Booking service with the following key functionalities:

- **User Authentication**: Secure login and registration for users and admins.
- **Service Booking**: Users can book service slots for their rooms.
- **Payment Integration**: Integration with AmarPay for secure online payments.
- **Admin Dashboard**: Admins can manage bookings, view user data, and update services.
- **Image Hosting**: Imgbb is used for efficient image hosting.
- **Responsive Design**: The application is designed to work seamlessly on both mobile and desktop devices.
- **Visit The Website**: You can access the live version of the application [here](https://meeting-room-booking-client-ochre.vercel.app/).

## Features

- **User Roles**: Supports both user and admin roles.
- **Secure Dashboard**: Users can manage their bookings and view their service history.
- **Booking System**: Users can select a service slot and confirm their booking.
- **Payment Processing**: Payments are handled securely through AmarPay.
- **Admin Management**: Admins have a dedicated dashboard to manage all operations.
- **Service Management**: Admins have a dedicated dashboard to manage all service and slots operations.
- **User Management**: User have a dedicated dashboard to manage all operations.
- **Image Hosting**: Images are uploaded and served via Imgbb.

## Technology Stack

- **Frontend**:
  - React
  - TypeScript
  - Redux
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express
  - Mongoose (MongoDB)
  - TypeScript
  - Modular Pattern
- **Payment Integration**: AmarPay
- **Image Hosting**: Imgbb
- **Deployment**: Vercel

## Installation Guidelines

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Sumon-DevCoder/meeting-room-booking-client.git
   cd meeting-room-booking-client
   Public

   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:

   ```env
   VITE_WORKSPACE=development
   VITE_BASE_URL=http://localhost:5000/api
   VITE_LIVE_URL=http://localhost:5000
   VITE_IMGBB_API_KEY=import.meta.env.VITE_IMGBB_API_KEY
   VITE_AMARPAY_API_KEY=your_amarpay_api_key
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Build the Project**:

   ```bash
   npm run build
   ```

6. **Run the Backend Server**:
   ```bash
   npm run dev
   ```

## Usage

- **User Dashboard**: Access your bookings, make new bookings, and manage your account.
- **Admin Dashboard**: Manage all user bookings, update services, and monitor system operations.

## Contributing

We welcome contributions! Please read our [contributing guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Project Maintainer**: [Mustafizur Rahman Sumon](Mustafizurrahmansumon24@gmail.com)

For more information, visit our backend gitHub [website](https://github.com/Sumon-DevCoder/meeting-room-booking-client).
FrontEnd live link [website](https://meeting-room-booking-client-ochre.vercel.app/).
BackEnd live link [website](http://localhost:5000/)/api.

## Acknowledgements

- Special thanks to [Mustafizur Rahman Sumon](https://github.com/Sumon-DevCoder) for their contributions.
- This project is powered by [React](https://reactjs.org), [Node.js](https://nodejs.org), and [AmarPay](https://amarpay.com).

## FAQ

- **How do I book a service?**
  - Navigate to the booking section, select your desired service and time slot, and proceed to payment.
- **How can I manage my bookings?**
  - Log in to your user dashboard to view and manage your bookings.
- **Is payment secure?**
  - Yes, all payments are processed securely through AmarPay.
