import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Contact } from './entity/Contact'

const databasePath = process.env.DATABASE_URL || './database.sqlite'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
  logging: false,
  entities: [Contact],
  migrations: [],
  subscribers: [],
})

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection initialized')
  })
  .catch((error) => {
    console.error('Error initializing database:', error)
  })