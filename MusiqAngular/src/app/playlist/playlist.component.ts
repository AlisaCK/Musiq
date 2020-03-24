import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {NotificationService} from '../_services/notification.service';
import {Playlist} from '../_models/Playlist';

@Component({
  selector: 'app-admin',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(
    private userService: UserService,
    private notifService: NotificationService
  ) { }

  ngOnInit() {
    this.loadAllPlaylists();
  }


  private loadAllPlaylists() {
    this.userService.getPlaylists().subscribe(
      playlists => {
        this.playlists = playlists;

      },
      error => {
        this.notifService.showNotif(error, 'error');
      });
  }

  addPlaylist() {
    this.userService.generateRandomActivity();
  }

  deletePlaylist(Id: number) {
    this.userService.deletePlaylist(Id);
    this.loadAllPlaylists();
  }
}





