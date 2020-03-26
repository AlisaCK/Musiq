
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {PARecord} from '../_models/PARecord';
import {User} from '../_models/user';
import {Observable} from 'rxjs';
import {PAType} from '../_models/PAType';




@Injectable({ providedIn: 'root' })
export class PArecordService {
  constructor(private http: HttpClient, private auth: AuthService) { }


  //TODO: write a function that will fetch 'PArecord[]' from the server. Hint: use HttpClient's 'get()'.
  fetchPArecords(): Observable<PARecord[]> {
    return this.http.get<PARecord[]>('http://localhost:3030/parecord/getparecords');
  }




  //TODO: write a function that will (1) generate a random course and then (2) 'post' it on the server.  Hint: use HttpClient's 'get()'.
  createPArecord(): Observable<PARecord> {
    const type: PAType[] = [PAType.biking, PAType.running, PAType.walking];
    return this.http.post<PARecord>('http://localhost:3030/parecord/addparecord', {
      calories: Math.floor(Math.random() * 2000),
      minutes: Math.floor(Math.random() * 700),
      caloriegoal: Math.floor(Math.random() * 2000),
      minutegoal: Math.floor(Math.random() * 700),
      steps: Math.floor(Math.random() * 20000),
      activityType: type[Math.floor(Math.random() * 3)],
      createdDate:  new Date(),
      createdBy: this.auth.currentUserValue.username
    });
  }



  //TODO: write a function that will 'delete' a parecord. Hint: the server knows the username of who the requester via the JWT header.
  deletePArecord(date): Observable<PARecord[]> {
    return this.http.delete<PARecord[]>('http://localhost:3030/parecord/' + date) ;
  }


}
