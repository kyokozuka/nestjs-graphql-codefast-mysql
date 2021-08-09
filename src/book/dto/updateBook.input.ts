import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { Max, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateBookInput {
  @Field(type => ID)
  id: number;

  @Field()
  @MaxLength(255)
  title: string;

  @Field(type => Int)
  @Min(0)
  @Max(9999)
  price: number;

  @Field(type => String)
  author: string;
}