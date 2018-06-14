export class UserTokenDto {
  email: string;
  token: string;
}

export class UpdateUserPasswordUsingTokenDto {
  email: string;
  token: string;
  password: string;
}
