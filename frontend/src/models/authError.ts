// maybe a better way to do this
// just holds the code i set to show in frontend :)

export default class AuthError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = "ValidationError"
  }
}