import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { Deferred } from '../../vendor/deferred';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  initialAuthCheckDone = false;
  initialAuthCheckDeferred: Deferred;

  currentUser: any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initialAuthCheckDeferred = new Deferred();

    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (!this.initialAuthCheckDone) {
        this.initialAuthCheckDone = true;
        if(this.currentUser){
          this.initialAuthCheckDeferred.resolve(true);
        } else {
          this.initialAuthCheckDeferred.resolve(false);
        }
      } else {
        if (!this.currentUser) {
          this.router.navigate(['/login']);
        }
      }
    })
  }

  isLoggedIn() {
    if (this.initialAuthCheckDone) {
      return this.currentUser ? Promise.resolve(true) : Promise.resolve(false);
    } else {
      return this.initialAuthCheckDeferred.promise;
    }
  }

  async logIn(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (err) {
      return false;
    }
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }
}
