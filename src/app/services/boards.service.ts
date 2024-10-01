import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { TokenService } from './token.service';
import { environment } from '@enviroment';
import { User } from '../model/user.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../model/board.model';
import { Card } from '../model/card.model';
import { Colors } from '../model/colors.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;
  bufferSpace = 65535;

  constructor() { }

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiURL}/api/v1/boards/${id}`, { context: checkToken() });
  }

  createBoard(title: string, backgroundColor: Colors) {
    return this.http.post<Board>(`${this.apiURL}/api/v1/boards`, { title, backgroundColor }, { context: checkToken() });
  }

  getPosition(cards: Card[], currentIndex: number) {
    console.log(cards);
    if (cards.length === 1) {
      return this.bufferSpace;
    }

    if (currentIndex === 0 && cards.length > 1) {
      const onTopPosition = cards[1].position;
      return onTopPosition / 2;
    }

    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }

    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }

    return 0;
  }

  getPostionNewCard(cards: Card[]) {
    if (cards.length === 0) {
      return this.bufferSpace;
    }

    const lastIndex = cards.length - 1;
    const lastPosition = cards[lastIndex].position;
    return lastPosition + this.bufferSpace;
  }
}
