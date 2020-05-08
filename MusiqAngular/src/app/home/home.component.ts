import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PlaylistService} from '../_services/playlist.service';
import {UserService} from '../_services/user.service';
import {Playlist} from '../_models/Playlist';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {



  playlists: Playlist[] = [];


  constructor(
    private playlistService: PlaylistService,
    private notifService: NotificationService,

  ) {}

  ngOnInit() {
  // TODO: Load all playlists

      }




/**
  private loadAllPArecords() {
    console.log('loadAllParecords()');
    this.parecordservice.getAll().subscribe(
         parecords => {
           this.parecords = parecords;
         },
        error => {
            this.notifService.showNotif(error.toString(), 'warning'); });
  }

  createPARecord() {
    this.parecordservice.add().pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
        this.parecords = null;
        this.loadAllPArecords();
        }, error => {
        this.notifService.showNotif(error); });
  }

  deletePARecord(date) {


    // this.userService.deleteActivity(date);
    this.parecordservice.delete(date).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
      this.parecords = null;
      this.loadAllPArecords();
    }, error => { this.notifService.showNotif(error); });
  }
**/


}
