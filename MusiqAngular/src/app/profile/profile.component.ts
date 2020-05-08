import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {Goals} from '../_models/user';
import {PlaylistService} from '../_services/playlist.service';
import {UserService} from '../_services/user.service';
import {SpotifyService} from '../_services/spotify.service';
import { AuthService } from '../_services/auth.service';


@Component({ templateUrl: 'profile.component.html' ,

  styleUrls: ['profile.component.css']})
export class ProfileComponent implements OnInit {

  goals: Goals;


  constructor(
    private spotifyservice: SpotifyService,
    private userservice: UserService,
    private authenticationService: AuthService,
    private playlistService: PlaylistService,
    private notifService: NotificationService
  ) {}

  ngOnInit() {

  }

  private authorize() {
    console.log('fuck');
    this.spotifyservice.authorize().subscribe(
      resp => {
        this.notifService.showNotif('Logged in successfully', 'confirmation');
      }, error => {
        this.notifService.showNotif(error);
      });
  }

  private loadGoals() {
    console.log('loadGoals()');
    const currentUser = this.authenticationService.currentUserValue;
    this.userservice.getGoals(currentUser).pipe(first()).subscribe(goal => {
      this.goals = goal;
    });
    // this.userservice.getGoals().subscribe(
    //   (goals: Goals) => {
    //     console.log("FUCK EVERYTING");
    //     console.log(goals);
    //      this.goals = goals;
    //    },
    //    error => {
    //      this.notifService.showNotif(error.toString(), 'warning'); });
  }

  updateGoals() {
    console.log('update goals');
     this.userservice.setGoals(this.goals).pipe(first()).subscribe(
       resp => {
         this.notifService.showNotif('Goals Saved Successfully', 'confirmation');
         this.goals = null;
         this.loadGoals();
       }, error => {
         this.notifService.showNotif(error); });
  }

  updateCal(value) {
    console.log("update cal");
    this.goals.caloriegoal = parseInt(value, 10);
  }

  updateMin(value) {
    this.goals.minutegoal = parseInt(value, 10);
  }

  deletePARecord(date) {


    // this.userService.deleteActivity(date);
    // this.parecordservice.delete(date).pipe(first()).subscribe(
    //   resp => {
    //     this.notifService.showNotif(resp, 'response');
    //     this.parecords = null;
    //     this.loadAllPArecords();
    //   }, error => { this.notifService.showNotif(error); });
  }

}

