# 📁 Complete Project Structure

## Directory Tree

```
accounting-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Side menu navigation
│   │   └── ProtectedRoute.jsx      # Auth guard for routes
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Signup.jsx              # Registration page
│   │   ├── Dashboard.jsx           # Main dashboard (metrics & charts)
│   │   ├── Inventory.jsx           # Inventory management
│   │   ├── Transactions.jsx        # Transaction records
│   │   ├── Reports.jsx             # P&L & analytics
│   │   └── Settings.jsx            # User settings
│   │
│   ├── charts/
│   │   ├── SalesLineChart.jsx      # 7-day sales trend
│   │   ├── RevenueExpensesBarChart.jsx # Revenue vs Expenses
│   │   └── InventoryPieChart.jsx   # Stock distribution
│   │
│   ├── firebase/
│   │   ├── config.js               # Firebase initialization
│   │   ├── auth.js                 # Auth functions (signup, login, etc)
│   │   └── db.js                   # Database CRUD operations
│   │
│   ├── utils/
│   │   ├── calculatePL.js          # Profit & Loss calculation
│   │   └── dateUtils.js            # Date formatting & filtering
│   │
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind
│
├── public/                         # Static files
├── node_modules/                   # Dependencies (installed)
│
├── .env.example                    # Environment template
├── .env.local                      # Your Firebase config (create this)
├── .gitignore                      # Git ignore rules
│
├── package.json                    # Dependencies list
├── package-lock.json               # Lock file
│
├── vite.config.js                  # Vite config
├── tailwind.config.js              # Tailwind CSS config
├── postcss.config.js               # PostCSS config (for Tailwind)
├── eslint.config.js                # ESLint rules
│
├── index.html                      # HTML entry point
│
├── README.md                       # Full documentation
├── SETUP_GUIDE.md                  # Detailed setup instructions
└── QUICKSTART.md                   # Quick 5-min start guide
```

---

## Core Component Relationships

```
App.jsx
├── AuthContext (user, loading)
├── Router
│   ├── /login → Login.jsx
│   ├── /signup → Signup.jsx
│   └── /* (Protected)
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       ├── /dashboard → Dashboard.jsx
│       ├── /inventory → Inventory.jsx
│       ├── /transactions → Transactions.jsx
│       ├── /reports → Reports.jsx
│       └── /settings → Settings.jsx
```

---

## Data Flow

```
Firestore
   ↓
firebase/db.js (CRUD operations)
   ↓
Pages (useState + useEffect)
   ↓
Charts/Components (display data)
```

---

## Firestore Collections Structure

```
Firestore Database
├── users/
│   └── {userId}
│       ├── email: string
│       ├── businessName: string
│       ├── currency: string (NPR, USD, etc)
│       └── createdAt: timestamp
│
├── products/
│   └── {productId}
│       ├── userId: string
│       ├── name: string
│       ├── category: string
│       ├── stock: number
│       ├── costPrice: number
│       ├── sellingPrice: number
│       └── createdAt: timestamp
│
└── transactions/
    └── {transactionId}
        ├── userId: string
        ├── type: string (sales, purchase, expense, sales_return)
        ├── productId: string (optional for expenses)
        ├── quantity: number
        ├── amount: number
        ├── category: string (for expenses)
        ├── date: timestamp
        └── createdAt: timestamp
```

---

## Page Features Map

| Page | Features |
|------|----------|
| **Login** | Email/password authentication |
| **Signup** | New account creation with business name |
| **Dashboard** | Key metrics, sales trends, top products |
| **Inventory** | Add/edit/delete products, low stock alerts |
| **Transactions** | Record sales, purchases, expenses, returns |
| **Reports** | P&L statement, charts, expense breakdown |
| **Settings** | Business profile, currency, preferences |

---

## API Functions

### Authentication (`src/firebase/auth.js`)
- `signup(email, password, businessName)` - Create account
- `signin(email, password)` - Login
- `logout()` - Logout
- `getCurrentUser()` - Get logged-in user
- `resetPassword(email)` - Password reset
- `getUserData(userId)` - Fetch user profile

### Database (`src/firebase/db.js`)

**Products:**
- `addProduct(userId, productData)` - Create product
- `getProducts(userId)` - Fetch all products
- `subscribeToProducts(userId, callback)` - Real-time updates
- `updateProduct(productId, updates)` - Update product
- `deleteProduct(productId)` - Delete product

**Transactions:**
- `addTransaction(userId, transactionData)` - Create transaction
- `getTransactions(userId)` - Fetch all transactions
- `subscribeToTransactions(userId, callback)` - Real-time updates
- `updateTransaction(transactionId, updates)` - Update transaction
- `deleteTransaction(transactionId)` - Delete transaction

**Settings:**
- `updateUserSettings(userId, settings)` - Update profile

### Utilities (`src/utils/`)

**calculatePL.js:**
- `calculatePL(transactions)` - Returns { totalRevenue, totalCOGS, grossProfit, totalExpenses, netProfit }

**dateUtils.js:**
- `formatDate(date)` - Format to "MM/DD/YYYY"
- `formatDateTime(date)` - Format to full date+time
- `getDateRange(days)` - Get start/end dates for range
- `filterByDateRange(items, start, end)` - Filter by date

---

## Styling System

**Tailwind CSS Classes Used:**
- Colors: `blue-600`, `green-600`, `red-600`, `gray-100`, etc.
- Spacing: `p-4`, `m-6`, `px-4`, `py-2`, etc.
- Layout: `flex`, `grid`, `grid-cols-1 md:grid-cols-2`, etc.
- Responsive: `md:`, `lg:` breakpoints

---

## Environment Variables Required

Create `.env.local` with:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start server
npm run build            # Production build
npm run preview          # Test production build
npm run lint             # Check code style

# Useful additions
npm install tailwindcss  # If needed again
npm install firebase     # If needed again
npm install react-router-dom  # If needed again
```

---

## File Sizes (Approximate)

| Component | Size |
|-----------|------|
| Single page | 2-4 KB |
| Single component | 1-2 KB |
| Firebase functions | 3-5 KB |
| Chart component | 1-2 KB |
| Total code | ~40 KB |

---

## Next Steps for Development

1. **Testing**: Add unit tests with Jest/Vitest
2. **State Management**: Add Redux/Zustand if needed
3. **Animations**: Add Framer Motion
4. **Form Validation**: Add React Hook Form + Zod
5. **Error Handling**: Add error boundaries
6. **Logging**: Add Sentry for error tracking
7. **Mobile**: Create React Native version
8. **PWA**: Convert to Progressive Web App

---

This structure is scalable and follows React best practices! 🚀
