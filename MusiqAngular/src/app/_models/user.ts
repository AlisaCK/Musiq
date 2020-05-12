import { Role } from './role';

export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  token?: string;
  spotifyID: string;
}

