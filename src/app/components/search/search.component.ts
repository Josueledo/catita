import { CrudService } from './../../services/crud.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPaperPlane,
  faMagnifyingGlass,
  faCartShopping,
  faQuoteLeft,
  faStar,
  faBars,
  faBagShopping
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-search',
  imports: [ CommonModule,RouterLink,FontAwesomeModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  products: any = []; // Exemplo de produtos
  filteredProducts: any = [];
  searchTerm: string = '';
    faPaperPlane = faPaperPlane;
    faMagnifyingGlass = faMagnifyingGlass;
    faCartShopping = faCartShopping;
    faQuoteLeft = faQuoteLeft;
    faStar = faStar;
    faBars = faBars;
    displaySidebar = false
    faBagShopping = faBagShopping
  crudService = inject(CrudService);
  constructor(private route: ActivatedRoute,private router: Router) {
    this.crudService.getItems().subscribe((data) => {
      this.products = data;

      this.route.queryParams.subscribe((params) => {
        this.searchTerm = params['q'] || '';
        const category = params['category'] || '';

        this.filterProducts(category);
      });
    });
  }

  ngOnInit(): void {

  }


  filterProducts(category: string = ''): void {
    this.filteredProducts = this.products.filter((product: any) => {
      const matchesCategory = category
        ? product.categoria?.some((cat: string) =>
            cat.toLowerCase() === category.toLowerCase())
        : true;

      const matchesSearchTerm = this.searchTerm
        ? product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesCategory && matchesSearchTerm;
    });
  }


  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }

}
