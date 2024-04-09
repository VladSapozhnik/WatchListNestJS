import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiTags('API friends')
  @Get('friends')
  getUsers() {
    return this.appService.getUsers();
  }
  @ApiTags('API friends')
  @Get('friends/:id')
  getUser(@Param('id') id: string): IUser {
    return this.appService.getUser(+id);
  }
  @ApiTags('API friends')
  @Post('friends')
  async create(@Body() createFriendDto: CreateFriendDto) {
    return this.appService.createUser(createFriendDto);
  }
}
