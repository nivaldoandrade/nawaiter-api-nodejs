declare namespace Express {
  interface Request {
    user: {
      id: string;
      role: string;
    };
    table: {
      id: string;
    };
  }
}
