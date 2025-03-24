import prisma from "../../prisma";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, getErrorMessage } from "../../utils";
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "All fields are required"
            });
            return;
        }
        const duplicateEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (duplicateEmail) {
            res.status(400).json({
                message: "Email is already in use"
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.status(201).json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to register",
            error: getErrorMessage(error),
        });
    }
};
export { register };
