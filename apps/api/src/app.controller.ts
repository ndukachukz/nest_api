import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth')
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('auth')
  async createUser() {
    return this.authService.send(
      {
        cmd: 'create-user',
      },
      {},
    );
  }
}
