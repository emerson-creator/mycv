import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = {
      signup: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    fakeUsersService = {
      find: () => Promise.resolve([]),
      findOne: (id: number) =>
        Promise.resolve({ id, email: 'test@example.com' } as User),
      remove: (id: number) => Promise.resolve({ id } as User),
      update: (id: number, attrs: Partial<User>) =>
        Promise.resolve({ id, ...attrs } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'test@example.com' }] as User[]);

    const users = await controller.findAllUsers('test@example.com');
    expect(users).toEqual([{ id: 1, email: 'test@example.com' }]);
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser(1)).rejects.toThrow(NotFoundException);
  });
  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'test@example.com', password: 'password' },
      session,
    );
    expect(session.userId).toEqual(1);
    expect(user).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'password',
    });
  });
});
