import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  dataUser: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) { }

  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  setDataUser(dta: any) {
    this.dataUser = of(dta);
  }

  getDataUser(): Observable<any> {
    return this.dataUser;
  }

  public logOut() {
    return this.angularFireAuth.auth.signOut();
  }
}
