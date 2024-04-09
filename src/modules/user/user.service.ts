import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { users } from './moks';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Watchlist } from 'src/modules/watchlist/entities/watchlist.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  getUsers() {
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
