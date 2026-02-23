import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-product',
  standalone: true,                 // si Angular v14+ pour imports dans le component
  imports: [FormsModule, CommonModule],
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'], // attention : "styleUrls" et pas "styleUrl"
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductComponent implements OnInit {

  @Output() addToCartEvent = new EventEmitter<any>();

  shop: any = null;
  currentShopId: string | null = null;
  services: any[] = [];
  page: number = 1;
  limit: number = 5;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    const shopId = this.route.snapshot.paramMap.get('id');
    this.currentShopId = shopId;
    await this.loadServices(shopId);
  }

  async loadServices(id?: any) {
    if (!id) {
      this.services = [];
      this.shop = null;
      this.totalPages = 0;
      this.cdr.markForCheck();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token || ''}`,
      });
      const response: any = await firstValueFrom(
        this.http.get(`${environment.api}/shop/service/services/${id}`, {
          headers,
          params: { page: this.page, limit: this.limit, shopId: id },
        })
      );

      this.services = this.extractServices(response);
      this.shop = response?.shop ? { ...response.shop } : null;
      this.totalPages = Number(response?.totalPages) || 1;

      this.cdr.markForCheck();

      console.log('Services chargés:', response);
    } catch (error) {
      this.services = [];
      this.shop = null;
      this.totalPages = 0;
      this.cdr.markForCheck();
      console.error('Erreur lors du chargement des services', error);
    }
  }

  private extractServices(response: any): any[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.services)) {
      return response.services;
    }

    if (response?.service && typeof response.service === 'object') {
      return [response.service];
    }

    return [];
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadServices(this.currentShopId);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadServices(this.currentShopId);
    }
  }

  addToCart(service: any) {
    this.addToCartEvent.emit(service);
  }
}
