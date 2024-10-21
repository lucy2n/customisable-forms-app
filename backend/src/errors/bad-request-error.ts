import { BAD_REQUEST_ERROR } from "../utils/constants";

class BadRequestError extends Error {
    public statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.statusCode = BAD_REQUEST_ERROR;
    }
  }
  
export default BadRequestError;