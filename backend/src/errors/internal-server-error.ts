import { SERVER_ERROR } from "../utils/constants";

class InternalServerError extends Error {
    public statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.statusCode = SERVER_ERROR;
    }
  }
  
export default InternalServerError;