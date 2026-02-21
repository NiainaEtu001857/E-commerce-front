import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private API = `${environment.api}/login`;

  login(data: {email: string; password: string})
  {
    return this.http.post(`${this.API}/login`, data);
  }

  register(data: { name: string; email: string; password: string})
  {
    return this.http.post(`${this.API}/register`, data);
  }
  
}
