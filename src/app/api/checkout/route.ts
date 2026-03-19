import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AppDataSource } from '@/lib/database';
import { Order } from '@/entities/Order';
import { Cart } from '@/entities/Cart';
import { Product } from '@/entities/Product';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { shippingAddress, paymentMethod } = await request.json();
    await AppDataSource.initialize();
    const cartRepository = AppDataSource.getRepository(Cart);
    const orderRepository = AppDataSource.getRepository(Order);
    const productRepository = AppDataSource.getRepository(Product);
    const cart = await cartRepository.findOne({ where: { userId: session.user.id } });
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    let total = 0;
    const orderItems = await Promise.all(cart.items.map(async (item: any) => {
      const product = await productRepository.findOne({ where: { id: item.productId } });
      if (!product) throw new Error('Product not found');
      total += product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
      };
    }));
    const order = orderRepository.create({
      userId: session.user.id,
      items: orderItems,
      total,
      status: 'pending',
      shippingAddress,
      paymentMethod,
    });
    await orderRepository.save(order);
    cart.items = [];
    await cartRepository.save(cart);
    return NextResponse.json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}