# Deployment Guide for EcoPantry

Since this is a client-side React app (SPA), hosting it is free and easy!

## Option 1: Vercel (Recommended)
1.  **Create Account**: Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2.  **Install Vercel CLI** (Optional but faster):
    ```bash
    npm install -g vercel
    ```
3.  **Deploy**:
    Run this command in your project terminal:
    ```bash
    vercel
    ```
    - Set up and deploy? **Yes**
    - Scope? **[Your Name]**
    - Link to existing project? **No**
    - Project Name? **ecopantry-hackfest**
    - Directory? **./** (default)
    - Build Command? **npm run build**
    - Output Directory? **dist**

    Vercel will build your site and give you a live URL (e.g., `https://ecopantry-hackfest.vercel.app`) in about 1 minute.

## Option 2: Netlify (Drag & Drop)
1.  **Build Locally**:
    ```bash
    npm run build
    ```
2.  **Deploy**:
    - Go to [app.netlify.com](https://app.netlify.com).
    - Drag the `dist` folder from your project into the Netlify "drop zone".
    - It will be live instantly!

## Checks Before Presentation
- [ ] **Data Persistence**: Open the live link on your phone and laptop. Note that data is per-device (because we use LocalStorage).
- [ ] **PWA Check**: Try installing it on your phone for the "wow" factor.
- [ ] **Data Seeding**: Use the Settings -> Seed Data button on the presentation device immediately after opening the site.
