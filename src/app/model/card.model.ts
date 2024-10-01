import { Board } from "./board.model";
import { List } from "./list.model";

export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  list: List;
}

// export interface UpdateCardDto {
//   title?: string;
//   description?: string;
//   position?: number;
//   listId?: List['id'];
//   boardid?: Board['id'];
// }

export interface UpdateCardDto extends Partial<Omit<Card, 'id' | 'list'>> {
  listId?: number | string;
  boardId?: string;
}

// export interface CreateCardDto {
//   title: string;
//   description?: string;
//   position: number;
//   listId: List['id'];
//   boardId: Board['id'];
// }

export interface CreateCardDto extends Omit<Card, 'id' | 'list'> {
  listId: List['id'];
  boardId: Board['id'];
}
