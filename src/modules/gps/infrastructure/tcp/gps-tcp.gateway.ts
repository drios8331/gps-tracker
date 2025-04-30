import { Injectable, OnModuleInit } from '@nestjs/common';
import * as net from 'net';
import { GpsFrameDispatcher } from '../../application/dispatcher/gps-frame-dispatcher';

@Injectable()
export class GpsTcpGateway implements OnModuleInit {
  constructor(private readonly dispatcher: GpsFrameDispatcher) {}

  onModuleInit() {
    const server = net.createServer((socket) => {
      // console.log('📡 Dispositivo conectado por TCP');

      socket.on('data', async (data) => {
        const hex = data.toString('hex');
        // console.log('📥 Trama recibida (hex):', hex);
        await this.dispatcher.dispatch(hex);
      });

      socket.on('end', () => console.log('🔌 Dispositivo desconectado'));
      socket.on('error', (err) => console.error('❌ Error en socket:', err));
    });

    server.listen(5001, () => {
      console.log('🚀 Servidor TCP escuchando en puerto 5001');
    });
  }
}
