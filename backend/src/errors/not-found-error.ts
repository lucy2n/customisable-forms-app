import { NOT_FOUND_ERROR } from "../utils/constants";

class NotFoundError extends Error {
    public statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.statusCode = NOT_FOUND_ERROR;
    }
  }
  
export default NotFoundError;