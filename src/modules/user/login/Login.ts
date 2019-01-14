import { User } from "../../../entity/User";
import { Mutation, Arg, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { LoginInput } from "./LoginInput";
import jwt from "jsonwebtoken";
import { LoginResponse } from "./LoginResponse";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("loginInput") loginInput: LoginInput
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: loginInput.email } });
    if (!user) {
      return {
        ok: false,
        token: null
      };
    }
    const verifyPassword = await bcrypt.compare(
      loginInput.password,
      user.password
    );
    if (!verifyPassword) {
      return {
        ok: false,
        token: null
      };
    }
    const token = await jwt.sign({ ...user }, "BAYA Bİ GİZLİ KEY");
    return {
      ok: true,
      token
    };
  }
}
