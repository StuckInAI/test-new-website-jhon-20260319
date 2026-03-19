import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column('simple-array')
  images: string[];

  @Column('json')
  specifications: {
    ram: string;
    storage: string;
    display: string;
    camera: string;
    battery: string;
  };

  @Column()
  stock: number;

  @Column()
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}