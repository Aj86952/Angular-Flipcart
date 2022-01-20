import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartserviceService } from 'src/app/service/cartservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  searchKey: string = '';
  public filterCategory: any;

  constructor(
    private service: ApiService,
    private cartService: CartserviceService
  ) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe((res: any) => {
      this.productList = res;
      this.filterCategory = res;
      console.log(this.productList);

      this.productList.forEach((a: any) => {
        if (
          a.category === "men's clothing" ||
          a.category === "women's clothing"
        ) {
          a.category = 'fashion';
        }

        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    console.log(this.productList);

    this.cartService.search.subscribe((res: any) => {
      this.searchKey = res;
    });
  }

  addtoCart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: any) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
