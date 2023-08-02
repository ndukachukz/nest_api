import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { dataSourceOptions } from './db/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          ...dataSourceOptions,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
