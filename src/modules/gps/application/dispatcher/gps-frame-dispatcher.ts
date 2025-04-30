import { Injectable } from '@nestjs/common';
import { Gt06FrameHandler } from '../../infrastructure/protocols/gt06-frame-handler';

@Injectable()
export class GpsFrameDispatcher {
  constructor(private readonly gt06: Gt06FrameHandler) {}

  async dispatch(frame: string) {
    if (frame.startsWith('7878')) {
      await this.gt06.handle(frame);
    } else {
      console.warn('⚠️ Protocolo no reconocido');
    }
  }
}
