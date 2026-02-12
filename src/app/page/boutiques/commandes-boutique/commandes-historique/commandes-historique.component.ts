import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commandes-historique',
  imports: [CommonModule , FormsModule ],
  templateUrl: './commandes-historique.component.html',
  styleUrl: './commandes-historique.component.css',
})
export class CommandesHistoriqueComponent {
  searchText: string = '';

  orders = [
    {
      id: 'CMD-1001',
      date: new Date(),
      status: 'Confirmée',
      total: 120.5,
      customer: {
        name: 'Jean Dupont',
        email: 'jean@gmail.com'
      },
      items: [
        { name: 'Chaussures', quantity: 2, price: 40 },
        { name: 'T-shirt', quantity: 1, price: 40.5 }
      ]
    },
    {
      id: 'CMD-1002',
      date: new Date(),
      status: 'En attente',
      total: 75,
      customer: {
        name: 'Marie Claire',
        email: 'marie@gmail.com'
      },
      items: [
        { name: 'Sac', quantity: 1, price: 75 }
      ]
    }
  ];

  deleteOrder(index: number) {
    if (confirm('Voulez-vous supprimer cette commande ?')) {
      this.orders.splice(index, 1);
    }
  }

  viewOrder(order: any) {
    console.log('Commande :', order);
  }
}
