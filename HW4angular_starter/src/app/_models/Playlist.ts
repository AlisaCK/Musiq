import { Song } from './song';
import {User} from './user';

export class Playlist {
  id: string;
  title: string;
  createDate: Date;
  createdBy: User;
  songs: Song[];
  length: number;
}
