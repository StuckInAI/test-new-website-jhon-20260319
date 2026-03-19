import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await AppDataSource.initialize();
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}