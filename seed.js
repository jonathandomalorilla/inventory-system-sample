import bcrypt from 'bcrypt';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import connectDB from './db/connection.js';

/**
 * Seed Script: Creates test data for development
 * Creates:
 * - Test users (admin, staff, customers)
 * - Products (inventory items)
 * - Orders (sample orders)
 * Run: npm run seed
 */

const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log("\n🌱 Starting database seeding...\n");

        // Clear existing data (optional - comment out if you want to keep data)
        // await User.deleteMany({});
        // await Product.deleteMany({});
        // await Order.deleteMany({});
        // console.log("✓ Cleared existing data");

        // ==================== USERS ====================
        console.log("📋 Seeding Users...");
        const testUsers = [
            {
                name: "Admin User",
                email: "admin@atan.com",
                password: "password123",
                phoneNumber: "+63-555-0001",
                address: "123 Main St, Manila",
                role: "admin",
                isActive: true
            },
            {
                name: "Staff Member",
                email: "staff@atan.com",
                password: "password123",
                phoneNumber: "+63-555-0002",
                address: "456 Oak Ave, Makati",
                role: "staff",
                isActive: true
            },
            {
                name: "John Doe",
                email: "john@atan.com",
                password: "password123",
                phoneNumber: "+63-555-0003",
                address: "789 Pine Rd, Quezon City",
                role: "customer",
                isActive: true
            },
            {
                name: "Jane Smith",
                email: "jane@atan.com",
                password: "password123",
                phoneNumber: "+63-555-0004",
                address: "321 Elm St, Cebu",
                role: "customer",
                isActive: true
            },
            {
                name: "Mike Johnson",
                email: "mike@atan.com",
                password: "password123",
                phoneNumber: "+63-555-0005",
                address: "654 Maple Dr, Davao",
                role: "customer",
                isActive: true
            }
        ];

        const createdUsers = [];
        for (const userData of testUsers) {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                createdUsers.push(existingUser);
                console.log(`  ✓ User exists: ${userData.email}`);
                continue;
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = new User({
                ...userData,
                password: hashedPassword
            });

            await newUser.save();
            createdUsers.push(newUser);
            console.log(`  ✓ Created user: ${userData.email} (${userData.role})`);
        }

        // ==================== PRODUCTS ====================
        console.log("\n📦 Seeding Products...");
        const testProducts = [
            {
                name: "Brake Pads Set",
                sku: "BP-001",
                description: "High-quality brake pads for all motorcycles",
                category: "Brake System",
                quantity: 150,
                minStockLevel: 20,
                unitPrice: 25.99,
                supplier: "MotoParts Inc"
            },
            {
                name: "Oil Filter",
                sku: "OF-002",
                description: "Premium engine oil filter",
                category: "Engine Parts",
                quantity: 200,
                minStockLevel: 30,
                unitPrice: 12.50,
                supplier: "AutoSupply Co"
            },
            {
                name: "Spark Plugs (Set of 4)",
                sku: "SP-003",
                description: "Durable spark plugs for optimal engine performance",
                category: "Engine Parts",
                quantity: 300,
                minStockLevel: 50,
                unitPrice: 8.99,
                supplier: "PowerTech Motors"
            },
            {
                name: "Air Filter",
                sku: "AF-004",
                description: "Replaceable air filter for better engine efficiency",
                category: "Engine Parts",
                quantity: 120,
                minStockLevel: 15,
                unitPrice: 15.00,
                supplier: "CleanAir Ltd"
            },
            {
                name: "Chain & Sprocket Kit",
                sku: "CS-005",
                description: "Complete chain and sprocket replacement kit",
                category: "Suspension",
                quantity: 45,
                minStockLevel: 10,
                unitPrice: 89.99,
                supplier: "ChainMaster"
            },
            {
                name: "Motorcycle Battery",
                sku: "MB-006",
                description: "12V motorcycle battery with long lifespan",
                category: "Electrical",
                quantity: 8,
                minStockLevel: 5,
                unitPrice: 65.00,
                supplier: "PowerCell Electronics"
            },
            {
                name: "Handlebar Grips",
                sku: "HG-007",
                description: "Comfortable rubber handlebar grips",
                category: "Accessories",
                quantity: 250,
                minStockLevel: 40,
                unitPrice: 12.00,
                supplier: "GripTech"
            },
            {
                name: "LED Headlight",
                sku: "LH-008",
                description: "Bright LED headlight for better visibility",
                category: "Electrical",
                quantity: 35,
                minStockLevel: 10,
                unitPrice: 45.50,
                supplier: "BrightLight Co"
            },
            {
                name: "Tire - Front (80/100)",
                sku: "TF-009",
                description: "Durable front tire for motorcycles",
                category: "Suspension",
                quantity: 60,
                minStockLevel: 15,
                unitPrice: 125.00,
                supplier: "TireMaster"
            },
            {
                name: "Motorcycle Cover",
                sku: "MC-010",
                description: "Waterproof motorcycle cover for protection",
                category: "Accessories",
                quantity: 30,
                minStockLevel: 5,
                unitPrice: 28.99,
                supplier: "ProtectGear"
            }
        ];

        const createdProducts = [];
        for (const productData of testProducts) {
            const existingProduct = await Product.findOne({ sku: productData.sku });
            if (existingProduct) {
                createdProducts.push(existingProduct);
                console.log(`  ✓ Product exists: ${productData.name}`);
                continue;
            }

            const newProduct = new Product(productData);
            await newProduct.save();
            createdProducts.push(newProduct);
            console.log(`  ✓ Created product: ${productData.name}`);
        }

        // ==================== ORDERS ====================
        console.log("\n🛒 Seeding Orders...");
        const testOrders = [
            {
                orderNumber: "ORD-2026-001",
                customerId: createdUsers[2]._id, // John Doe
                customerName: createdUsers[2].name,
                items: [
                    {
                        productId: createdProducts[0]._id,
                        productName: createdProducts[0].name,
                        quantity: 2,
                        unitPrice: createdProducts[0].unitPrice,
                        totalPrice: 2 * createdProducts[0].unitPrice
                    }
                ],
                totalAmount: 2 * createdProducts[0].unitPrice,
                status: "Delivered",
                paymentStatus: "Paid",
                paymentMethod: "Cash",
                orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                deliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                orderNumber: "ORD-2026-002",
                customerId: createdUsers[3]._id, // Jane Smith
                customerName: createdUsers[3].name,
                items: [
                    {
                        productId: createdProducts[1]._id,
                        productName: createdProducts[1].name,
                        quantity: 5,
                        unitPrice: createdProducts[1].unitPrice,
                        totalPrice: 5 * createdProducts[1].unitPrice
                    }
                ],
                totalAmount: 5 * createdProducts[1].unitPrice,
                status: "Processing",
                paymentStatus: "Paid",
                paymentMethod: "Credit Card",
                orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                orderNumber: "ORD-2026-003",
                customerId: createdUsers[4]._id, // Mike Johnson
                customerName: createdUsers[4].name,
                items: [
                    {
                        productId: createdProducts[2]._id,
                        productName: createdProducts[2].name,
                        quantity: 10,
                        unitPrice: createdProducts[2].unitPrice,
                        totalPrice: 10 * createdProducts[2].unitPrice
                    }
                ],
                totalAmount: 10 * createdProducts[2].unitPrice,
                status: "Shipped",
                paymentStatus: "Paid",
                paymentMethod: "Bank Transfer",
                orderDate: new Date()
            },
            {
                orderNumber: "ORD-2026-004",
                customerId: createdUsers[2]._id, // John Doe
                customerName: createdUsers[2].name,
                items: [
                    {
                        productId: createdProducts[3]._id,
                        productName: createdProducts[3].name,
                        quantity: 3,
                        unitPrice: createdProducts[3].unitPrice,
                        totalPrice: 3 * createdProducts[3].unitPrice
                    }
                ],
                totalAmount: 3 * createdProducts[3].unitPrice,
                status: "Pending",
                paymentStatus: "Unpaid",
                paymentMethod: "Cash",
                orderDate: new Date()
            },
            {
                orderNumber: "ORD-2026-005",
                customerId: createdUsers[3]._id, // Jane Smith
                customerName: createdUsers[3].name,
                items: [
                    {
                        productId: createdProducts[4]._id,
                        productName: createdProducts[4].name,
                        quantity: 1,
                        unitPrice: createdProducts[4].unitPrice,
                        totalPrice: 1 * createdProducts[4].unitPrice
                    }
                ],
                totalAmount: 1 * createdProducts[4].unitPrice,
                status: "Delivered",
                paymentStatus: "Paid",
                paymentMethod: "Cash",
                orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                deliveryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            }
        ];

        for (const orderData of testOrders) {
            const existingOrder = await Order.findOne({ orderNumber: orderData.orderNumber });
            if (existingOrder) {
                console.log(`  ✓ Order exists: ${orderData.orderNumber}`);
                continue;
            }

            const newOrder = new Order(orderData);
            await newOrder.save();
            console.log(`  ✓ Created order: ${orderData.orderNumber}`);
        }

        // ==================== SUMMARY ====================
        console.log("\n✅ Database seeding completed successfully!\n");
        console.log("📊 Seeding Summary:");
        console.log(`   Users created: ${createdUsers.length}`);
        console.log(`   Products created: ${createdProducts.length}`);
        console.log(`   Orders created: ${testOrders.length}`);
        console.log("\n📝 Test Credentials:");
        console.log("   Admin: admin@atan.com / password123");
        console.log("   Staff: staff@atan.com / password123");
        console.log("   Customer: john@atan.com / password123\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error.message);
        process.exit(1);
    }
};

// Execute seeding
seedDatabase();
