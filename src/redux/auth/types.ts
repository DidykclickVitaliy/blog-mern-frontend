export enum LoginStatusEnum {
  UNLOGINED = "unlogined",
  LOGINED = "logined",
  REJECTED = "rejected",
}

// export type UserLoginType = {
//   _id: string;
//   fullName: string;
//   email: string;
//   avatarUrl: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

export interface AuthSliceState {
  data: object;
  isAuth: boolean;
  status: LoginStatusEnum;
}
