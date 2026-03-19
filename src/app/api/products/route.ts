import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function GET(request: NextRequest) {
  try {
    await AppDataSource.initialize();
    const productRepository = AppDataSource.getRepository(Product);
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;
    const skip = (page - 1) * limit;
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const ram = searchParams.get('ram');
    const storage = searchParams.get('storage');
    const query = productRepository.createQueryBuilder('product');
    if (brand) query.andWhere('product.brand = :brand', { brand });
    if (minPrice) query.andWhere('product.price >= :minPrice', { minPrice: parseFloat(minPrice) });
    if (maxPrice) query.andWhere('product.price <= :maxPrice', { maxPrice: parseFloat(maxPrice) });
    if (ram) query.andWhere('product.specifications->>"ram" = :ram', { ram });
    if (storage) query.andWhere('product.specifications->>"storage" = :storage', { storage });
    const [products, total] = await query.skip(skip).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({ products, totalPages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}