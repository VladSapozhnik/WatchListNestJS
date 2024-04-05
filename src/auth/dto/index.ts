import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UserLoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
