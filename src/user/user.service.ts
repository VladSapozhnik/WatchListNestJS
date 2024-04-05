import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { users } from './moks';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Watchlist } from 'src/watchlist/entities/watchlist.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  getUsers() {
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    createUserDto.password = await this.hashPassword(
      String(createUserDto.password),
    );

    const newUser = {
      firstName: createUserDto.firstName,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    };

    await this.userRepository.create(newUser);
    return createUserDto;
  }

  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: Watchlist,
        required: false,
      },
    });
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { email } });
    return true;
  }
}
