export interface Token {
  header: string;
  payload: string;
  signature: string;
  exp: number;
}

interface ObjectID {
  _id: {
    $oid: string;
  };
}

export type TokenDocument = ObjectID & Token;
