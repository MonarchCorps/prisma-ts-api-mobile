import dotenv from "dotenv";
import registerRoute from "./routes/auth/registerRoute";
import authRoute from "./routes/auth/authRoute";
import prisma from "./prisma";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import verifyJWT from "./middleware/verifyJWT";
const app = express();
const envPort = process.env.PORT;
const PORT = envPort ? parseInt(envPort) : 3500;
const cookieOptions = {
    decode: (val) => decodeURIComponent(val),
};
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_KEY, cookieOptions));
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/register/v1", registerRoute);
app.use("/auth/v1", authRoute);
app.use(verifyJWT);
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to Database successfully");
        app.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            process.exit(1); // Optional: exit if DB connection fails
        }
        else {
            console.error("Unknown error", error);
        }
    }
};
startServer();
// Graceful shutdown
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Disconnected from DB");
    process.exit(0);
});
