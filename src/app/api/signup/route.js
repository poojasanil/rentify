import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { email, password, name, phonenumber, role } = await req.json()


    if (!email || !password || !name || email.trim() === '' || password.trim() === '' || name.trim() === '' || phonenumber.trim() === '') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check existing user
    const existingUsers = await fetch(
      `http://localhost:4001/users?email=${encodeURIComponent(email)}`
    ).then(r => r.json())

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const newUser = {
      email,
      name,
      passwordHash: hashedPassword,
      role,
      phone: phonenumber,
      verified: true,
    }

    const createResponse = await fetch('http://localhost:4001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
        console.log(createResponse)
    if (!createResponse.ok) {
      throw new Error('Failed to create user')
    }

    const createdUser = await createResponse.json()
    
   
    const { passwordHash: _, ...userWithoutPassword } = createdUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
