import { Injectable } from '@nestjs/common';
import { ProcessGt06FrameUseCase } from '../../application/use-cases/process-gt06-frame.usecase';

@Injectable()
export class Gt06FrameHandler {
  constructor(private readonly useCase: ProcessGt06FrameUseCase) {}

  async handle(hex: string) {
    // console.log('🧩 Procesando trama GT06...');
    console.log('📥 Trama recibida (hex):', hex);
    const payload = this.parseGt06Frame(hex);
    // console.log('📦 Datos parseados:', payload);

    await this.useCase.execute(payload);
  }

  private parseGt06Frame(hex: string): {
    imei: string;
    lat: number;
    lng: number;
    timestamp: string;
    battery_level: number;
    simInserted: boolean;
    speed: number;
    trama: string;
  } {
    const buf = Buffer.from(hex, 'hex');

    // 📅 Fecha y hora
    const year = 2000 + buf[4];
    const month = buf[5];
    const day = buf[6];
    const hour = buf[7];
    const minute = buf[8];
    const second = buf[9];
    const timestamp = `${year}-${this.pad(month)}-${this.pad(day)} ${this.pad(hour)}:${this.pad(minute)}:${this.pad(second)}`;

    // 📍 GPS flags
    const gpsFlags = buf[10];
    const ns = (gpsFlags >> 2) & 1; // 1 = Norte
    const ew = (gpsFlags >> 1) & 1; // 1 = Este

    // 🌐 Lat/Lng
    const latRaw = buf.readUInt32BE(11);
    const lngRaw = buf.readUInt32BE(15);
    const lat = latRaw / 1800000.0;
    const lng = -1 * (lngRaw / 1800000.0);

    // 🚗 Velocidad
    const speed = buf[19];

    // 🔋 Batería
    const battery_level = buf[41]; // entero directo

    // 📲 SIM insertada
    const simStatus = buf[40];
    const simInserted = (simStatus & 0x01) === 1;

    // 📱 IMEI en BCD (8 bytes)
    const imei = [...buf.slice(53, 61)]
      .map((byte) => {
        const high = (byte >> 4) & 0x0f;
        const low = byte & 0x0f;
        return `${high}${low}`;
      })
      .join('')
      .replace(/^0+/, '');

    return {
      imei,
      lat: +lat.toFixed(9),
      lng: +lng.toFixed(9),
      timestamp,
      battery_level,
      simInserted,
      speed,
      trama: hex,
    };
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
