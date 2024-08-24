import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../../../model/user.model";

export class DataSourceUser extends DataSource<User> {
  data = new BehaviorSubject<User[]>([]);
  originalData: User[] = [];

  connect(): Observable<User[]> {
    return this.data;
  }

  init(users: User[]) {
    this.originalData = users;
    this.data.next(users);
  }

  disconnect() {}
}
