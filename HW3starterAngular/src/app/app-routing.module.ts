import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {PlaylistComponent} from './playlist/playlist.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';


const routes: Routes = [{path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},{ path: 'register', component: RegisterComponent },
  {path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
