import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
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

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadShops();
  }

  async loadShops(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${environment.api}/shop`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: this.page, limit: this.limit }
      });

      this.shops = [...response.data.shops];  
      this.totalPages = response.data.totalPages;

      this.cdr.markForCheck();

      console.log('Shops chargés :', response.data);
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