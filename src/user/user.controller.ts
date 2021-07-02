import { Body, Controller, Get, Inject, Post, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO, UserPrivateSession, UserPublicSession } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


 @Inject()
 userService: UserService

 @Post('register')
 @UsePipes(new ValidationPipe())
 async register(
  @Body() register: UserRegisterDTO
 ) {
  await this.userService.addUser(register)
 }


 @Post('login')
 @UsePipes(new ValidationPipe())
 async login(
  @Body() login: UserLoginDTO,
  @Session() session: UserPrivateSession
 ): Promise<UserPublicSession> {
  const res = await this.userService.login(login)
  // if no exception is thrown, the login is successful
  session.logined = true
  session.email = res.email
  return {
   email: session.email,
   avatar: session.avatar
  }
 }

 @Get('/info')
 async info(@Session() session: UserPublicSession) {
  return {
   email: session.email,
   avatar: session.avatar
  }
 }
}
