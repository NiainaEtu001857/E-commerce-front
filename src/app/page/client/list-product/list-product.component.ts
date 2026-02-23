import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  services: any[] = [];
  page: number = 1;
  limit: number = 5;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  
  ) {}

  async ngOnInit(): Promise<void> {
    const shopId = this.route.snapshot.paramMap.get('id');
    await this.loadServices(shopId);
  }

  async loadServices(id?: any) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${environment.api}/shop/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: this.page, limit: this.limit, shopId: id },
      });
      this.services = [...response.data.services]; 
      this.shop = { ...response.data.shop };
      this.totalPages = response.data.totalPages;

      this.cdr.markForCheck();

      console.log('Services chargés:', response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des services', error);
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadServices(this.shop?._id);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadServices(this.shop?._id);
    }
  }

  addToCart(service: any) {
    this.addToCartEvent.emit(service);
  }
}