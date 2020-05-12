import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Playlist} from '../_models/Playlist';
import {Song} from '../_models/Song';
import {User} from '../_models/user';
import {SpotReturn} from '../_models/SpotReturn';


@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  constructor(private http: HttpClient) { }

  async getSongID(songName: string, songArtist: string) {
    let path = `http://localhost:3030/spotify/search/`;
    path = path.concat(songName);
    path = path.concat('/');
    path = path.concat(songArtist);
    return this.http.get<SpotReturn>(path);
  }

  async createSpotifyPlaylist(userID: string, name: string) {
    console.log(userID);
    let path = `http://localhost:3030/spotify/createplaylist/`;
    path = path.concat(userID);
    path = path.concat('/');
    console.log(path);
    path = path.concat(name);
    console.log(path);
    return this.http.post<SpotReturn>(path, name);
  }

  async addToPlaylist(playID: string, trackID: string ) {
    let path = `http://localhost:3030/spotify/addtoplaylist/`;
    path = path.concat(playID);
    path = path.concat('/');
    path = path.concat(trackID);
    return this.http.post<SpotReturn>(path, playID);
  }

  authorize() {
    return this.http.get('http://localhost:3030/spotify/authorize');
  }
}
