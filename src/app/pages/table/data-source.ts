import { DataSource } from "@angular/cdk/collections";
import { Product } from "../../model/product.model";
import { BehaviorSubject, Observable } from "rxjs";

export class DataSourceProduct extends DataSource<Product> {
  data = new BehaviorSubject<Product[]>([]);
  originalData: Product[] = [];

  connect(): Observable<Product[]> {
    return this.data;
  }

  init(products: Product[]) {
    this.originalData = products;
    this.data.next(products); // asigna el valor de products al BehaviorSubject
  }

  getTotal() {
    const products = this.data.getValue(); // obtiene el valor del BehaviorSubject
    return products.reduce((acc, product) => acc + product.price, 0);
  }

  update(id: Product['id'], changes: Partial<Product>) {
    const products = this.data.getValue();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...changes };
      this.data.next(products);
    }
  }

  find(query: string) {
    const newProducts = this.originalData.filter(
      // (product) =>
      //   product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      //   product.id == query ||
      //   product.price === Number(query)

      // solucion 2 a la busqueda en multiples columnas
      (product) => {
        const work = `${product.id} ${product.title} ${product.price}`;
        return work.toLocaleLowerCase().includes(query.toLocaleLowerCase());
      }
    );
    this.data.next(newProducts);
  }

  disconnect() {}
}
