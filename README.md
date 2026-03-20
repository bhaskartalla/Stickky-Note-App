# 📝 Stickky Notes - Collaborative Note-Taking App

A modern, real-time sticky notes application that brings the simplicity of physical sticky notes to your digital workspace. Create, customize, and organize your thoughts with an intuitive drag-and-drop interface.

![Stickky Notes App](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)

## ✨ Features

### 🎨 **Intuitive Note Management**

- **Create unlimited notes** - Add as many notes as you need to organize your thoughts
- **Drag & drop** - Move notes anywhere on your canvas with smooth animations
- **Color customization** - Choose from a vibrant color palette to categorize your notes
- **Auto-save** - All changes are automatically saved to the cloud in real-time
- **Rich text editor** - Format notes with bold, italic, headings, lists, and more via TipTap

### 🔐 **Secure Authentication**

- **Email/Password sign-up** - Traditional authentication method
- **Google Sign-In** - Quick one-click authentication with your Google account
- **Guest mode** - Try the app instantly without signing up; notes migrate on sign-up
- **User isolation** - Each user's notes are completely private and secure

### 👤 **Profile Management**

- **Full profile page** - View account details, auth provider, and membership duration
- **Email verification badge** - Visual indicator for verified and unverified accounts
- **Account deletion** - Delete account and all associated notes with confirmation dialog
- **Profile card popup** - Quick access to profile stats and actions from the header

### 🎨 **Design System (DLS)**

- **Three themes** - Dark (default), Light, and High Contrast — switchable from the profile card
- **Theme persistence** - Selected theme is saved to `localStorage` and restored on page load
- **Shared UI component library** - `Button`, `Badge`, `Avatar`, `InfoRow`, `Typography` components used consistently across all features
- **CSS custom properties** - All colours, radii, and transitions driven by CSS variables for instant theme switching

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
- **TipTap** - Rich text editor for note content
- **React Router v6** - Client-side routing

### **Backend & Services**

- **Firebase Authentication** - Secure user authentication (Email, Google, Anonymous)
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
git clone https://github.com/bhaskartalla/Stickky-Note-App
cd stickky-notes-app
```

#### **2. Install Dependencies**

```bash
npm install
```

#### **3. Firebase Setup**

**Option A: Use Firebase Emulators (Recommended for Development)**

```bash
firebase login
firebase init
firebase emulators:start
```

**Option B: Connect to Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** (Email/Password, Google, and Anonymous)
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
    match /notes/{noteId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null &&
                                     resource.data.ownerId == request.auth.uid;
    }
  }
}
```

#### **5. Run the Application**

```bash
npm run dev
# Open http://localhost:5173
```

#### **6. Run with Firebase Emulators (Optional)**

```bash
# Terminal 1
firebase emulators:start

# Terminal 2
npm run dev
# Emulator UI at http://localhost:4000
```

---

## 📁 Project Structure

```
sticky-notes-app/
├── src/
│   ├── app/                               # App shell
│   │   ├── theme/                         # ThemeManager + useTheme hook
│   │   ├── App.tsx
│   │   ├── AppLayout.tsx
│   │   ├── AuthGate.tsx
│   │   ├── main.tsx                       # Theme initialised here before React mounts
│   │   └── routes.tsx
│   ├── features/
│   │   ├── auth/                          # Authentication feature
│   │   │   ├── components/                # SignIn, SignUp, AuthForm styles
│   │   │   ├── hooks/
│   │   │   ├── pages/                     # AuthenticationPage
│   │   │   ├── auth.context.tsx
│   │   │   └── auth.service.ts
│   │   ├── notes/                         # Notes feature
│   │   │   ├── components/
│   │   │   │   ├── noteCard/              # NoteCard with TipTap editor
│   │   │   │   └── controls/              # FAB, colour swatches
│   │   │   ├── hooks/
│   │   │   ├── pages/                     # NotesPage (main canvas)
│   │   │   ├── notes.context.tsx
│   │   │   └── notes.service.ts
│   │   ├── profile/                       # Profile feature
│   │   │   ├── components/
│   │   │   │   ├── profile-card/          # Popup card (avatar, stats, theme switcher)
│   │   │   │   └── delete-confirmation/   # Confirmation dialog
│   │   │   ├── pages/                     # Full-screen ProfilePage
│   │   │   └── types.ts
│   │   └── ui/                            # Shared UI features
│   │       ├── header/                    # HeaderLayout, UserInfo, GuestBadge, SavingIndicator
│   │       ├── empty-canvas/              # Empty state when no notes exist
│   │       ├── routing/                   # ProtectedRoute, PublicRoute
│   │       ├── toast/                     # Toast notifications
│   │       └── Spinner/
│   ├── lib/
│   │   └── firebase/                      # Firebase config, auth, firestore helpers
│   ├── shared/
│   │   ├── components/
│   │   │   ├── icons/                     # SVG icon components
│   │   │   └── ui/                        # Shared component library
│   │   │       ├── Button/                # variant, size, isLoading props
│   │   │       ├── Badge/                 # success / error / muted variants
│   │   │       ├── Avatar/                # sm / md / lg sizes
│   │   │       ├── InfoRow/               # Key-value row
│   │   │       ├── Typography/            # 8 type scale variants
│   │   │       └── index.ts               # Barrel export
│   │   ├── types/
│   │   └── utils/
│   └── styles/
│       ├── globals.css                    # Base reset, .grid_bg utility, animations
│       └── variables.css                  # CSS tokens — dark / light / high-contrast themes
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Design System

The app uses a custom DLS (Design Language System) built on CSS custom properties.

### **Themes**

| Token       | Dark (default) | Light     | High Contrast |
| ----------- | -------------- | --------- | ------------- |
| `--bg`      | `#0f0f11`      | `#fafafa` | `#000000`     |
| `--surface` | `#18181c`      | `#ffffff` | `#1a1a1a`     |
| `--accent`  | `#f5c842`      | `#f5c842` | `#ffeb3b`     |
| `--text`    | `#f0f0f4`      | `#1a1a1a` | `#ffffff`     |

Themes are switched from the **profile card popup** and persist across sessions via `localStorage`. The theme is applied by setting `data-theme` on `<html>` — all CSS variables update instantly with no JavaScript re-rendering required.

### **Shared UI Components**

| Component    | Props                                                     | Used in                  |
| ------------ | --------------------------------------------------------- | ------------------------ |
| `Button`     | `variant`, `size`, `isLoading`, `loadingText`, `leftIcon` | Throughout app           |
| `Badge`      | `variant: success \| error \| muted`                      | Profile, NoteCard        |
| `Avatar`     | `size: sm \| md \| lg`, `photoURL`, `initials`            | ProfileCard, ProfilePage |
| `InfoRow`    | `label`, `value`                                          | ProfilePage, ProfileCard |
| `Typography` | `variant`, `as`                                           | EmptyCanvas, ProfilePage |

### **Typography Scale**

| Variant      | Font    | Size   | Weight | Usage                       |
| ------------ | ------- | ------ | ------ | --------------------------- |
| `display_lg` | Syne    | 20px   | 800    | Profile page name           |
| `display_md` | Syne    | 17px   | 800    | Header logo                 |
| `display_sm` | Syne    | 15px   | 700    | Popup name                  |
| `heading`    | Syne    | 18px   | 700    | Empty canvas heading        |
| `body`       | DM Sans | 13.5px | 400    | General body text           |
| `label`      | DM Sans | 10px   | 500    | Section labels, stat labels |
| `muted`      | DM Sans | 13px   | 400    | Muted / secondary text      |

---

## 🎯 Usage Guide

### **Creating Your First Note**

1. **Sign up**, **Sign in**, or continue as a **Guest**
2. Click the **"+"** FAB button or the **"Add your first note"** button on the empty canvas
3. **Click and drag** the note header to reposition it
4. **Click inside** the note to start typing — the TipTap toolbar lets you format text
5. **Choose a color** from the color swatches on the left sidebar

### **Managing Your Profile**

1. Click your **avatar** in the top-right corner to open the profile card
2. Switch themes using the **Dark / Light / HC** segmented control
3. Click **"View full profile"** to open the full profile page
4. On the profile page you can **Log Out** or **Delete Account** (with confirmation)

### **Guest Mode**

- The app creates an anonymous session automatically on first visit
- A **"Guest Session"** badge and canvas banner remind you that notes are not synced
- Signing up automatically **migrates your guest notes** to your new account

### **Keyboard Shortcuts**

| Action      | Shortcut                                |
| ----------- | --------------------------------------- |
| Save note   | Auto-saves after 1 second of inactivity |
| Delete note | Click trash icon on note header         |
| Bold        | `Ctrl/Cmd + B` (inside note editor)     |
| Italic      | `Ctrl/Cmd + I` (inside note editor)     |

---

## 🔧 Configuration

### **Firebase Emulator Settings**

Edit `firebase.json`:

```json
{
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "ui": { "enabled": true, "port": 4000 }
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

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🚢 Deployment

### **Deploy to Firebase Hosting**

```bash
npm run build
firebase deploy
```

### **Deploy to Vercel**

```bash
npm i -g vercel
vercel
```

### **Deploy to Netlify**

```bash
npm i -g netlify-cli
netlify deploy
```

---

## 🐛 Troubleshooting

**Firebase Emulator Connection Error**

```bash
firebase emulators:start
```

**Authentication not working**
Make sure you are accessing the app on `localhost`, not `127.0.0.1`. Emulators only bind to `localhost`.

**Notes not saving**
Check your Firestore security rules. Authenticated users (including anonymous) must have write access to the `notes` collection.

**Theme not persisting on refresh**
Ensure `themeManager.init()` is called in `main.tsx` before `createRoot`. This reads `localStorage` and sets `data-theme` synchronously before the first paint.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Code Style Guidelines**

- Use **TypeScript** for type safety
- Follow **React Hooks** best practices
- Use **CSS Modules** with snake_case class names
- Use shared UI components from `src/shared/components/ui` instead of inline styles or global class strings
- Write **descriptive commit messages**

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Bhaskar Talla**

- GitHub: [bhaskartalla](https://github.com/bhaskartalla)
- LinkedIn: [Bhaskar Talla](https://www.linkedin.com/in/bhaskar-talla-921422bb/)
- Email: bb7talla@gmail.com

---

## 🙏 Acknowledgments

- **Dennis Ivy** — His [YouTube tutorial](https://www.youtube.com/watch?v=ymDjvycjgUM) on building a sticky notes app with drag-and-drop functionality was instrumental in developing the core interaction logic for this project.

---

## 🔮 Roadmap

### **Completed**

- [x] Rich text editor (TipTap — bold, italic, headings, lists, code blocks)
- [x] Guest / anonymous mode with note migration on sign-up
- [x] Dark / Light / High Contrast theme switcher with persistence
- [x] Full profile page with account details and delete confirmation
- [x] Shared UI component library (Button, Badge, Avatar, InfoRow, Typography)

### **Upcoming**

- [ ] **End-to-end encryption** — Encrypt note content client-side before saving
- [ ] **Change password** — Update password from the profile page
- [ ] **Note sharing / collaboration** — Share individual notes with other users
- [ ] **Tags & categories** — Better organisation
- [ ] **Search functionality** — Find notes quickly
- [ ] **Export notes** — Download as PDF or plain text
- [ ] **Note templates** — Pre-formatted notes
- [ ] **Reminder notifications** — Never forget important notes

---

**Made with ❤️ by Bhaskar Talla**
