import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { TokenService } from './token.service';
import { environment } from '@enviroment';
import { User } from '../model/user.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;

  constructor() { }

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiURL}/api/v1/boards/${id}`, { context: checkToken() });
  }
}
