import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UpdateUserDto } from './dtos/update-user.dro';
import { UsersService } from './users.service';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData.email, userData.password);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    return this.usersService.update(id, userData);
  }
}
