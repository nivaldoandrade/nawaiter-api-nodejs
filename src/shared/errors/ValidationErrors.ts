type IError =
  | {
      [x: string]:
        | string[]
        | (
            | {
                [x: string]: string[];
              }
            | undefined
          )[];
    }[]
  | undefined;

class ValidationErrors {
  public readonly errors: IError;

  constructor(errors: IError) {
    this.errors = errors;
  }
}

export default ValidationErrors;
