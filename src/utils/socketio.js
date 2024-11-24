import { Server } from 'socket.io'

export class MakeIo {
  static io = null

  static setServer(server) {
    if (!this.io) {
      this.io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST', 'PUT']
        }
      })
      console.log('Socket.io initialized')
    }
  }

  /**
   * 
   * @returns Instance of initialized io singleton instance
   */
  static getIO() {
    return this.io
  }
}