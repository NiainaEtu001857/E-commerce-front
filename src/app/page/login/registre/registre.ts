import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registre',
  imports: [CommonModule , FormsModule , RouterLink],
  templateUrl: './registre.html',
  styleUrl: './registre.css',
})
export class Registre {
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

  submit() {
    console.log('Client Data:', this.user);
    
  }

  async submitShop() {
    if (!this.shop.name || !this.shop.email || !this.shop.type || !this.shop.description || !this.shop.password) {
      alert('Please fill all required fields');
      return;
    }

    try {
      console.log(`${environment.api}/shop/create`);
      
      const response = await axios.post(`${environment.api}/shop/create`, this.shop, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        console.log(response);
      if (response.data.token) {
        
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    } catch (error: any) {
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code erreur
        console.error('Erreur backend:', error.response.data);
        alert(error.response.data.message);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse
        console.error('Aucune réponse du serveur', error.request);
        alert('Erreur réseau : impossible de joindre le serveur');
      } else {
        console.error('Erreur Axios', error.message);
        alert('Erreur : ' + error.message);
      }
    }
  }

}
