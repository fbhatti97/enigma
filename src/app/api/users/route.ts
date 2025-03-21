import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const client = await prisma.client; // Get the PrismaClient instance
    const users = await client.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const client = await prisma.client; // Get the PrismaClient instance
    const user = await client.user.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}