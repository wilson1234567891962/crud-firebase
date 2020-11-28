
import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { Observable, of } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  API_ENDPOINT = 'https://softwareseguro-bca08.firebaseio.com/';
  routesList: User[];
  dataFireBase: Observable<User[]>;

  constructor(private angularFireDatabase: AngularFireDatabase, private http: HttpClient) {
  }

  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(this.API_ENDPOINT + 'User/.json').pipe(
        tap((data: any) => {
          this.routesList = data.User;
        }),
    );
  }

  saveUser(user: User) {
    return this.angularFireDatabase.database.ref('User/' + user.nick).set(user);
  }

  delete(user: User) {
    return this.angularFireDatabase.database.ref('User/' + user.nick).remove();
  }

  setBackFireBase(dta: User[]) {
    this.dataFireBase = of(dta);
  }

  getBackUpFireBase(): Observable<any> {
    return this.dataFireBase;
  }
}
