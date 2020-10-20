import express, { Application, Request, Response } from 'express'

class App {
  public app: Application

  constructor(appInit: { middleWares: any; controllers: any; }) {
    this.app = express()

    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/api/v1', controller.router)
      this.app.use('*', async (req: Request, res: Response) => {
        res.json({
          message: 'sorry bos, alamat yang anda tuju tidak terdaftar'
        })
      })
    })
  }
}

export default App