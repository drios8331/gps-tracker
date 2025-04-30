import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GpsTcpGateway } from './infrastructure/tcp/gps-tcp.gateway';
import { GpsFrameDispatcher } from './application/dispatcher/gps-frame-dispatcher';
import { Gt06FrameHandler } from './infrastructure/protocols/gt06-frame-handler';
import { ProcessGt06FrameUseCase } from './application/use-cases/process-gt06-frame.usecase';
import { LaravelApiService } from './infrastructure/http/laravel-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    GpsTcpGateway,
    GpsFrameDispatcher,
    Gt06FrameHandler,
    ProcessGt06FrameUseCase,
    LaravelApiService,
  ],
})
export class GpsModule {}
