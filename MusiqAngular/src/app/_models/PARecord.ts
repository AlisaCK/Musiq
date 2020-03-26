
import {PAType} from './PAType';

//TODO: notice the added property (createdBy). This will come handy when start implementing 'delete'.
export class PARecord {

  calories: number;
  minutes: number;
  caloriegoal: number;
  minutegoal: number;
  steps: number;
  activityType: PAType;
  createdDate: Date;
  createdBy: string;
  }

