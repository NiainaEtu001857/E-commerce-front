import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API = `${environment.api}`;

  constructor(private http: HttpClient) {}

  createOrder(order: any, shopId: string): Observable<any> {
    return this.http.post(`${this.API}/orders`, { ...order, shopId });
  }

  getClients(): Observable<any> {
    return this.http.get(`${this.API}/client/clients`);
  }

  getServicesByShop(shopId: string): Observable<any> {
    return this.http.get(`${this.API}/shop/service/services/${shopId}`);
  }

  getShopOrders(shopId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/orders/shop/${shopId}`);
  }
}
