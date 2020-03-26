
import { Injectable } from '@angular/core';


import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Observable} from 'rxjs';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3030/user/allusers');
  }



  register(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3030/user/register`, user);
  }







}
