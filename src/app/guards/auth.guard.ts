import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          return true
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn()
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(() => {
        this.router.navigate(['/login']);
        return Promise.resolve(false);
      });
  }
}
