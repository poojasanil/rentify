'use client';

import { NextResponse } from 'next/server';

export async function POST(req) {

    console.log("hereeeeee")

    console.log("REQQQQ", req)
    return NextResponse.json({message: "Hello from properties route"})
//   try {
//     const { eventId, userId, count, totalRs, status } = await req.json();

//     if (!eventId || !userId || !count || !totalRs) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }


//     const seatsResponse = await fetch(`http://localhost:4001/seats?eventId=${eventId}`);
//     const seats = await seatsResponse.json();
    
//     if (!seats.length || seats[0].available < count) {
//       return NextResponse.json(
//         { error: 'Not enough seats available' },
//         { status: 400 }
//       );
//     }


//     const bookingResponse = await fetch('http://localhost:4001/invoices', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         eventId,
//         userId,
//         count,
//         totalRs,
//         date: new Date().toISOString(),
//         status
//       })
//     });

//     if (!bookingResponse.ok) {
//       throw new Error('Failed to create booking');
//     }


//     const updatedSeats = {
//       ...seats[0],
//       available: seats[0].available - count
//     };

//     await fetch(`http://localhost:4001/seats/${seats[0].id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedSeats)
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: await bookingResponse.json()
//     });

//   } catch (error) {
//     console.error('Booking error:', error);
//     return NextResponse.json(
//       { error: 'Failed to process booking' },
//       { status: 500 }
//     );
//   }
}