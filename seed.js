import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectDB from './db/connection.js';

const register = async () => {
    try {
        // Mahalagang i-await ang connection bago mag-save
        await connectDB();

        // I-check muna kung exist na ang admin para iwas duplicate error
        const adminExists = await User.findOne({ email: "junats@gmail.com" });
        if (adminExists) {
            console.log("Admin user already exists.");
            return;
        }

        const hashPassword = await bcrypt.hash("junats", 10);
        const newUser = new User({
            name: "junats", // Inayos ko mula sa "amdin"
            email: "junats@gmail.com",
            password: hashPassword,
            address: "junats address",
            role: "admin"
        });

        await newUser.save();
        console.log("Admin user created successfully");
        
        // Opsyonal: I-close ang connection pagkatapos ng seeding
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
        process.exit(1);
    }
};

// Huwag kalimutang tawagin ang function
register();