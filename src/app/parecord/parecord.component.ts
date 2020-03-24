import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {PARecord} from '../_models/PARecord';
import {NotificationService} from '../_services/notification.service';
import {PAType} from '../_models/PAType';
import {UserService} from '../_services/user.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'parecord-component',
  templateUrl: './parecord.component.html',
  styleUrls: ['./parecord.component.css']
})
export class ParecordComponent implements OnInit {
  private notif: NotificationService;
  types: string[] = ['run', 'walk', 'bike'];

  @Input() record: PARecord;

  @Output()  messageToEmit = new EventEmitter<Date>();


  constructor(
    private notifService: NotificationService
  ) {}
  edit() {
    this.notifService.notImplementedWarning('Edit');
  }


  delete() {
    this.messageToEmit.emit(this.record.createdDate);
  }

  ngOnInit() {
  // I legitimately don't know what's supposed to go here.
  }


}

