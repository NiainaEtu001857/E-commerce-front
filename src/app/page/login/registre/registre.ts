import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registre',
  imports: [CommonModule , FormsModule , RouterLink],
  templateUrl: './registre.html',
  styleUrl: './registre.css',
})
export class Registre {
submit() {
throw new Error('Method not implemented.');
}
  constructor(private authService: AuthService) {}
  
  selectedProfile: string = 'client';
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  shop = {
    name: '',
    type: '',
    description: '',
    email: '',
    password: ''
  };

  selectProfile(profile: string) {
    this.selectedProfile = profile;
  }


  async submitShop() {
    if (!this.shop.name || !this.shop.email || !this.shop.type || !this.shop.description || !this.shop.password) {
      
      alert('Please fill all required fields');
      return;
    }
    try {
      const data = await this.authService.registerShop(this.shop);
      Router.navigate(['/product-properties'] , { state: { shop: data.id } });
      alert('Shop registration successful!');
    } catch (error: any) {
      alert(error.message);
    }
  }

}
