import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7181/api/';
  private curretntUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.curretntUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.curretntUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.curretntUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.curretntUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.curretntUserSource.next(null);
  }
}
