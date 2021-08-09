import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { NewBookInput } from './dto/newBook.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookInput } from './dto/updateBook.input';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepostiory: Repository<Book>
  ){}

  findAll(): Promise<Book[]> {
    return this.booksRepostiory.find();
  }

  findOneById(id: number): Promise<Book> {
    return this.booksRepostiory.findOne(id)
  }

  async create(data: NewBookInput): Promise<Book> {
    const book = this.booksRepostiory.create(data);
    await this.booksRepostiory.save(book);
    return book;
  }

  async update(data: UpdateBookInput): Promise<Book> {
    const book = await this.booksRepostiory.findOne(data.id);
    book.title = data.title;
    book.price = data.price;
    book.author = data.author;
    await this.booksRepostiory.save(book);
    return book;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepostiory.delete(id);
    return result.affected > 0;
  }
}
