# ATAN MotoTech - Server & Database Configuration

## 📦 Complete Database Setup

Your ATAN MotoTech project now has a fully configured MongoDB database with comprehensive schema design and seeding support.

---

## 🎯 What's New

### ✨ Created Models
1. **Enhanced User Model** - `models/User.js`
   - Full validation and error messages
   - Timestamps (createdAt, updatedAt)
   - Role-based access control (admin, staff, customer)

2. **Product Model** - `models/Product.js` ⭐ NEW
   - Inventory management
   - Auto-status updates based on stock levels
   - Category-based organization (Engine Parts, Brake System, Suspension, Electrical, Accessories)

3. **Order Model** - `models/Order.js` ⭐ NEW
   - Order tracking with full lifecycle
   - Item-level details with product references
   - Payment tracking
   - Delivery date tracking

### 🔧 Enhanced Files
- `db/connection.js` - Better error handling and logging
- `seed.js` - Comprehensive test data (5 users, 10 products, 5 orders)
- `package.json` - Added seed script command

### 📝 New Documentation
- `.env.example` - Environment variables template
- `DATABASE_SETUP.md` - Complete setup guide
- `DATABASE_SCHEMA.md` - Schema relationships and examples
- `DATABASE_QUICK_REFERENCE.md` - Quick command reference

---

## 🚀 Setup Steps

### 1. Install MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Run installer
- MongoDB runs as a service

**Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

**Or Use Cloud:** MongoDB Atlas (Free tier available)
- https://www.mongodb.com/cloud/atlas

### 2. Setup Environment

Create `server/.env`:
```bash
cp server/.env.example server/.env
```

Edit `.env`:
```
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/atan-mototech

# Or MongoDB Atlas
# MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/atan-mototech

JWT_SECRET=your_super_secret_key_here
PORT=3000
NODE_ENV=development
```

### 3. Install Dependencies

```bash
cd server
npm install
```

### 4. Seed Database

```bash
npm run seed
```

Expected output:
```
✓ MongoDB connection established successfully
🌱 Starting database seeding...

📋 Seeding Users...
  ✓ Created user: admin@atan.com (admin)
  ✓ Created user: staff@atan.com (staff)
  ✓ Created user: john@atan.com (customer)
  ✓ Created user: jane@atan.com (customer)
  ✓ Created user: mike@atan.com (customer)

📦 Seeding Products...
  ✓ Created product: Brake Pads Set
  ✓ Created product: Oil Filter
  [... 8 more products ...]

🛒 Seeding Orders...
  ✓ Created order: ORD-2026-001
  [... 4 more orders ...]

✅ Database seeding completed successfully!
```

### 5. Start Server

```bash
npm start
```

Server will run on `http://localhost:3000`

### 6. Start Frontend

In another terminal:
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🧪 Testing the Setup

### Test via Browser

1. **Login Page**: http://localhost:5173/login
2. **Use Credentials**:
   - Email: `admin@atan.com`
   - Password: `password123`
3. **Should See**: Admin Dashboard with statistics

### Test via Postman

**Test Login Endpoint:**
```
POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email": "admin@atan.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@atan.com",
    "role": "admin"
  }
}
```

---

## 📊 Database Structure

### Collections Created

| Collection | Document Count | Purpose |
|------------|-----------------|---------|
| users | 5 | System users with roles |
| products | 10 | Motorcycle parts inventory |
| orders | 5 | Sales orders tracking |

### Key Features

✅ **Data Validation**
- Email validation and uniqueness
- SKU uniqueness for products
- Order number uniqueness

✅ **Auto-Updates**
- Product status auto-updates based on quantity
- Update timestamps on changes
- Payment status tracking

✅ **Relationships**
- Orders reference Users (foreign key)
- Order items reference Products
- Proper data normalization

✅ **Performance**
- Database indexes on unique fields
- Optimized query patterns
- Timestamp-based sorting

---

## 🔐 Test User Accounts

| Email | Password | Role | Access Level |
|-------|----------|------|--------------|
| admin@atan.com | password123 | admin | Full Dashboard Access |
| staff@atan.com | password123 | staff | Limited Dashboard |
| john@atan.com | password123 | customer | View Own Orders |
| jane@atan.com | password123 | customer | View Own Orders |
| mike@atan.com | password123 | customer | View Own Orders |

---

## 📋 Seeded Data Details

### Users Profile
```javascript
{
  name: String,           // Full name
  email: String,          // Unique email
  password: String,       // Hashed with bcrypt
  phoneNumber: String,    // Contact number
  address: String,        // Physical address
  role: String,           // admin | staff | customer
  isActive: Boolean,      // Account status
  createdAt: Date,        // Account creation time
  updatedAt: Date         // Last update time
}
```

### Products Sample Data
- **Brake System**: Brake Pads Set (150 in stock)
- **Engine Parts**: Oil Filter, Spark Plugs, Air Filter
- **Suspension**: Chain & Sprocket Kit, Tires
- **Electrical**: LED Headlight, Battery
- **Accessories**: Handlebar Grips, Motorcycle Cover

### Orders Sample Data
- **Range**: 5 sample orders with various statuses
- **Statuses**: Pending, Processing, Shipped, Delivered
- **Payment**: Mix of Unpaid/Paid and Cash/Card/Transfer
- **Dates**: Spread across April 5-7, 2026

---

## 🛠️ Troubleshooting

### Problem: Cannot connect to MongoDB
**Solution:**
1. Verify MongoDB is running
2. Check `MONGO_URI` in `.env`
3. For localhost: `mongodb://localhost:27017/atan-mototech`
4. For Atlas: Copy connection string from MongoDB Atlas

### Problem: Seeding fails with "Email already exists"
**Solution:**
- Seed script checks for duplicates, this is normal
- If you want to re-seed, delete database manually

### Problem: Login returns 401 error
**Solution:**
1. Verify seed ran successfully (`npm run seed`)
2. Check email/password are correct
3. Ensure server is running (`npm start`)

### Problem: Dashboard shows no data
**Solution:**
1. Verify orders and products were seeded
2. Clear browser cache and localStorage
3. Re-login to refresh data

---

## 🔄 Common Commands

```bash
# Install dependencies
npm install

# Seed database
npm run seed

# Start server (development)
npm start

# Check Node version
node --version

# Check npm version
npm --version

# Connect to MongoDB
mongosh

# Inside mongosh - verify collections
use atan-mototech
show collections
db.users.count()
db.products.count()
db.orders.count()
```

---

## 📚 Documentation Files

After setup, refer to:

1. **DATABASE_SETUP.md** - Comprehensive database guide
2. **DATABASE_SCHEMA.md** - Schema relationships and examples
3. **DATABASE_QUICK_REFERENCE.md** - Quick command reference
4. **IMPLEMENTATION_GUIDE.md** - Frontend implementation details

---

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB is running
- [ ] `.env` file exists with correct values
- [ ] `npm install` completed
- [ ] `npm run seed` executed successfully
- [ ] Server starts: `npm start` (no errors)
- [ ] Can login with admin@atan.com
- [ ] Dashboard displays statistics
- [ ] Frontend accessible at http://localhost:5173

---

## 🎓 Next Steps

1. **Test Login Flow**: Use test credentials to login
2. **Explore Dashboard**: Check if all statistics load correctly
3. **Create New Users**: Test register endpoint
4. **View Test Orders**: Dashboard displays seeded orders
5. **Customize**: Modify seed data for your needs

---

## 📞 Support Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/
- **Express Guide**: https://expressjs.com/
- **JWT Auth**: https://jwt.io/

---

## 🔄 Reset Database

To completely reset and re-seed:

```bash
# Option 1: Via npm script
npm run seed  # Automatically checks for duplicates

# Option 2: Manual reset
mongosh
use atan-mototech
db.users.deleteMany({})
db.products.deleteMany({})
db.orders.deleteMany({})
exit

# Then re-seed
npm run seed
```

---

**Configuration Version:** 1.0.0  
**Last Updated:** April 7, 2026  
**Database:** MongoDB  
**ORM:** Mongoose

For detailed schema information, see **DATABASE_SCHEMA.md**  
For quick commands, see **DATABASE_QUICK_REFERENCE.md**
