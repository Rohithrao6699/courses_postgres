// interface Error {
//     name: string;
//     message: string;
//     stack?: string;
// }

export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "App Error";
    Error.captureStackTrace(this, this.constructor);
  }
}
