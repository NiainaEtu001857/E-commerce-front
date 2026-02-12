import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
}

interface Order {
  id: string;
  customer: Customer;
  date: Date;
  items: OrderItem[];
  total: number;
  status: string;
}

@Component({
  selector: 'app-commandes-boutique',
  standalone: true, // obligatoire si tu importes FormsModule/ CommonModule ici
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './commandes-boutique.component.html',
  styleUrls: ['./commandes-boutique.component.css'], // CORRIGÉ ici
})
export class CommandesBoutiqueComponent implements OnInit {
  
  searchText: string = '';
  statusFilter: string = '';

  orders: Order[] = [];
  allOrders: Order[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Charger les commandes (mock ou API)
  loadOrders(): void {
    this.allOrders = [
      {
        id: 'CMD-1001',
        customer: { name: 'Jean Dupont', email: 'jean@gmail.com' },
        date: new Date(),
        items: [
          { name: 'Télévision Samsung', quantity: 1 },
          { name: 'Support mural', quantity: 1 }
        ],
        total: 599.99,
        status: 'En attente'
      },
      {
        id: 'CMD-1002',
        customer: { name: 'Marie Claire', email: 'marie@gmail.com' },
        date: new Date(),
        items: [
          { name: 'Chaussures Nike', quantity: 2 },
          { name: 'T-shirt', quantity: 1 },
          { name: 'Casquette', quantity: 1 }
        ],
        total: 120.50,
        status: 'Confirmée'
      },
      {
        id: 'CMD-1003',
        customer: { name: 'Paul Martin', email: 'paul@gmail.com' },
        date: new Date(),
        items: [
          { name: 'Casque Bluetooth', quantity: 1 }
        ],
        total: 89.99,
        status: 'Expédiée'
      }
    ];

    this.applyFilters();
  }

  // 🔎 Appliquer filtres
  applyFilters(): void {
    this.orders = this.allOrders.filter(order => {
      const matchSearch =
        !this.searchText ||
        order.id.toLowerCase().includes(this.searchText.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase())
        );

      const matchStatus =
        !this.statusFilter || order.status === this.statusFilter;

      return matchSearch && matchStatus;
    });
  }

  // Réinitialiser filtres
  clearFilters(): void {
    this.searchText = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  // Rafraîchir
  refresh(): void {
    this.loadOrders();
  }

  // 👁️ Voir commande
  viewOrder(order: Order): void {
    console.log('Voir commande :', order);
    // Exemple :
    // this.router.navigate(['/boutique/commandes', order.id]);
  }

  // ✏️ Modifier commande
  editOrder(order: Order): void {
    console.log('Modifier commande :', order);
    // Exemple :
    // this.router.navigate(['/boutique/commandes/edit', order.id]);
  }

}
