import {Component, OnDestroy, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {



  public parecords: PARecord[] = [];


  constructor(
    private parecordservice: PArecordService,
    private notifService: NotificationService,
  ) {}

  ngOnInit() {
    //this.loadAllPArecords();
  }





  private loadAllPArecords() {
    // this.parecordservice.fetchPArecords().subscribe( record => {
    //   this.parecords = record as PARecord[];
    //   }, error => {this.notifService.showNotif(error, 'error'); });
  }

  createPARecord() {
    // if (this.parecords.length < 10) {
    //   this.parecordservice.createPArecord().subscribe(() => {
    //     this.loadAllPArecords();
    //   });
    //   this.notifService.showNotif('PA record added. Remaining capacity: ' + (10 - this.parecords.length), 'success');
    // }
    // else {
    //   this.notifService.showNotif('maximum capacity for  parecords reached cannot add');
    // }
    //
    // // TODO: send PArecord to server and display notification to inform the user about what happened.

  }

  deletePARecord(date) {
    // // TODO: this function should delete a given parecord from the server.
    // //  User must see the deletion immediately (the record should dissapear from the UI)
    // this.parecordservice.deletePArecord(date).subscribe(() => {
    //   this.loadAllPArecords();
    // });
  }

}

