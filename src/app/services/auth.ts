import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private API = 'http://localhost:3000/auth';

  login(data: {email: string; password: string})
  {
    return this.http.post(`${this.API}/login`, data);
  }

  register(data: { name: string; email: string; password: string})
  {
    return this.http.post(`${this.API}/register`, data);
  }
  
}
