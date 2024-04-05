import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
