import { AppDataSource } from './database';
import { User } from '@/entities/User';
import { Product } from '@/entities/Product';
import bcrypt from 'bcryptjs';

async function seed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);

  // Seed admin user
  const adminExists = await userRepository.findOne({ where: { email: 'admin@example.com' } });
  if (!adminExists) {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = userRepository.create({
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    });
    await userRepository.save(admin);
    console.log('Admin user created');
  }

  // Seed sample products
  const productCount = await productRepository.count();
  if (productCount === 0) {
    const products = [
      {
        name: 'iPhone 15 Pro',
        brand: 'Apple',
        description: 'Latest iPhone with A17 Pro chip and titanium design.',
        price: 999,
        images: ['/images/iphone15pro.jpg'],
        specifications: {
          ram: '8GB',
          storage: '128GB',
          display: '6.1-inch Super Retina XDR',
          camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
          battery: '3274 mAh',
        },
        stock: 50,
        category: 'Flagship',
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        description: 'Premium Android phone with S Pen and advanced camera.',
        price: 1299,
        images: ['/images/s24ultra.jpg'],
        specifications: {
          ram: '12GB',
          storage: '256GB',
          display: '6.8-inch Dynamic AMOLED 2X',
          camera: '200MP Wide + 12MP Ultra Wide + 50MP Telephoto + 10MP Telephoto',
          battery: '5000 mAh',
        },
        stock: 30,
        category: 'Flagship',
      },
      {
        name: 'Google Pixel 8 Pro',
        brand: 'Google',
        description: 'AI-powered smartphone with Tensor G3 chip.',
        price: 999,
        images: ['/images/pixel8pro.jpg'],
        specifications: {
          ram: '12GB',
          storage: '128GB',
          display: '6.7-inch LTPO OLED',
          camera: '50MP Wide + 48MP Ultra Wide + 48MP Telephoto',
          battery: '5050 mAh',
        },
        stock: 40,
        category: 'Flagship',
      },
    ];
    for (const productData of products) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
    }
    console.log('Sample products created');
  }

  console.log('Seeding completed');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});