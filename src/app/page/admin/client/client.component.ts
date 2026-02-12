import { Component } from '@angular/core';
import { ClientCardComponent } from "./client-card/client-card.component";

@Component({
  selector: 'app-client',
  imports: [ ClientCardComponent ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {

}
