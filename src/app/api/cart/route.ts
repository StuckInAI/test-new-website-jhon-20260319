import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AppDataSource } from '@/lib/database';
import { Cart } from '@/entities/Cart';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await AppDataSource.initialize();
    const cartRepository = AppDataSource.getRepository(Cart);
    const cart = await cartRepository.findOne({ where: { userId: session.user.id } });
    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { items } = await request.json();
    await AppDataSource.initialize();
    const cartRepository = AppDataSource.getRepository(Cart);
    let cart = await cartRepository.findOne({ where: { userId: session.user.id } });
    if (cart) {
      cart.items = items;
    } else {
      cart = cartRepository.create({ userId: session.user.id, items });
    }
    await cartRepository.save(cart);
    return NextResponse.json({ message: 'Cart updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}