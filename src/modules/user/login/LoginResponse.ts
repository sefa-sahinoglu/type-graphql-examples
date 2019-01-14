import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  ok: Boolean;
  @Field(() => String, { nullable: true })
  token: string | null;
}
