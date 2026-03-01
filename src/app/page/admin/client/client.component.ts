import { Component, OnInit } from '@angular/core';
import { ClientCardComponent } from "./client-card/client-card.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

type Client = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-client',
  imports: [CommonModule, ClientCardComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})

export class ClientComponent implements OnInit{

   clients: Client[] = [];
   isLoading = false;
   errorMessage = '';


   constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadClients();
    
  }
  async loadClients() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.errorMessage = 'Vous devez vous connecter.';
    return;
  }
  this.isLoading = true;
  this.errorMessage = '';
  try{
    const response = await this.http.get<Client[]>(`${environment.api}/admin/clients`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).toPromise() || [];
    this.isLoading = false;
    this.clients = response;
    console.log('Clients response:', response);
  }catch (error: any){  
    this.errorMessage = error?.error?.message || error?.error?.error || 'Erreur chargement clients';
    this.clients = [];

    }
  }
}
