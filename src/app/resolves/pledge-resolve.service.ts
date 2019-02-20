import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class PledgeResolveService implements Resolve<any> {

  constructor(private db: AngularFireDatabase) { }

  async resolve( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Promise<any> {
    if (!route.params.pledgeId) {
      return Promise.resolve(null);
    }

    try {
      const pledgeRef = await this.db.database.ref(`/pledges/${route.params.pledgeId}`);
      if (!pledgeRef) {
        throw new Error('PledgeService - error loading pledge');
      }
  
      const pledgeExists = (await pledgeRef.once('value')).exists();
  
      if (!pledgeExists) {
        throw new Error('PledgeService - pledge not found');
      }
  
      const pledgeData = (await pledgeRef.once('value')).val();
      pledgeData.id = route.params.pledgeId;
      pledgeData.ref = pledgeRef;
      return pledgeData
    } catch (err) {
      console.error('PledgeResolve error', err);
      return Promise.resolve(null);
    }
  }
}
