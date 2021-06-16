import { HttpException, Injectable } from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from './user.dto';
import { UserModel } from './user.model';
import * as crypto from 'crypto'
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {

 sha512(str: string) {
  const hash = crypto.createHash('sha512')
  return hash.update(str).digest('hex')
 }

 async addUser(register: UserRegisterDTO): Promise<boolean> {

  if (register.password !== register.repeatPassword) {
   throw new Error('The two passwords are ')
  }

  if (await UserModel.countDocuments({
   email: register.email
  }) > 0) {
   throw new HttpException('this email has been registered.', 500)
  }

  const salt = Date.now().toString(36) + Math.random().toString(36).substring(0, 16);
  const password = this.sha512(salt + register.password)

  await UserModel.create({
   _id: new ObjectId(),
   email: register.email,
   nickname: Math.random().toString(36).substring(2, 10),
   password,
   salt,
   createdAt: new Date
  })

  return false
 }

 async login(u: UserLoginDTO): Promise<{
  email: string,
 }> {

  const user = await UserModel.findOne({
   email: u.email
  })

  if (!user) {
   throw new HttpException('user not found', 500)
  }

  const pwd = this.sha512(user.salt + u.password)
  if (pwd !== user.password) {
   throw new HttpException('password is wrong', 500)
  }

  return {
   email: user.email
  }

 }
}
