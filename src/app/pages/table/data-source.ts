import { DataSource } from "@angular/cdk/collections";
import { Product } from "../../model/product.model";
import { BehaviorSubject, Observable } from "rxjs";

export class DataSourceProduct extends DataSource<Product> {
  data = new BehaviorSubject<Product[]>([]);

  connect(): Observable<Product[]> {
    return this.data;
  }

  init(products: Product[]) {
    this.data.next(products); // asigna el valor de products al BehaviorSubject
  }

  getTotal() {
    const products = this.data.getValue(); // obtiene el valor del BehaviorSubject
    return products.reduce((acc, product) => acc + product.price, 0)
  }

  update(id: Product['id'], changes: Partial<Product>) {
    const products = this.data.getValue();
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...changes };
      this.data.next(products);
    }
  }

  disconnect() {}
}
