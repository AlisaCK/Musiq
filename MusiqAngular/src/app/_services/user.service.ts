import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';






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

  updateInfo(user: User){
    return this.http.post(`http://localhost:3030/user/updateInfo`, user);
  }

  getInfo(username: string){
    let path = `http://localhost:3030/user/getInfo/`;
    path = path.concat(username);
    return this.http.get<User>(path);
  }
}
