import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {PAType} from '../_models/PAType';
import {PARecord} from '../_models/PARecord';
import {Playlist} from '../_models/Playlist';


@Injectable({ providedIn: 'root' })
export class UserService {


  playlists: Playlist[];

  constructor(private notif: NotificationService) {
    this.playlists = [];

    // this.playlists = [{calories: 2345,
    // minutes: 123,
    // caloriegoal: 2000,
    // minutegoal: 180,
    // steps: 12000,
    // activityType: PAType.walk,
    // createdDate:  new Date('2020-12-15T09:30:00')
    // },
    //   {
    //       calories: 1345,
    //       minutes: 63,
    //       caloriegoal: 2000,
    //       minutegoal: 180,
    //       steps: 15000,
    //       activityType: PAType.bike,
    //       createdDate:  new Date('2020-11-13T09:30:00')
    //   },
    //   {
    //     calories: 1945,
    //     minutes: 83,
    //     caloriegoal: 2000,
    //     minutegoal: 180,
    //     steps: 13000,
    //     activityType: PAType.run,
    //     createdDate:  new Date('2020-11-19T06:30:00')
    //   },
    //   {
    //     calories: 1745,
    //     minutes: 639,
    //     caloriegoal: 2400,
    //     minutegoal: 190,
    //     steps: 19000,
    //     activityType: PAType.run,
    //     createdDate:  new Date('2020-08-13T03:55:00')
    //   }
    //
    // ];

  }




  getPlaylists() {
    // const param = 'getCourse';
    console.log('getPlaylist()');

    return new Observable<Playlist[]>(subscriber => {
      if (this.playlists.length > 0) {
        setTimeout(() => {subscriber.next(this.playlists); }, 1000);
      } else {
        setTimeout(() => {subscriber.error('No courses in the DB. Create a new course.'); }, 1000);
      }

    });

  }


  deletePlaylist(Id: number) {
    //this.parecords = this.parecords.filter(card => card.createdDate !== createdDate);
  }

   generateRandomActivity() {
  //   const type: PAType[] = [PAType.bike, PAType.run, PAType.walk];
  //
  //   setTimeout(() => {
  //     if (this.parecords.length < 10) {
  //       this.parecords.push({
  //         calories: Math.floor(Math.random() * 2000),
  //         minutes: Math.floor(Math.random() * 700),
  //         caloriegoal: Math.floor(Math.random() * 2000),
  //         minutegoal: Math.floor(Math.random() * 700),
  //         steps: Math.floor(Math.random() * 20000),
  //         activityType: type[Math.floor(Math.random() * 3)],
  //         createdDate:  new Date()
  //       });
  //     }
  //     else {
  //       this.notif.showNotif('you can only have 10 activities at a time');
  //     }
  //   }, 700);

  }


}
