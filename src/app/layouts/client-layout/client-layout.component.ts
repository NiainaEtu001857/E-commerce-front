import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListProductComponent } from "../../page/client/list-product/list-product.component";

@Component({
  selector: 'app-client-layout',
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, ListProductComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
})
export class ClientLayoutComponent {
  cart: any[] = [];
  showCart = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }

  addToCart(service: any, quantity: number = 1) {
    const existing = this.cart.find(item => item.service._id === service._id);
    if (existing) {
      existing.quantity += quantity;
      existing.subtotal = existing.quantity * existing.unit_price;
    } else {
      this.cart.push({
        service,
        quantity,
        unit_price: service.price,
        subtotal: quantity * service.price
      });
    }
  }

  totalPrice() {
    return this.cart.reduce((acc, item) => acc + item.subtotal, 0);
  }
  trackById(index: number, item: any) {
    return item.service._id;
  }

  checkout() {
    console.log('Panier envoyé:', this.cart);
  }
}
