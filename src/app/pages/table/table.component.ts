import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product.model';
import {CdkTableModule} from '@angular/cdk/table';
import { CurrencyPipe, NgClass } from '@angular/common';
import { DataSourceProduct } from './data-source';
import { BtnComponent } from '../../components/btn/btn.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NavbarComponent, BtnComponent, CdkTableModule, NgClass, CurrencyPipe],
  templateUrl: './table.component.html'
})
export class TableComponent {
  private http: HttpClient = inject(HttpClient);
  dataSourse = new DataSourceProduct();
  columns: string[] = ['#No', 'Title', 'Price',  'Image', 'Actions']; // se tienen que guardar las columnas de la tabla en un array -> el nombre de las columnas no necesariamente tiene que ser el mismo que el de las propiedades del objeto
  total = 0;

  ngOnInit() {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').subscribe(data => {
      this.dataSourse.init(data);

      this.total = this.dataSourse.getTotal();
    });
  }

  update(product: Product) {
    this.dataSourse.update(product.id, {
      title: 'Producto actualizado',
      price: 10
    });
  }
}
