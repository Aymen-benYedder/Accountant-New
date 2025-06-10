interface IAuthProvider {
  login: (data: any) => Promise<any>;
  logout: () => Promise<boolean>;
}
