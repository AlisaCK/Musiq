
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Playlist} from '../_models/Playlist';
import {User} from '../_models/user';
import {first} from 'rxjs/operators';
import {Goals} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class PlaylistService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll(user) {
    let getpath = `http://localhost:3030/playlist/getplaylists/`;
    getpath = getpath.concat(user.username);
    return this.http.get<Playlist[]>(getpath);
  }





  add(playlist: Playlist) {
    return this.http.post(`http://localhost:3030/playlist/addplaylist`, playlist);
    // const randparecord = {
    //   calories: Math.floor(Math.random() * 2500),
    //   minutes: Math.floor(Math.random() * 180),
    //   steps:  Math.floor(Math.random() * 25000),
    //   activityType: Math.floor(Math.random() * 3)
    // };
    //
    //
    // return this.http.post(`http://localhost:3030/parecord/addparecord`, randparecord);

  }


  delete(date: string) {
    return this.http.delete(`http://localhost:3030/parecord/${date}`);

  }



}
