import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroment';
import { Card, UpdateCardDto } from '../model/card.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;

  constructor() { }

  update(id: Card['id'], changes: UpdateCardDto) {
    return this.http.put<Card>(`${this.apiURL}/api/v1/cards/${id}`, changes, { context: checkToken() });
  }
}
