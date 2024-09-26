import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../modules/shared/components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [NavbarComponent, ScrollingModule, CurrencyPipe],
  templateUrl: './scroll.component.html'
})
export class ScrollComponent {
  private http: HttpClient = inject(HttpClient);
  products: Product[] = [];

  ngOnInit() {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').subscribe(data => {
      this.products = data;
    });
  }
}
