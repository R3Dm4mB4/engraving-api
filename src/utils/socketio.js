import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

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
    this.setupListeners()
  }

  static setupListeners() {
    this.io.on('connection', (socket) => {
      this.setEmployeeToRoom(socket)
      this.authenticateSocket(socket)
    })
    console.log('Listeners set up')
  }

  /**
   * 
   * @param {Job} jobData Receives all data from request.
   * @description This handler emits the new job to frontend
   * and notifies the employee assigned to that job.
   */
  static pushJobToList(jobData) {
    // Job data will have the same structure as model
    const roomName = `employee_${jobData.assignedTo.employeeId}`
    this.io.to(roomName).emit('pushJobToList', jobData)
  }

  static authenticateSocket(socket) {
    socket.on('authenticate', async (token) => {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const employeeId = decoded.user.id
        const room = `employee_${employeeId}`
        socket.join(room)
        socket.emit('authenticated', { success: true })
      } catch (error) {
        console.error(`Invalid token sent through socket: ${socket.id}`, error)
        socket.emit('authenticated', { success: false, error: 'Invalid token' })
      }
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected: ',socket.id)
    })
  }
}