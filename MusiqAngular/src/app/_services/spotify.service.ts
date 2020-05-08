import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Goals} from '../_models/user';


@Injectable({ providedIn: 'root' })

export class SpotifyService {
  constructor(private http: HttpClient) { }

  authorize() {
    return this.http.get('http://localhost:3030/spotify/authorize');
  }
}
