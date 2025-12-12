import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const email = "cherrybangari583@gmail.com";
    const user = await db.user.findUnique({
        where: { email },
        select: { email: true, plan: true, planExpiry: true }
    });

    if (user) {
        console.log(`User: ${user.email}`);
        console.log(`Plan: ${user.plan}`);
        console.log(`Expiry: ${user.planExpiry}`);
    } else {
        console.log(`User ${email} not found.`);
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
