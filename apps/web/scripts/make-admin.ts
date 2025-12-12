
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const TARGET_EMAIL = "cherrybangari583@gmail.com";

async function main() {
    const user = await db.user.findUnique({
        where: { email: TARGET_EMAIL },
    });

    if (!user) {
        console.error(`User ${TARGET_EMAIL} not found! Run 'npx tsx scripts/ensure-test-users.ts' first.`);
        process.exit(1);
    }

    // Set plan to PRO and expiry to 100 years from now
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 100);

    await db.user.update({
        where: { email: TARGET_EMAIL },
        data: {
            plan: "PRO",
            planExpiry: futureDate,
        },
    });

    console.log(`✅ Successfully upgraded ${TARGET_EMAIL} to PRO plan.`);
    console.log(`   Expiry: ${futureDate.toISOString()}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
