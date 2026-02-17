import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.css',
})
export class AjouterComponent {
  isSubmitting = false;
  attributes: Array<{ key: string; value: string }> = [{ key: '', value: '' }];

  productForm = {
    name: '',
    category: '',
    price: null as number | null,
    stock: null as number | null,
    brand: '',
    description: '',
    image: null as File | null,
    status: 'actif',
    base_unity: 'litre',
  };

  constructor(private http: HttpClient) {}

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.productForm.image = input.files && input.files.length ? input.files[0] : null;
  }

  addAttributeRow() {
    this.attributes.push({ key: '', value: '' });
  }

  removeAttributeRow(index: number) {
    if (this.attributes.length === 1) {
      this.attributes[0] = { key: '', value: '' };
      return;
    }
    this.attributes.splice(index, 1);
  }

  get hasInvalidAttribute(): boolean {
    return this.attributes.some(
      (attr) =>
        (attr.key.trim().length > 0 && attr.value.trim().length === 0) ||
        (attr.key.trim().length === 0 && attr.value.trim().length > 0)
    );
  }

  async submit(event: Event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez vous connecter.');
      return;
    }

    if (!this.productForm.name || !this.productForm.brand || !this.productForm.category) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    const minQuantity = Number(this.productForm.stock ?? 1);
    if (!Number.isFinite(minQuantity) || minQuantity <= 0) {
      alert('Le stock doit etre superieur a 0.');
      return;
    }

    if (this.hasInvalidAttribute) {
      alert('Chaque attribut doit avoir une clé et une valeur.');
      return;
    }

    const cleanedAttributes = this.attributes
      .map((attr) => ({
        key: attr.key.trim(),
        value: attr.value.trim(),
      }))
      .filter((attr) => attr.key.length > 0 && attr.value.length > 0);

    const payload = {
      name: this.productForm.name.trim(),
      brand: this.productForm.brand.trim(),
      type: this.productForm.category,
      min_quantity: minQuantity,
      base_unity: this.productForm.base_unity || 'Unité',
      price: this.productForm.price ?? null,
      stock: this.productForm.stock ?? null,
      description: this.productForm.description?.trim() || null,
      image_name: this.productForm.image?.name || null,
      status: this.productForm.status || null,
      attributes: cleanedAttributes,
    };

    this.isSubmitting = true;
    try {
      await firstValueFrom(
        this.http
          .post(`${environment.api}/shop/service/add`, payload, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }),
          })
          .pipe(timeout(15000))
      );

      alert('Produit ajoute avec succes.');
      this.productForm = {
        name: '',
        category: '',
        price: null,
        stock: null,
        brand: '',
        description: '',
        image: null,
        status: 'actif',
        base_unity: 'piece',
      };
      this.attributes = [{ key: '', value: '' }];
    } catch (error: any) {
      if (error?.name === 'TimeoutError') {
        alert("Errur serveur");
        return;
      }
      alert(error?.error?.message || error?.error?.error || 'Erreur serveur');
    } finally {
      this.isSubmitting = false;
    }
  }
}
