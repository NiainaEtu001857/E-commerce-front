import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stocks-boutique',
  imports: [CommonModule , FormsModule],
  templateUrl: './stocks-boutique.component.html',
  styleUrl: './stocks-boutique.component.css',
})
export class StocksBoutiqueComponent {
  searchText = '';

  products = [
    {
      id: 'PROD-001',
      name: 'Télévision Samsung',
      category: 'Électronique',
      price: 1500,
      stock: 12,
      brand: 'Samsung',
      status: 'actif'
    },
    {
      id: 'PROD-002',
      name: 'Chaussures Nike Air',
      category: 'Chaussures',
      price: 120,
      stock: 3,
      brand: 'Nike',
      status: 'actif'
    },
    {
      id: 'PROD-003',
      name: 'T-shirt Homme',
      category: 'Vêtements',
      price: 25,
      stock: 0,
      brand: 'Zara',
      status: 'inactif'
    }
  ];

  deleteProduct(index: number) {
    if (confirm('Supprimer ce produit ?')) {
      this.products.splice(index, 1);
    }
  }

  editProduct(product: any) {
    console.log('Modifier :', product);
  }

  viewProduct(product: any) {
    console.log('Détails :', product);
  }
}
