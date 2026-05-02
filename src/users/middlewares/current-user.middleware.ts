import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Request, Response, NextFunction } from 'express';
import { User } from '../user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: User | null;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    } else {
      req.currentUser = null;
    }
    next();
  }
}
