import { NotFoundException } from '@nestjs/common';
import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Book } from './book';
import { BookService } from './book.service';
import { NewBookInput } from './dto/newBook.input';
import { UpdateBookInput } from './dto/updateBook.input';

@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(returns => [Book])
  getbooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(returns => Book)
  async book(@Args({ name: 'id', type: () => Int }) id: number) {
    const book = await this.bookService.findOneById(id)
    if(!book) {
      throw new NotFoundException(id);
    }
    return book;
  }

  @Mutation(returns => Book)
  updateBook(@Args('updateBook') updateBook: UpdateBookInput): Promise<Book> {
    return this.bookService.update(updateBook);
  }

  @Mutation(returns => Book)
  addBook(@Args('newBook') newBook: NewBookInput): Promise<Book> {
    return this.bookService.create(newBook)
  }

  @Mutation(returns => Boolean)
  async removeBook(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.bookService.remove(id)
  }
}
