import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AppService {
  private userArray: IUser[] = [
    {
      id: 1,
      name: 'Vlad',
    },
    {
      id: 2,
      name: 'Vika',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }
  getUsers() {
    return this.userArray;
  }
  getUser(id: number): IUser {
    return this.userArray.find((item) => item.id === id);
  }
  createUser(createFriendDto: CreateFriendDto) {
    if (createFriendDto.name === undefined)
      throw new BadRequestException('Веденные некорректные данные');
    const user = {
      id: Number(new Date()),
      name: createFriendDto.name,
    };
    this.userArray.push(user);
    return user;
  }
}
