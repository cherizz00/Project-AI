
const { PrismaClient } = require("@prisma/client");
const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const db = new PrismaClient();
const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = await scryptAsync(password, salt, 64);
    return `${salt}:${derivedKey.toString("hex")}`;
}

async function main() {
    const password = await hashPassword("password123");

    const users = [
        {
            email: "user@example.com",
            name: "Test User 1",
            password,
        },
        {
            email: "user2@example.com",
            name: "Test User 2",
            password,
        },
    ];

    for (const u of users) {
        // Upsert equivalent for user by email
        const existing = await db.user.findUnique({
            where: { email: u.email },
        });

        if (existing) {
            await db.user.update({
                where: { email: u.email },
                data: { password: u.password }
            });
            console.log(`Updated password for: ${u.email}`);
        } else {
            await db.user.create({
                data: u
            });
            console.log(`Created user: ${u.email}`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
