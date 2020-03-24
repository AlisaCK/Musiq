import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {Role} from '../_models/role';


// @ts-ignore
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

    // this is used by app.component.ts
    // currentUser is turned into an Observable that will allow other parts of the app to subscribe and get notified when currentUserSubject changes.
    this.currentUser = this.currentUserSubject.asObservable();

  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // In the future we will do server authentication here. For now we will simulate it.
  return new Observable(subscriber => {

  if (username === 'admin' && password === '123') {
     const user: User = {username: username, role: Role.admin, token: 'some_random_token'};

     localStorage.setItem('currentUser', JSON.stringify(user));
    //  notify all subscribers that user has logged in.


     setTimeout(() => {
      subscriber.next('Logged in!');
      this.currentUserSubject.next(user);
      }, 1000);
  }
    else if (username === 'user' && password === '123') {
      const user: User = {username: username, role: Role.user, token: 'some_random_token'};

      localStorage.setItem('currentUser', JSON.stringify(user));
      //  notify all subscribers that user has logged in.


      setTimeout(() => {
        subscriber.next('Logged in!');
        this.currentUserSubject.next(user);
      }, 1000);
    }
  else{
    //reject
    setTimeout(() => {
      subscriber.error('Wrong username or password');
    }, 1000);
  }

});

  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify all subscribers that user has logged out.
    this.currentUserSubject.next(null);
  }


}
