import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AppDataSource } from '@/lib/database'
import { Contact } from '@/lib/entity/Contact'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = contactSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors.map(e => e.message).join(', ') },
        { status: 400 }
      )
    }

    const { name, email, message } = validation.data

    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }

    // Create and save contact
    const contact = new Contact()
    contact.name = name
    contact.email = email
    contact.message = message
    contact.createdAt = new Date()

    const contactRepository = AppDataSource.getRepository(Contact)
    await contactRepository.save(contact)

    return NextResponse.json(
      { message: 'Contact form submitted successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 }
    )
  }
}