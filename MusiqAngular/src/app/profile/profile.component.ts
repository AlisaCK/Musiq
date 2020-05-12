import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PlaylistService} from '../_services/playlist.service';
import {UserService} from '../_services/user.service';
import {SpotifyService} from '../_services/spotify.service';
import { AuthService } from '../_services/auth.service';
import {User} from '../_models/user';


@Component({ templateUrl: 'profile.component.html' ,

  styleUrls: ['profile.component.css']})
export class ProfileComponent implements OnInit {
  user: User = this.authenticationService.currentUserValue;


  constructor(
    private spotifyservice: SpotifyService,
    private userservice: UserService,
    private authenticationService: AuthService,
    private playlistService: PlaylistService,
    private notifService: NotificationService
  ) {}

  async ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    console.log(this.user);
    //this.loadUser(this.user);
  }

  private authorize() {
    // console.log('fuck');
    // this.spotifyservice.authorize().subscribe(
    //   resp => {
    //     this.notifService.showNotif('Logged in successfully', 'confirmation');
    //   }, error => {
    //     this.notifService.showNotif(error);
    //   });
  }

  private loadUser(user: User) {
    console.log('loadGoals()');
    console.log(user.username);
    this.userservice.getInfo(this.user.username).pipe(first()).subscribe(user => {
      this.user = user;
      // this.authenticationService.updateUser(user);
      console.log(this.user);
      return this.user;
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

  updateUser() {
    console.log('update goals');
    console.log(this.user);
    // this.userservice.updateInfo(this.user).pipe(first()).subscribe(
    //   resp => {
    //     this.notifService.showNotif(' Saved Successfully', 'confirmation');
    //     //this.user = null;
    //     this.loadUser(this.user);
    //   }, error => {
    //     this.notifService.showNotif(error); });
    // this.userservice.
     // this.userservice.setGoals(this.goals).pipe(first()).subscribe(
     //   resp => {
     //     this.notifService.showNotif('Goals Saved Successfully', 'confirmation');
     //     this.goals = null;
     //     this.loadGoals();
     //   }, error => {
     //     this.notifService.showNotif(error); });
  }

  updateCal(value) {
    // console.log("update cal");
    // this.goals.caloriegoal = parseInt(value, 10);
  }

  updateMin(value) {
    // this.goals.minutegoal = parseInt(value, 10);
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

