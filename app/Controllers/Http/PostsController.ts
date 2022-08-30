// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async index() {
    return {
      success: true,
      message: "Posts fetched",
      data: []
    }
  }
}
