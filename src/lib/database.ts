import { DataSource } from 'typeorm';
import { User } from '@/entity/User';

// Database connection configuration
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.TYPEORM_DATABASE || 'database.sqlite',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [User],
  migrations: [],
  subscribers: [],
});

// Initialize database connection and seed with sample data
let isInitialized = false;

async function initializeDatabase() {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connection established');
      
      // Seed sample data if the database is empty
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      if (users.length === 0) {
        const sampleUser = userRepository.create({
          name: 'John Doe',
          email: 'john@example.com',
        });
        await userRepository.save(sampleUser);
        console.log('Sample user added to database');
      }
      isInitialized = true;
    } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    }
  }
}

// Function to get all users
export async function getUsers(): Promise<User[]> {
  await initializeDatabase();
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
}

export { AppDataSource };
