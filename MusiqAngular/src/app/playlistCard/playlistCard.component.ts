import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Playlist} from '../_models/Playlist';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {Goals} from '../_models/user';
import {first} from 'rxjs/operators';

// TODO: Clean Up this component

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'playlist-component',
  templateUrl: './playlistCard.component.html',
  styleUrls: ['./playlistCard.component.css']
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist: Playlist;
  @Output() deleteEvent = new EventEmitter<Date>();

   mode = 'determinate';

   bufferValue = 0;

   activities = ['directions_walk', 'directions_run', 'directions_bike'];


   color = 'primary';

   activity = this.activities[0];
   calprogressvalue = 0;
   minprogressvalue = 0;
   goals: Goals;

  constructor(private notifService: NotificationService, private userService: UserService) { }

  delete(date) {
    // this.deleteEvent.emit(date);
  }

  notImplemented(message) {

    this.notifService.notImplementedWarning(message);
  }
  private loadGoals() {
    // console.log(this.playlist);
    // console.log('loadGoals()');
    // this.userService.getGoals(this.playlist.createdBy).pipe(first()).subscribe(goal => {
    //   console.log(goal);
    //   this.goals = goal;
    //   console.log(this.goals);
    //   this.calprogressvalue = Math.floor(this.playlist.calories / this.goals.caloriegoal * 100);
    //   this.minprogressvalue = Math.floor(this.playlist.minutes / this.goals.minutegoal * 100);
    // });
    // this.userservice.getGoals().subscribe(
    //   (goals: Goals) => {
    //     console.log("FUCK EVERYTING");
    //     console.log(goals);
    //      this.goals = goals;
    //    },
    //    error => {
    //      this.notifService.showNotif(error.toString(), 'warning'); });
  }


  ngOnInit() {
    // this.loadGoals();
    // this.activity = this.activities[this.playlist.activityType];
    //console.log(this.goals);
  //
    //
  }


}
