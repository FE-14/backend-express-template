import express, { Request, Response } from 'express'
import { User } from '../models'
import IControllerBase from '../interfaces/IControllerBase.interface'
import { authenticate } from '../middleware/auth'

class WelcomeController implements IControllerBase {
    public path = '/users'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', authenticate, this.index)
    }

    private async index(req: Request, res: Response) {
        try {
            res.json({
                success: true,
                data: await User.findAll()
            })
        } catch (e) {
            Promise.reject(e)
        }
    }
}

export default WelcomeController