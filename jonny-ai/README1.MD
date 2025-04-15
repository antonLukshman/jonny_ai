# Jonny AI - AI Chat Web App

Jonny AI is a modern, interactive AI chat web application that leverages the DeepSeek AI API to provide users with a ChatGPT-like experience. The app features a sleek, dark-themed UI with vibrant color accents inspired by the Jonny AI logo.

## Features

- **Interactive AI Chat**: Engage in conversations with an AI assistant powered by DeepSeek
- **User Authentication**: Secure login and signup using email/password or Google authentication
- **Chat History**: View and continue previous conversations
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Animated UI Elements**: Engaging and playful user experience with animations
- **Firebase Integration**: Real-time database and authentication

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS
  - React Spring (animations)
  - React Router (navigation)
- **Backend/Services**:
  - Firebase Authentication
  - Firebase Firestore
  - DeepSeek API

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- DeepSeek API key

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/jonny-ai.git
cd jonny-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_DEEPSEEK_API_KEY=your_deepseek_api_key_here
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id_here
```

### 4. Set up Firebase

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password and Google providers)
3. Create a Firestore database
4. Add your web app to the Firebase project and copy the configuration values to your `.env` file

### 5. Start the development server

```bash
npm start
```

## Deployment

### Deploying to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init
```

- Select Hosting
- Choose your Firebase project
- Set the public directory to `build`
- Configure as a single-page app
- Don't overwrite `index.html`

4. Build your project:

```bash
npm run build
```

5. Deploy to Firebase:

```bash
firebase deploy
```

### Deploying to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy to Vercel:

```bash
vercel
```

### Deploying to Netlify

1. Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy using Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy
```

## Project Structure

```
jonny-ai/
|-- public/
|   |-- index.html
|   |-- logo.svg
|-- src/
|   |-- components/
|   |   |-- Auth/
|   |   |   |-- Login.js
|   |   |   |-- Signup.js
|   |   |-- Chat/
|   |   |   |-- ChatInput.js
|   |   |   |-- ChatMessage.js
|   |   |   |-- ChatWindow.js
|   |   |   |-- TypingIndicator.js
|   |   |-- Sidebar/
|   |   |   |-- ChatItem.js
|   |   |   |-- RecentChats.js
|   |   |   |-- Sidebar.js
|   |   |-- Common/
|   |   |   |-- Avatar.js
|   |   |   |-- Button.js
|   |   |   |-- Header.js
|   |   |   |-- LoadingSpinner.js
|   |-- context/
|   |   |-- AuthContext.js
|   |   |-- ChatContext.js
|   |-- services/
|   |   |-- auth.js
|   |   |-- chat.js
|   |   |-- firebase.js
|   |-- styles/
|   |   |-- globals.css
|   |   |-- theme.js
|   |-- utils/
|   |   |-- dateFormat.js
|   |   |-- helpers.js
|   |-- App.js
|   |-- index.js
|-- .env
|-- .gitignore
|-- package.json
|-- README.md
|-- tailwind.config.js
```

## Customization

### Changing the color theme

Edit the `tailwind.config.js` file to update the color palette:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff3366", // Pink
          light: "#ff66a3",
          dark: "#cc0044",
        },
        secondary: {
          DEFAULT: "#8833ff", // Purple
          light: "#aa66ff",
          dark: "#6600cc",
        },
        accent: {
          DEFAULT: "#ff6633", // Orange
          light: "#ff9966",
          dark: "#cc3300",
        },
        background: {
          DEFAULT: "#111111", // Dark background
          light: "#222222",
          lighter: "#333333",
        },
      },
    },
  },
};
```

### Modifying the logo

Replace the SVG code in `public/logo.svg` with your own SVG or image file.

### Adding new features

- **Custom Themes**: Implement a theme selector in the user settings
- **Voice Input**: Add speech-to-text capability for voice messages
- **Markdown Support**: Enable rich text formatting in messages
- **File Sharing**: Allow users to share images or documents

## Integrating with DeepSeek API

The application uses the DeepSeek API for generating AI responses. Here's how it works:

1. When a user sends a message, the `ChatContext.js` component captures it and calls the `sendMessage` function
2. The message is stored in Firebase Firestore
3. The `fetchAIResponse` function in `services/chat.js` sends the message to the DeepSeek API
4. The API response is then stored in Firestore and displayed to the user

You can customize the AI behavior by modifying the system prompt in `services/chat.js`:

```javascript
const response = await axios.post(
  "https://api.deepseek.com/v1/chat/completions",
  {
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You are Jonny AI, a helpful and friendly assistant with a playful personality.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 1024,
  }
  // ...
);
```

## Best Practices for Production

1. **Security**: Ensure that Firebase security rules are properly configured to protect user data
2. **API Key Protection**: Use environment variables and server-side functions to protect your API keys
3. **Error Handling**: Implement comprehensive error handling for API requests and authentication
4. **Performance Optimization**: Implement pagination for chat history and lazy loading of components
5. **Accessibility**: Ensure the app meets WCAG guidelines for accessibility
6. **Testing**: Implement unit and integration tests for critical components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DeepSeek AI](https://deepseek.com/)
- [React Spring](https://www.react-spring.io/)
- [React Router](https://reactrouter.com/)
