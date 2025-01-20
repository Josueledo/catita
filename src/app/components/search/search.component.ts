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
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabPanel, TabViewModule } from 'primeng/tabview';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    FormsModule,
    PanelMenuModule,
    TabViewModule,
    HeaderComponent,
    FooterComponent,
  ],
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
  responsiveMenu = false;
  prontaEntregaFilter: boolean = false;

  displaySidebar = false;
  faBagShopping = faBagShopping;
  crudService = inject(CrudService);
  constructor(private route: ActivatedRoute, private router: Router) {
    this.crudService.getItems().subscribe((data) => {
      this.products = data;

      this.route.queryParams.subscribe((params) => {
        const categoriesParam = params['categories'] || '';
        const searchTermParam = params['q'] || '';
        const categories = categoriesParam ? categoriesParam.split(',') : [];
        const filter = params['filter'];
        if (filter && filter.toLowerCase() === 'pronta entrega') {
          this.filteredProducts = this.products.filter((product: any) => product.prontaEntrega === true);
          console.log(this.filteredProducts)
        } else {
          this.filterProducts(categories, searchTermParam);
        }
      });
    });
  }

  ngOnInit(): void {

  }



  filterProducts(categories: string[] = [], searchTerm: string = ''): void {
    this.filteredProducts = this.products.filter((product: any) => {
      // Verificar se as categorias do filtro estão incluídas nas categorias do produto
      const matchesCategories = categories.length
        ? categories.every((category) =>
            (product.categoria || [])
              .map((c: string) => c.toLowerCase())
              .includes(category.toLowerCase())
          )
        : true;

      // Verificar se o termo de busca coincide
      const matchesSearchTerm = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesProntaEntrega = this.prontaEntregaFilter
        ? product.prontaEntrega === true
        : true;
      return matchesCategories && matchesSearchTerm && matchesProntaEntrega;
    });
  }

  // Função para verificar igualdade exata entre dois arrays
  arraysAreEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.sort().join(',') === arr2.sort().join(',');
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }
}
