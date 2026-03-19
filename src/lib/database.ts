import { DataSource } from 'typeorm';
import { User } from '@/entities/User';
import { Product } from '@/entities/Product';
import { Cart } from '@/entities/Cart';
import { Order } from '@/entities/Order';
import { Review } from '@/entities/Review';

const databaseUrl = process.env.DATABASE_URL || 'file:./database.sqlite';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databaseUrl.replace('file:', '').trim(),
  synchronize: true,
  logging: false,
  entities: [User, Product, Cart, Order, Review],
  migrations: [],
  subscribers: [],
});

// Initialize database connection
export async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database initialized');
  }
}