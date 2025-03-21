import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config: SequelizeModuleOptions = {
          dialect: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadModels: true,
          synchronize: true,
        };
        return config;
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(private readonly sequelize: Sequelize) {}

  onApplicationShutdown() {
    console.log('Closing database connection');
    this.sequelize.close();
  }
}
