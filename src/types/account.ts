export enum AccountType {
  LOCAL = 'LOCAL',
  LDAP = 'LDAP'
}

export interface Mark {
  text: string;
}

export interface Account {
  id: string;
  marks: Mark[];
  type: AccountType;
  login: string;
  password: string;
}
