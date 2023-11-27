class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly fieldName: string | undefined;

  constructor(message: string, statusCode?: number, fieldName?: string) {
    this.fieldName = fieldName;
    this.message = message;
    this.statusCode = statusCode ?? 400;
  }
}

export default AppError;
