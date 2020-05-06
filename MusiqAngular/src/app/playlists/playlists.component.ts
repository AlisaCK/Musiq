import { Component, OnInit } from '@angular/core';
import {Playlist} from '../_models/Playlist';
import {PlaylistService} from '../_services/playlist.service';
import {NotificationService} from '../_services/notification.service';
import {first} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {



  playlists: Playlist[] = [];


  constructor(
    private playlistservice: PlaylistService,
    private authenticationService: AuthService,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
    this.loadAllPlaylists();
  }





  private loadAllPlaylists() {
    console.log('loadAllPlaylists()');
    console.log('loadGoals()');
    const currentUser = this.authenticationService.currentUserValue;

    this.playlistservice.getAll(currentUser).subscribe(
      playlists => {
        this.playlists = playlists;
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

  createPlaylist() {
    // this.playlistservice.add().pipe(first()).subscribe(
    //   resp => {
    //     this.notifService.showNotif(resp, 'response');
    //     this.playlists = null;
    //     this.loadAllPlaylists();
    //   }, error => {
    //     this.notifService.showNotif(error); });
  }

  deletePlaylist(id) {


    //// this.userService.deleteActivity(date);
    // this.playlistservice.delete(id).pipe(first()).subscribe(
    //   resp => {
    //     this.notifService.showNotif(resp, 'response');
    //     this.playlists = null;
    //     this.loadAllPlaylists();
    //   }, error => { this.notifService.showNotif(error); });
  }

}
