import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const facility = db.facilities.getById(id);

    if (!facility) {
        return NextResponse.json({ error: 'Facility not found' }, { status: 404 });
    }

    return NextResponse.json(facility);
}
