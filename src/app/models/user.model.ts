import { Roles } from './roles.model';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  roles: Roles;
}
