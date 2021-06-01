import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.configService.get('PG_HOST'));

    return {
      type: 'postgres',
      host: this.configService.get('PG_HOST'),
      port: +this.configService.get<number>('PG_PORT'),
      username: this.configService.get('PG_USER'),
      password: this.configService.get('PG_PASSWORD'),
      database: this.configService.get('PG_DATABASE'),
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    };
  }
}
