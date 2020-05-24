export interface User {
  login: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  yearOld: number;
}

interface ObjectID {
  _id: {
    $oid: string;
  };
}

export type UserDocument = ObjectID & User;
