export default interface ISigninResponse {
  code: number;
  message: string;
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}
