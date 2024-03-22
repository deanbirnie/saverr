import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userCount = async (req, res) => {
    try {
        const usersCount = await prisma.user.count();
    console.log(`There are ${usersCount} users.`);
    return res.status(200).json(usersCount);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: `${err.message}` });
    }
};

export const userList = async (req, res) => {
    try {
        const usersList = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
            }
        });
        return res.status(200).json(usersList);    
    } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: `${err.message}` });        
    }
};

export const apiTest = (req, res) => {
    try {
        return res.status(200).json({ message: "The server is operational." })
    } catch (err) {
        return res.status(500).json({ error: `${err.message}` });
    }
};