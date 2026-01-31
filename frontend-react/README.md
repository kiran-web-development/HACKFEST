# EcoPantry - Food Waste Management Platform

**EcoPantry** is a comprehensive solution designed to reduce food waste across the supply chain—from households to restaurants and retailers. It combines inventory management, wastage tracking, and community sharing into a single, cohesive platform.

## 🚀 Features

### 1. Smart Pantry Management
- **One-Click Tracking**: Easily add items to your virtual pantry.
- **Expiry Alerts**: Visual indicators for items expiring soon (3 days or less).
- **Search & Filter**: Quickly find ingredients to use up.

### 2. Waste Logging & Analytics
- **Log Waste**: Record discarded items to understand your waste habits.
- **Impact Metrics**: Track financial loss ($) and Carbon Footprint (CO2e).
- **Visual Reports**: Interactive charts showing waste distribution and trends.

### 3. Community Donation Marketplace
- **Share Food**: Post excess edible food for donation.
- **Claim Items**: Browse and claim donations from others nearby.
- **Distance Filter**: Find donations within a specific radius (mocked).

### 4. Supplier Management
- **Vendor Profiles**: Keep track of where your food comes from.
- **Quality Ratings**: Rate suppliers to identify quality issues early.
- **Contact Directory**: Centralized management of supplier details.

### 5. Team & Access Control
- **Role Management**: Assign Admin, Manager, or Staff roles.
- **Secure Access**: Control who can view or edit sensitive data.
- **Organization Support**: Switch between "Household", "Restaurant", or "Retail" modes.

### 6. Mobile PWA
- **Installable**: Works as a native app on iOS and Android.
- **Offline Capable**: Browse your pantry even without an internet connection.
- **Responsive**: Optimized for all screen sizes.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Charts**: Recharts
- **PWA**: Vite Plugin PWA
- **State/Auth**: React Context API + LocalStorage (Mock Backend)

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📱 PWA Features
To test the PWA capabilities:
1. Run `npm run build`
2. Serve the build folder (e.g., using `npx serve dist`)
3. Open in a browser and look for the "Install" icon in the address bar.
4. Toggle "Offline" in DevTools Network tab to test caching.

## 👥 Contributors
K  Muni Chenchu Reddy
Built for Hackfest 2025.
