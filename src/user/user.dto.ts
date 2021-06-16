import { IsEmail, IsString, MinLength } from "class-validator";

export class UserRegisterDTO {
 @IsEmail()
 email: string

 @IsString()
 @MinLength(8)
 password: string

 @IsString()
 @MinLength(8)
 repeatPassword: string

}



export class UserLoginDTO {
 @IsEmail()
 email: string

 @IsString()
 @MinLength(8)
 password: string
}