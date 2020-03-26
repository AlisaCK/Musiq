import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {Playlist} from '../_models/Playlist';
import {Observable} from 'rxjs';

@Component({ templateUrl: 'playlist.component.html' })
export class PlaylistComponent implements OnInit {

  //TODO: this component must show a list of registered users.

  public playlist: Observable<Playlist[]>;

  constructor(
    private userServe: UserService
  ) {}

  ngOnInit() {
    // this.playlist = this.userServe.getAll();
   }

  // var userService: UserService;

}
