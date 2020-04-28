import { Song } from './song';
import {User} from './user';

export class Playlist {
  id: string;
  Title: string;
  createDate: Date;
  createdBy: User;
  Songs: Song[];
}
