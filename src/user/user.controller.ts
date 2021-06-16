import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from './user.dto';
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
  @Body() login: UserLoginDTO
 ): Promise<{
  email: string
 }> {
  return await this.userService.login(login)
 }
}
