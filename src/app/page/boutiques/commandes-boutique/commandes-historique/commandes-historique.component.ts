import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { OrderService } from '../../../../services/order';

interface Client {
  _id: string;
  first_name: string;
  email: string;
}

interface OrderItem {
  serviceName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  _id: string;
  ref?: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  client: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-commandes-historique',
  standalone: true,
  imports: [CommonModule , FormsModule ],
  templateUrl: './commandes-historique.component.html',
  styleUrl: './commandes-historique.component.css',
})
export class CommandesHistoriqueComponent implements OnInit {
  searchText: string = '';
  statusFilter: string = '';
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  clientsById: Record<string, Client> = {};
  shopId: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.shopId = user?.id || user?._id || '';
      } catch {
        this.shopId = storedUser;
      }
    }

    if (this.shopId) {
      this.loadData();
    } else {
      this.errorMessage = 'Boutique introuvable.';
    }
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      orders: this.orderService.getShopOrders(this.shopId),
      clients: this.orderService.getClients()
    }).subscribe({
      next: ({ orders, clients }) => {
        this.clientsById = (clients || []).reduce((acc: Record<string, Client>, client: Client) => {
          acc[client._id] = client;
          return acc;
        }, {});
        this.orders = orders || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de l\'historique.';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();
    this.filteredOrders = this.orders.filter((order) => {
      const client = this.clientsById[order.client];
      const idMatch = ((order.ref || order._id) || '').toLowerCase().includes(search);
      const nameMatch = (client?.first_name || '').toLowerCase().includes(search);
      const emailMatch = (client?.email || '').toLowerCase().includes(search);
      const serviceMatch = (order.items || []).some((item) =>
        (item.serviceName || '').toLowerCase().includes(search)
      );
      const matchesSearch = !search || idMatch || nameMatch || emailMatch || serviceMatch;
      const matchesStatus = !this.statusFilter || order.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  deleteOrder(orderId: string) {
    if (confirm('Voulez-vous supprimer cette commande ?')) {
      this.orders = this.orders.filter((order) => order._id !== orderId);
      this.applyFilters();
    }
  }

  viewOrder(order: Order) {
    console.log('Commande :', order);
  }

  getStatusLabel(status: string): string {
    if (status === 'pending') return 'En attente';
    if (status === 'confirmed') return 'Confirmée';
    if (status === 'delivered') return 'Livrée';
    if (status === 'cancelled') return 'Annulée';
    return status;
  }
}
