export class User {
  email: string;
  password: string;
}
export class UserDetails {
  headIcon: string;
  gender: string;
  birth: any;
  city: string;
  age: number;
  blogYear: number;
  mobile: string;
  occupation: string;
  personalSignature: string;
  sign: string;
  userName: string;
  email: string;
  password: string;
  school: string;

}
export class Friend {
  id: number;
  friendName: string;
  currentAccountId: number;
  friendId: number;
  groupId: number;
  status: number;
  specialAttention: boolean;
}
export class DateLab {
  create: string;
  count: number;
}
export class Assortment {
  assortmentName: string;
  articleNum: number;
}
export class Comment {
  comment: string;
  articleId: number;
  fromAccountId: number;
  replayComentId: number;
  source: number;
  toAccountId: number;
  currentAccountId: number;
  pictureGroupId: number;
}
