import { User } from "../../../entity/User";
import { Query, Mutation, Arg, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./RegisterInput";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("registerInput") registerInput: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerInput.password, 10);
    const user = await User.create({
      ...registerInput,
      password: hashedPassword
    }).save();

    return user;
  }
}
