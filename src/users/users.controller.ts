import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';

@Controller('auth')
export class UsersController {
  @Post('signup')
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
  }
}
