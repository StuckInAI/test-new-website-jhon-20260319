import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('json')
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
    name: string;
  }>;

  @Column('decimal')
  total: number;

  @Column()
  status: string;

  @Column('json')
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Column()
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;
}