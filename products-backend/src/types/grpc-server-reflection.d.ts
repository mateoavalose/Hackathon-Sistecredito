declare module 'grpc-server-reflection' {
  import { Server } from '@grpc/grpc-js';

  export class ReflectorService {
    start(server: Server): void;
  }
}
