import { Song } from './Song';
import {User} from './user';

export class Playlist {
  id: string;
  title: string;
  createdDate: Date;
  createdBy: User;
  songs: Array<Song>;
  length: number;
}
