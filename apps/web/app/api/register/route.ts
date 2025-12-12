import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
import { z } from "zod";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, role } = RegisterSchema.parse(body);

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                // @ts-ignore
                role: role || "Software Engineer",
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
                // @ts-ignore
                role: user.role,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid data", { status: 422 });
        }
        console.error("[REGISTER_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
