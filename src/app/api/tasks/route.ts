import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    return NextResponse.json(db.tasks.getAll());
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const newTask = db.tasks.create({
        id: `task-${Date.now()}`,
        created_at: new Date().toISOString(),
        status: 'to_do',
        progress: 0,
        ...body
    });
    return NextResponse.json(newTask);
}
