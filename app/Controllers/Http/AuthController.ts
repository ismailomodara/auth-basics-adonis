import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const validations = schema.create({
      username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username'})]),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email'})]),
      password: schema.string({}, [rules.minLength(8)])
    })

    const data = await request.validate({ schema: validations })
    const user = await User.create(data)

    await auth.login(user)

    return {
      ...user
    }
  }

  public async login({ request, auth }: HttpContextContract) {
    const { identifier: uid, password } = request.only(['identifier', 'password']);

    try {
      const user = await auth.attempt(uid, password);
      return {
        ...user
      }
    } catch {
      return {
        status: false,
        message: "Invalid credentials"
      }
    }

  }
}
