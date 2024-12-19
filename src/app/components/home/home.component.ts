import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faMagnifyingGlass, faCartShopping} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faPaperPlane = faPaperPlane;
  faMagnifyingGlass = faMagnifyingGlass
  faCartShopping = faCartShopping

  camisas = [
    {
    "id":1,
    "image":"/1.jpg",
    "title":"Camisa do Santos X CBJR LEgacy",
    "fullPrice":240,
    "price":190,
    "estoque":true
    },
    {
    "id":2,
    "image":"/1.jpg",
    "title":"Camisa do Santos X CBJR LEgacy",
    "fullPrice":240,
    "price":190,
    "estoque":true
    },
    {
    "id":3,
    "image":"/1.jpg",
    "title":"Camisa do Atleico X CBJR",
    "fullPrice":260,
    "price":195,
    "estoque":true
    },
    {
    "id":4,
    "image":"/1.jpg",
    "title":"Camisa do Botafogo X CBJR LEgacy",
    "fullPrice":290,
    "price":200,
    "estoque":true
    }
  ]

}
