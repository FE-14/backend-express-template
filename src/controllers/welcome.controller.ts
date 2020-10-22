import express, { Request, Response } from 'express'
import { auth } from '../middleware/auth'
import IControllerBase from '../interfaces/IControllerBase.interface'
import Controller from '../interfaces/Controller.interface'

class WelcomeController extends Controller implements IControllerBase {
  constructor() {
    super()

    this.path = '/'
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', this.index)
    this.router.get('/coba', auth, this.coba)
  }

  private async index(req: Request, res: Response) {
    try {
      // TODO: tambahkan ke helper
      res.json({
        success: true,
        message: 'Welcome to API v1'
      })
    } catch(e) {
      Promise.reject(e)
    }
  }

  private async coba(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        message: 'Coba'
      })
    } catch(e) {
      Promise.reject(e)
    }
  }
}

export default WelcomeController