interface IStore {
  user: IUserStore;
}

interface IUserStore {
  userInfo: any;
  getUserInfo: any;
}
