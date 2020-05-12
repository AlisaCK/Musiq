import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PlaylistService} from '../_services/playlist.service';
import {UserService} from '../_services/user.service';
import {SpotifyService} from '../_services/spotify.service';
import {Song} from '../_models/Song';
import {Playlist} from '../_models/Playlist';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {error} from '@angular/compiler/src/util';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {



  text = 'bob';
  submitted = false;
  private parser = new DOMParser();

  constructor(
    private playlistService: PlaylistService,
    private authenticationService: AuthService,
    private router: Router,
    private notifService: NotificationService,
    private spotifyService: SpotifyService,

  ) {}

  ngOnInit() {


  // TODO: Load all playlists
      }





  private loadAllPArecords() {
    // console.log('loadAllParecords()');
    // this.parecordservice.getAll().subscribe(
    //      parecords => {
    //        this.parecords = parecords;
    //      },
    //     error => {
    //         this.notifService.showNotif(error.toString(), 'warning'); });
  }

  async createPlaylist() {
    let user = this.authenticationService.currentUserValue;
    this.submitted = true;
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    console.log(this.text);
    this.text = this.text.toString().replace(/\t/g, '').replace(/\n/g, '');
    //this.text = this.text.toString().replace(/\t/g, '').replace(/\n/g, '');
    console.log(this.text);
    //this.text = document.getElementById('xmlDocs').nodeValue;

    // this.text = '<playlist>' +
    //   '<playlistTitle>I Am Very Stupid</playlistTitle>' +
    //   '<song>' +
    //   '<songTitle>deathbed</songTitle>' +
    //   '<artist>powfu</artist>' +
    //   '<album>deathbed (single)</album>' +
    //   '</song>' +
    //   '<song>' +
    //   '<songTitle>brightside</songTitle>' +
    //   '<artist>Arrested Youth</artist>' +
    //   '<album>brightside (single)</album>' +
    //   '</song>' +
    //   '<song>' +
    //   '<songTitle>my baby</songTitle>' +
    //   '<artist>arman parastaran</artist>' +
    //   '<album>cutest person ever</album>' +
    //   '</song>' +
    //   '' +
    //   '</playlist>';
    //console.log(this.text);
    // this.text = this.text.toString().replace('\t', '').replace('\n', '');
    // console.log(this.text);
    const xmlDoc = this.parser.parseFromString(this.text, 'text/xml');
    console.log(xmlDoc != null);
    console.log(xmlDoc.getElementsByTagName('song'));
    const playlist = new Playlist();
    // console.log(xmlDoc.getElementById('playlistTitle')[0].childNodes[0].nodeValue);
    playlist.title = xmlDoc.getElementsByTagName('playlistTitle')[0].innerHTML;
    playlist.length = xmlDoc.getElementsByTagName('song').length;
    const songs = xmlDoc.getElementsByTagName('song');
    console.log(playlist);
    const songArray: Array<Song> = [];
    for (let i = 0; i < playlist.length; i++) {
      const song = new Song();
      song.title = songs[i].children[0].innerHTML;
      song.artist = songs[i].children[1].innerHTML;
      song.album = songs[i].children[2].innerHTML;
      console.log(song);
      const temp = await (await this.spotifyService.getSongID(song.title, song.artist)).toPromise();
      song.spotifyId = temp.uri;
      //   .subscribe(
      //   obj => {
      //     song.spotifyId = obj.uri;
      //   },
      //   error => {
      //     this.notifService.showNotif(error.toString(), 'warning');
      //   }
      // )
      console.log(song.spotifyId);
      songArray.push(song);
    }
    playlist.songs = songArray;
    playlist.createdDate = new Date();
    playlist.createdBy = this.authenticationService.currentUserValue;
    console.log(playlist);
    await this.createSpotPlaylist(user.spotifyID, playlist);
    this.playlistService.add(playlist).subscribe(
      () => {
        this.router.navigate(['/playlists']);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
    // this.parecordservice.getAll().subscribe(
    //     //      parecords => {
    //     //        this.parecords = parecords;
    //     //      },
    //     //     error => {
    //     //         this.notifService.showNotif(error.toString(), 'warning'); });

    // this.parecordservice.add().pipe(first()).subscribe(
    //   resp => {
    //     this.notifService.showNotif(resp, 'response');
    //     this.parecords = null;
    //     this.loadAllPArecords();
    //     }, error => {
    //     this.notifService.showNotif(error); });
  }

  async createSpotPlaylist(userID, playlist){
    const promise = await (await this.spotifyService.createSpotifyPlaylist(userID, playlist.title)).toPromise();
    console.log('boppp');
    console.log(promise);
    let spotid = promise.uri;
    console.log(spotid);
    spotid = spotid.replace('spotify:playlist:', '');
    console.log(spotid);
    for (let i = 0; i < playlist.length; i++) {
      let bop = await (await this.spotifyService.addToPlaylist(spotid, playlist.songs[i].spotifyId)).toPromise()
      console.log(bop.message);
    }
  }

  deletePARecord(date) {


    // this.userService.deleteActivity(date);
    // this.parecordservice.delete(date).pipe(first()).subscribe(
    //   resp => {
    //     this.notifService.showNotif(resp, 'response');
    //   this.parecords = null;
    //   this.loadAllPArecords();
    // }, error => { this.notifService.showNotif(error); });
  }


}
