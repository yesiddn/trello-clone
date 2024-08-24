import { Component } from '@angular/core';
import { DataSourceUser } from './data-source';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CdkTableModule, NgClass],
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  ngOnInit() {
    this.dataSource.init([
      {
        id: '1',
        name: 'User 1',
        email: 'mail@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      },
      {
        id: '2',
        name: 'User 2',
        email: 'mail2@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      },
      {
        id: '3',
        name: 'User 3',
        email: 'mail3@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      }
    ]);
  }
}
