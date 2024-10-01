import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroment';
import { checkToken } from '../interceptors/token.interceptor';
import { CreateListDto, List } from '../model/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;

  constructor() { }

  create(list: CreateListDto) {
    return this.http.post<List>(`${this.apiURL}/api/v1/lists`, list, { context: checkToken() });
  }
}
