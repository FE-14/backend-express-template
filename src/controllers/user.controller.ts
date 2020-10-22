import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import Controller from '../interfaces/Controller.interface'
import { auth } from '../middleware/auth'
import { successResponse } from '../utils'
import User from '../models/user.model'

class UserController extends Controller implements IControllerBase {
    constructor() {
        super()

        this.path = '/users';
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
    }

    private async index(req: Request, res: Response) {
        try {
            return successResponse({
                res,
                data: await User.findAll()
            })
        } catch (e) {
            res.json({
                success: false,
                message: 'Error cannot get data from db.'
            })
            Promise.reject(e)
        }
    }
}

export default UserController