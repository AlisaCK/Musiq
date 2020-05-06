
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Goals} from '../_models/user';






@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  // TODO: Delete the goals stuff
  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }



  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }


  setGoals(goals: Goals) {
      return this.http.post(`http://localhost:3030/user/setgoals`, goals);

  }

  getGoals(user: User) {
    var getpath = `http://localhost:3030/user/getgoals/`
    getpath = getpath.concat(user.username)
    return this.http.get<Goals>(getpath);
  }



}
