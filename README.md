SHEER Beauty - E-commerce Application
      
      
🚀 Project Overview  
SHEER Beauty is a frontend-focused e-commerce application with backend integrations for payments, shipping, and authentication. Users can browse makeup products, add items to their cart or favorites, and securely complete their purchase. The project highlights my skills in React.js, Redux, API integrations, and frontend state management.
      
      
🔥 Live Demo  
https://sheerbeauty.netlify.app/
      
      
🛠️ Tech Stack  
  Frontend: React.js, Redux Toolkit, React Router, Tailwind CSS

  Backend Integrations: Firestore (Firebase)

  Payments: Stripe (test mode, supports Google Pay & Apple Pay)

  Shipping: Shippo API (address validation & shipping rates)

  State Management: Redux Toolkit

  Authentication: Firebase Auth

  APIs: Makeup API (used for product data) - https://makeup-api.herokuapp.com/

  
✨ Features  

  🛍️ Product Catalog – Browse makeup products with filtering & sorting

  🛒 Cart Management – Add, remove, and update cart items dynamically

  ❤️ Favorites – Save favorite products for later

  💾 Persistent State – Cart & favorites are stored in localStorage, so they remain       after page refresh

  🔑 Session Management – Users stay logged in after returning to the site

  💳 Secure Payments – Stripe integration (Google Pay, Apple Pay, card validation)

  🚚 Shipping Rate Calculation – Real-time shipping cost estimation using Shippo API

  🏠 Address Validation – Shippo verifies user-entered addresses for accuracy

  🔐 User Authentication – Sign up, login, and store user data with Firebase Auth

  🎨 Modern UI – responsive styling using Tailwind CSS for a professional look

  
⚡ Challenges & Solutions
  
📦 Handling a Primitive Product API

The project uses Makeup API, which lacks search functionality based on user input. To work around this limitation:  
  ✅ The entire product dataset is fetched and stored in Redux state  
  ✅ A custom React hook extracts filtering options (categories, brands, colors, tags)  
  ✅ Filtering happens entirely on the frontend, ensuring a fast and flexible             experience  
  
⏳ Optimizing Page Load Performance

Fetching the full dataset into Redux takes time, causing delays in rendering product listings. To improve UX:  
  ✅ Home Page products load directly from the API for instant content visibility  
  ✅ Redux caching ensures that filtering and navigation between pages remain smooth  

  
🏗️ Installation & Setup

To run the project locally, follow these steps:

1. Clone the repository - run the following commands:

    git clone https://github.com/idakrech/beauty-webshop.git  
    cd beauty-webshop  

2. Install dependencies - run the following commands:
   
    npm install

4. Set up environment variables:
Create a .env file in the root directory and configure the required credentials (Firebase setup, Shippo API key).

5. Run the development server - run the command:

    npm start  

5. Open http://localhost:3000 in your browser.

  
🔮 Future Improvements

  ✅ Add admin panel for product management  
  ✅ Implement product reviews and ratings  

  
👩‍💻 About Me

I’m a Junior Frontend & Mobile Developer with basic backend skills. I recently completed my Bachelor of Information Technology - Frontend and Mobile Development at Kristiania University College in Oslo, Norway, and have hands-on experience with React JS, React Native, .NET, C#, iOS development and Android development. I'm currently open to job opportunities!
  
📌 Portfolio: https://sheerbeauty.netlify.app/  
📧 Contact: krech.ida@gmail.com  
💼 LinkedIn: https://www.linkedin.com/in/ida-krech/

