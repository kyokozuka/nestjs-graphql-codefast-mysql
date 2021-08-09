import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column({ length: 255 })
  @Field()
  title: string;

  @Column()
  @Field()
  author: string

  @Column({ type: 'int', unsigned: true })
  @Field(type => Int)
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date
}
