// import { StatusCodes } from 'http-status-codes';
// import { Request, Response, NextFunction } from 'express';
// import MatchService from '../services/CreateMatch';

// interface IMatchController {
//   create: controller
// }

// type controller = (req: Request, res: Response, next: NextFunction) =>
// Promise<Response<unknown, Record<string, unknown>> | undefined>;

// class MatchController implements IMatchController {
//   private _service;

//   constructor() {
//     this._service = new MatchService();
//   }

//   public create = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const match = await this._service.create(req.body);
//       return res.status(StatusCodes.OK).json(match);
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export default MatchController;
