import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PARecord} from '../_models/PARecord';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {Goals} from '../_models/user';
import {first} from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'parecord-component',
  templateUrl: './playlistCard.component.html',
  styleUrls: ['./playlistCard.component.css']
})
export class PlaylistCardComponent implements OnInit {
  @Input() parecord: PARecord;
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
    this.deleteEvent.emit(date);
  }

  notImplemented(message) {

    this.notifService.notImplementedWarning(message);
  }
  private loadGoals() {
    console.log(this.parecord);
    console.log('loadGoals()');
    this.userService.getGoals(this.parecord.createdBy).pipe(first()).subscribe(goal => {
      console.log(goal);
      this.goals = goal;
      console.log(this.goals);
      this.calprogressvalue = Math.floor(this.parecord.calories / this.goals.caloriegoal * 100);
      this.minprogressvalue = Math.floor(this.parecord.minutes / this.goals.minutegoal * 100);
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


  ngOnInit() {
    this.loadGoals();
    this.activity = this.activities[this.parecord.activityType];
    console.log(this.goals);
    // TODO:  use userService to get the goal values corresponding the username that created the playlistCard and then use the obtained values to properly visualize the progress towards the goal.



  //
    //
  }


}
