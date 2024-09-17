import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroment';
import { User } from '../model/user.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;

  constructor() { }

  getMeProfile() {
    return this.http.get<User[]>(`${this.apiURL}/api/v1/me/profile`, { context: checkToken() });
  }

  getMeBoards() {
    return this.http.get<Board[]>(`${this.apiURL}/api/v1/me/boards`, { context: checkToken() });
  }
}
