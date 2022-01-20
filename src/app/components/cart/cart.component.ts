import { Component, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/service/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public product: any = [];
  public grandToatal: any = 0;
  // public grandToatal!: number;

  constructor(private cartService: CartserviceService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.product = res;
      this.grandToatal = this.cartService.grandTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}
