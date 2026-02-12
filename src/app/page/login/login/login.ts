import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth.servcie';

@Component({
  selector: 'app-login',
  imports: [RouterLink , CommonModule , FormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  userType: 'shop' | 'client' | 'admin' = 'admin';
  email = 'admin@gmail.com';
  password = 'adimin';
  constructor(private authService: AuthService) {}


  setUserType(type: 'shop' | 'client' | 'admin') {
    this.userType = type;

    switch (type) {
      case 'shop':
        this.email = 'shop@gmain.com';
        this.password = 'shop'
        break;
      case 'client':
        this.email = 'client@gmain.com';
        this.password = 'client'
        break
      default:
        this.email = 'admin@gmail.com';
        this.password = 'adimin';
        break;
    }
  }
  async login() {
    if (!this.email || !this.password) {
      alert('Please fill all required fields');
      return;
    }
    try {
      await this.authService.login(this.email, this.password);
      alert('Login successful!');
    } catch (error: any) {
      alert(error.message);
    }
  }


}
