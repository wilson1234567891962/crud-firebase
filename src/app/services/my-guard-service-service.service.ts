import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyGuardService {

  loggedIn = false;

  constructor(private router: Router) {}

  canActivate() {
     if (!this.loggedIn) {
      this.router.navigate(['']) 
     } 
    return this.loggedIn;
  }

  setStateLogin(state: boolean) {
    this.loggedIn = state;
  }
}
