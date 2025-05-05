import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface LocationDto {
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
export class LaravelApiService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('API_URL') ??
      (() => {
        throw new Error('❌ LARAVEL_API_URL no está definida en el .env');
      })();
  }

  async sendGpsData(data: LocationDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}locations/gps-tracker`, data),
      );
      console.log('✅ Laravel respondió:', response.status);
      console.log('-----------------------------------------------------------');
    } catch (error) {
      console.error('❌ Error al enviar a Laravel:', error.message);
      console.log('-----------------------------------------------------------');
    }
  }
}
