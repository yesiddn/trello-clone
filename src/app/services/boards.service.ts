import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
// import { TokenService } from './token.service';
import { environment } from '@enviroment';
import { User } from '../model/user.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Board } from '../model/board.model';
import { Card } from '../model/card.model';
import { Colors } from '../model/colors.model';
import { List } from '../model/list.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;
  bufferSpace = 65535;
  backgroundColor = signal<Colors>('violet');

  constructor() { }

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiURL}/api/v1/boards/${id}`, { context: checkToken() })
      // .pipe(
      //   tap((board) => this.setBackgroudColor(board.backgroundColor))
      // ); // se puede setear aqui, pero es mejor desacoplar la logica ya que en caso de usar este metodo en otro lugar se estaria seteando innecesariamente
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

  getPostionNewItem(items: Card[] | List[]) {
    if (items.length === 0) {
      return this.bufferSpace;
    }

    const lastIndex = items.length - 1;
    const lastPosition = items[lastIndex].position;
    return lastPosition + this.bufferSpace;
  }

  setBackgroudColor(color: Colors) {
    this.backgroundColor.set(color);
  }
}
