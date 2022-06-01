import { StatusCodes } from 'http-status-codes';

export default class RequestError extends Error {
  constructor(public status: StatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
