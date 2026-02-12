import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-commandes-ajout',
  imports: [ CommonModule , FormsModule],
  templateUrl: './commandes-ajout.component.html',
  styleUrl: './commandes-ajout.component.css',
})
export class CommandesAjoutComponent {
order: any = {
    id: '',
    customer: { name: '', email: '' },
    date: new Date(),
    items: [],
    total: 0,
    status: 'En attente'
  };

  // Pour la saisie d'un nouvel article
  newItem: any = { name: '', quantity: 1, price: 0 };

  constructor() {}

  // Ajouter un article à la commande
  addItem(): void {
    if (!this.newItem.name || this.newItem.quantity <= 0 || this.newItem.price <= 0) return;
    this.order.items.push({ ...this.newItem });
    this.calculateTotal();
    this.newItem = { name: '', quantity: 1, price: 0 }; // reset
  }

  // Supprimer un article
  removeItem(index: number): void {
    this.order.items.splice(index, 1);
    this.calculateTotal();
  }

  // Calculer le total
  calculateTotal(): void {
    this.order.total = this.order.items.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);
  }

  // Soumettre la commande
  submit(form: NgForm): void {
    if (form.invalid || this.order.items.length === 0) {
      alert('Veuillez remplir tous les champs et ajouter au moins un article.');
      return;
    }

    console.log('Commande ajoutée :', this.order);
    alert('Commande ajoutée avec succès !');

    // Reset form
    this.order = {
      id: '',
      customer: { name: '', email: '' },
      date: new Date(),
      items: [],
      total: 0,
      status: 'En attente'
    };
    form.resetForm();
  }
}
