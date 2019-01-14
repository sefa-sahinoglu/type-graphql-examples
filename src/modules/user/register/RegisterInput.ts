import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @Length(1, 255)
  @IsEmail()
  @IsEmailAlreadyExist({ message: "E-mail already in use" })
  email: string;

  @Field()
  @Length(6, 30)
  password: string;
}
