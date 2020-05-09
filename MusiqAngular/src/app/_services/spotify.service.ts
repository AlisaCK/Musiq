import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Playlist} from '../_models/Playlist';
import {Song} from '../_models/Song';
import {User} from '../_models/user';


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
    return this.http.get<object>(path);
  }

  async createSpotifyPlaylist(name: string){

  }

  authorize() {
    return this.http.get('http://localhost:3030/spotify/authorize');
  }
}
