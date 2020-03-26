import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import {Role} from '../_models/role';

@Component({templateUrl: 'register.component.html',

  styleUrls: ['register.component.css']

})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  private roles =  [{name: Role.user},
    {name: Role.admin}];



  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      role: [''],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.notification.showNotif('Registration successful', 'confirmation', 4000);
          console.log('Received:' + data);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Error:', error);
          this.notification.showNotif(error);
          this.loading = false;
        });
  }
}
