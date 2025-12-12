import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

async function main() {
    const password = await hash("password123", 12);

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
        {
            email: "cherrybangari583@gmail.com",
            name: "Admin User",
            password,
        },
    ];

    for (const u of users) {
        const existing = await db.user.findUnique({
            where: { email: u.email },
        });

        if (!existing) {
            await db.user.create({
                data: u,
            });
            console.log(`Created user: ${u.email}`);
        } else {
            console.log(`User already exists: ${u.email}`);
            // Optional: Reset their usage for testing
            // await db.usageLog.deleteMany({ where: { userId: existing.id } });
            // console.log(`Reset usage limits for: ${u.email}`);
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
