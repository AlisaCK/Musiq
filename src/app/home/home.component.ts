import {Component, OnDestroy, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import {UserService} from '../_services/user.service';
import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
  export class HomeComponent implements OnInit {



  //playlists: Pl[] = [];


  constructor(
    private userService: UserService,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
    this.loadAllActivities();
      }





  private loadAllActivities() {
    // this.userService.getActivities().subscribe(
    //   parecords => {
    //     this.parecords = parecords;
    //
    //   },
    //   error => {
    //     this.notifService.showNotif(error, 'error');
    //   });
  }

  addRecords() {
    // this.userService.generateRandomActivity();
  }

  deleteRecords(Id: number) {
    // this.userService.deletePlaylist(Id);
    // this.loadAllActivities();
  }

}

