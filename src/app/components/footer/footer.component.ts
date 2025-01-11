import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPaperPlane,
  faMagnifyingGlass,
  faCartShopping,
  faQuoteLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
faPaperPlane = faPaperPlane;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;
  faQuoteLeft = faQuoteLeft;
  faStar = faStar;
  displaySidebar = false

  router = inject(Router)

  navigateToSection(section: string): void {
    console.log("teste")
    this.router.navigate(['']).then(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
