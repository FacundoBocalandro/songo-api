import { RouteInterface } from '../';
import { TrackController } from '../../controller/TrackController';

interface PigRoutesInterface extends RouteInterface {
  controller: typeof TrackController;
}

export const TrackRoutes: PigRoutesInterface[] = [
  {
    method: 'put',
    route: '/tracks/match',
    controller: TrackController,
    action: 'match',
    auth: true
  },
  {
    method: 'post',
    route: '/tracks',
    controller: TrackController,
    action: 'save',
  }
];
