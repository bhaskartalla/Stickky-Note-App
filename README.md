# 📝 Sticky Notes - Collaborative Note-Taking App

A modern, real-time sticky notes application that brings the simplicity of physical sticky notes to your digital workspace. Create, customize, and organize your thoughts with an intuitive drag-and-drop interface.

![Sticky Notes App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)

## ✨ Features

### 🎨 **Intuitive Note Management**

- **Create unlimited notes** - Add as many notes as you need to organize your thoughts
- **Drag & drop** - Move notes anywhere on your canvas with smooth animations
- **Color customization** - Choose from a vibrant color palette to categorize your notes
- **Auto-save** - All changes are automatically saved to the cloud in real-time

### 🔐 **Secure Authentication**

- **Email/Password sign-up** - Traditional authentication method
- **Google Sign-In** - Quick one-click authentication with your Google account
- **User isolation** - Each user's notes are completely private and secure

### 📱 **Responsive Design**

- **Mobile-friendly** - Touch support for dragging notes on mobile devices
- **Cross-platform** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean, minimalist interface with smooth animations

### ⚡ **Real-time Sync**

- **Instant updates** - Changes are reflected immediately across all devices
- **Offline support** - Continue working when offline, syncs when back online
- **No data loss** - Robust error handling and retry mechanisms

---

## 🛠️ Tech Stack

### **Frontend**

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling for components
- **Vite** - Lightning-fast build tool

### **Backend & Services**

- **Firebase Authentication** - Secure user authentication
- **Cloud Firestore** - NoSQL database for real-time data
- **Firebase Emulator Suite** - Local development environment

### **Developer Tools**

- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Git** - Version control

---

## 🚀 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Firebase CLI** (optional, for emulators) - Install with `npm install -g firebase-tools`

### **Installation**

#### **1. Clone the Repository**

```bash
# Clone the repo
git clone https://github.com/yourusername/sticky-notes-app.git

# Navigate to project directory
cd sticky-notes-app
```

#### **2. Install Dependencies**

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

#### **3. Firebase Setup**

**Option A: Use Firebase Emulators (Recommended for Development)**

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Start emulators
firebase emulators:start
```

**Option B: Connect to Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** (Email/Password & Google)
4. Enable **Cloud Firestore**
5. Copy your Firebase config
6. Update `src/lib/firebase/config.ts` with your credentials:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}
```

#### **4. Set Up Firestore Security Rules**

Copy the following rules to your Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow create: if request.auth != null && request.auth.uid == userId;
      allow read, update: if request.auth != null && request.auth.uid == userId;

      // Notes subcollection
      match /notes/{noteId} {
        allow create, read, update, delete: if request.auth != null &&
                                               request.auth.uid == userId;
      }
    }
  }
}
```

#### **5. Run the Application**

```bash
# Development mode (with hot reload)
npm run dev

# Or with yarn
yarn dev

# Open your browser to
# http://localhost:5173
```

#### **6. Run with Firebase Emulators (Optional)**

```bash
# Terminal 1 - Start Firebase Emulators
firebase emulators:start

# Terminal 2 - Start Vite dev server
npm run dev

# Emulator UI available at
# http://localhost:4000
```

---

## 📁 Project Structure

```
sticky-notes-app/
├── src/
│   ├── features/              # Feature-based modules
│   │   ├── auth/             # Authentication feature
│   │   │   ├── hooks/        # Auth-related hooks
│   │   │   ├── auth.service.ts
│   │   │   └── auth.context.ts
│   │   └── notes/            # Notes feature
│   │       ├── hooks/        # Note-related hooks
│   │       ├── components/   # Note components
│   │       ├── notes.service.ts
│   │       └── notes.context.ts
│   ├── lib/
│   │   └── firebase/         # Firebase configuration
│   │       ├── config.ts
│   │       ├── auth.ts
│   │       ├── firestore.ts
│   │       └── index.ts
│   ├── shared/               # Shared components
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/           # Shared hooks
│   │   └── utils/           # Utility functions
│   ├── context/             # Global app context
│   ├── pages/               # Page components
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── firebase.json            # Firebase configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore indexes
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Usage Guide

### **Creating Your First Note**

1. **Sign up** or **Sign in** with your email or Google account
2. Click the **"+"** button to create a new note
3. **Click and drag** the note header to move it around
4. **Click inside** the note to start typing
5. **Choose a color** from the color palette on the left

### **Keyboard Shortcuts**

| Action      | Shortcut                                |
| ----------- | --------------------------------------- |
| Save note   | Auto-saves after 1 second of inactivity |
| Delete note | Click trash icon on note header         |
| Focus note  | Click anywhere inside note              |

### **Mobile Usage**

- **Tap and hold** the note header to drag
- **Tap** inside the note to edit text
- **Tap** color buttons to change note color
- Notes automatically adjust for smaller screens

---

## 🔧 Configuration

### **Firebase Emulator Settings**

Edit `firebase.json`:

```json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

### **Build Configuration**

Edit `vite.config.ts` for custom build settings:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

---

## 🧪 Testing

### **Run Linter**

```bash
npm run lint
```

### **Type Checking**

```bash
npm run type-check
```

### **Build for Production**

```bash
npm run build
```

### **Preview Production Build**

```bash
npm run preview
```

---

## 🚢 Deployment

### **Deploy to Firebase Hosting**

```bash
# Build the app
npm run build

# Deploy to Firebase
firebase deploy

# Or deploy hosting only
firebase deploy --only hosting
```

### **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Deploy to Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

---

## 🐛 Troubleshooting

### **Common Issues**

**Issue: Firebase Emulator Connection Error**

```bash
# Solution: Make sure emulators are running
firebase emulators:start
```

**Issue: Authentication not working**

```bash
# Solution: Check if you're using localhost
# Emulators only work on localhost, not 127.0.0.1
```

**Issue: Notes not saving**

```bash
# Solution: Check Firestore security rules
# Make sure rules allow authenticated users to write
```

**Issue: Drag and drop not working on mobile**

```bash
# Solution: This is expected behavior
# Use touch and hold gesture instead
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Code Style Guidelines**

- Use **TypeScript** for type safety
- Follow **React Hooks** best practices
- Write **descriptive commit messages**
- Add **comments** for complex logic
- Use **CSS Modules** for styling

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [bhaskartalla](https://github.com/bhaskartalla)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/bhaskar-talla-921422bb/)
- Email: bb7talla@gmail.com

---

## 🙏 Acknowledgments

- **Firebase** - For the amazing backend infrastructure
- **React Team** - For the powerful UI library
- **Vite** - For the blazing-fast build tool
- **Community** - For inspiration and support

---

## 🔮 Roadmap

### **Upcoming Features**

- [ ] **Rich text editor** - Bold, italic, bullet points
- [ ] **Note sharing** - Collaborate with other users
- [ ] **Tags & categories** - Better organization
- [ ] **Search functionality** - Find notes quickly
- [ ] **Dark mode** - Eye-friendly interface
- [ ] **Export notes** - Download as PDF or text
- [ ] **Note templates** - Pre-formatted notes
- [ ] **Reminder notifications** - Never forget important notes

---

**Made with ❤️ by Bhaskar Talla**
