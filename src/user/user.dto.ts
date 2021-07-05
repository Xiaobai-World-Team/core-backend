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


export class UserPrivateSession {
 _id: string
 email: string
 avatar: string
}

export class UserPublicSession {
 email: string
 avatar: string
}
