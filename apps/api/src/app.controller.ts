import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject } from '@nestjs/common';
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

  @Get()
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      {},
    );
  }
}
