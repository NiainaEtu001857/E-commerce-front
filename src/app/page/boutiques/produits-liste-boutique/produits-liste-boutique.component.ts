import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produits-liste-boutique',
  imports: [RouterLink, CommonModule ],
  templateUrl: './produits-liste-boutique.component.html',
  styleUrl: './produits-liste-boutique.component.css',
})
export class ProduitsListeBoutiqueComponent {

}
