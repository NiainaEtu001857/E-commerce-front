import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../page/login/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-client-layout',
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
})
export class ClientLayoutComponent {

  constructor(private authService: AuthService, private http: HttpClient , private router: Router) {}

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
  
  async onLogout() {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (err) {
      console.error(err);
    }
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Fermer le dropdown si clic à l’extérieur
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropup')) {
      this.isDropdownOpen = false;
    }
  }
}
