import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-choose-shop',
  standalone: true,                      
  imports: [FormsModule, CommonModule],
  templateUrl: './choose-shop.component.html',
  styleUrls: ['./choose-shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

@Injectable({ providedIn: 'root' })
export class ChooseShopComponent implements OnInit {

  shops: any[] = [];
  page: number = 1;
  limit: number = 12;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadShops();
  }

  async loadShops(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token || ''}`,
      });
      const response: any = await this.http
        .get(`${environment.api}/shop`, {
          headers,
          params: { page: this.page, limit: this.limit },
        })
        .toPromise();

      this.shops = [...response.shops];
      this.totalPages = response.totalPages;

      this.cdr.markForCheck();

      console.log('Shops chargés :', response);
    } catch (error) {
      console.error('Erreur lors du chargement des shops', error);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadShops();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadShops();
    }
  }

  viewShop(shopId: any): void {
    this.router.navigate(['/client/shop', shopId]);
  }
}
