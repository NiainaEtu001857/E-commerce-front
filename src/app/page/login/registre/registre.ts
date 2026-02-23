import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth.service';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-registre',
  imports: [CommonModule , FormsModule , RouterLink],
  templateUrl: './registre.html',
  styleUrl: './registre.css',
})
export class Registre {
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

  async submit() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password) {
      alert('Please fill all required fields');
      return;
    }
    const name = `${this.user.firstName} ${this.user.lastName}`;
    await this.authService.registerClient({ name, email: this.user.email, password: this.user.password })
      .then(() => alert('Login successful!'))
      .catch((error: any) => alert(error.message));
    this.user = { firstName: '', lastName: '', email: '', password: '' }; 
  }

  async submitShop() {
    if (!this.shop.name || !this.shop.email || !this.shop.type || !this.shop.description || !this.shop.password) {
      alert('Please fill all required fields');
      return;
    }
    try {
      await this.authService.registerShop(this.shop);
      alert('Login successful!');
    } catch (error: any) {
      alert(error.message);
    }
  }

}
