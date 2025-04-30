import { Injectable } from '@nestjs/common';
import { LaravelApiService } from '../../infrastructure/http/laravel-api.service';

interface Gt06FrameDto {
  imei: string;
  lat: number;
  lng: number;
  timestamp: string;
  battery_level: number;
  simInserted: boolean;
  speed: number;
  trama: string;
}

@Injectable()
export class ProcessGt06FrameUseCase {
  constructor(private readonly api: LaravelApiService) {}

  async execute(data: Gt06FrameDto) {
    await this.api.sendGpsData(data);
  }
}
