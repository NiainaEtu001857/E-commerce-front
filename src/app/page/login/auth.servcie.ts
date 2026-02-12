import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Si tu stockes le user dans localStorage, on peut initialiser ici
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Login professionnel
  async login(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(
        `${environment.api}/shop/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response);
      

      // Stocker le token si renvoyé
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Stocker les infos user (non sensibles)
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.currentUserSubject.next(response.data.user);
      }

    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur serveur');
      } else if (error.request) {
        throw new Error('Erreur réseau : impossible de joindre le serveur');
      } else {
        throw new Error(error.message);
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
