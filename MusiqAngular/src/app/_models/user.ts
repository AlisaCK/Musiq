import { Role } from './role';

export class User {
  username: string;
  role: Role;
  token?: string;
  caloriegoal: number;
  minutegoal: number;
}

export class Goals {
  caloriegoal: number;
  minutegoal: number;
}
