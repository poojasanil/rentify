'use client';

import { NextResponse } from 'next/server';

export async function GET(req) {

    console.log("appointment route")

    console.log("REQQQQ", req)
    return NextResponse.json({message: "Hello from properties route"})
}