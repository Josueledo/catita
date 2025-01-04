import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
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
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CrudService } from '../../services/crud.service';
import { Router, RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CarouselModule,
    ButtonModule,
    RouterLink,
    SidebarModule,
    SkeletonModule,
    FooterComponent,
    FormsModule,
    MegaMenuModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faPaperPlane = faPaperPlane;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;
  faQuoteLeft = faQuoteLeft;
  faStar = faStar;
  faBars = faBars;
  displaySidebar = false;
  faBagShopping = faBagShopping;
  carrinho: any = [];
  searchTerm: string = '';
  items!: MegaMenuItem[];

  // itemsCarrinho = localStorage.getItem("carrinho")
  private crudService = inject(CrudService);
  private isBrowser: boolean;

  responsiveOptions: any[] | undefined;

  products: any = [];
  firebaseItems: any = [];
  images = [
    { id: 1, url: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/Banner-Corinthians-03-09-desk.jpg' },
    { id: 2, url: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/banner-nike-app-08-03-desk.jpg' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
    this.crudService.getItems().subscribe((data) => {
      this.products = data;
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onSidebarHide(event: any) {
    console.log('Sidebar fechada.');
  }

  closeSidebar() {
    this.displaySidebar = false;
  }

  ngOnInit() {
    console.log(this.getItem('carrinho'));

    this.carrinho = this.getItem('carrinho')
      ? JSON.parse(this.getItem('carrinho')!)
      : [];

    console.log(this.carrinho);

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '730px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.items = [
      {
        label: 'Ofertas',
        icon: '1',
        items: [
          [
            {
              label: 'Masculino',
              items: [
                { label: 'Roupas' },
                { label: 'Calçados' },
                { label: 'Acessorios' },
              ],
            },
          ],
          [
            {
              label: 'Feminino',
              items: [
                { label: 'Roupas' },
                { label: 'Calçados' },
                { label: 'Acessorios' },
              ],
            },
          ],
          [
            {
              label: 'Infantil',
              items: [
                { label: 'Roupas' },
                { label: 'Calçados' },
                { label: 'Acessorios' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Masculino',
        icon: '1',
        items: [
          [
            {
              label: 'Marcas',
              items: [
                { label: 'Adidas' },
                { label: 'Nike' },
                { label: 'Puma' },
              ],
            },
          ],
          [
            {
              label: 'Esporte',
              items: [
                { label: 'Fotebol' },
                { label: 'Basquete' },
                { label: 'Outros' },
              ],
            },
          ],
          [
            {
              label: 'Especiais',
              items: [
                { label: 'Retro' },
                { label: 'Special Edition' },
                { label: 'New' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Todas Categorias',
        icon: '1',
        items: [
          [
            {
              items: [
                { label: 'Adidas' },
                { label: 'Nike' },
                { label: 'Puma' },
              ],
            },
          ],
          [
            {
              items: [
                { label: 'Fotebol' },
                { label: 'Basquete' },
                { label: 'Outros' },
              ],
            },
          ],
          [
            {
              items: [
                { label: 'Retro' },
                { label: 'Special Edition' },
                { label: 'New' },
                { label: 'Outro' },
                { label: 'Lancamentos' },
              ],
            },
          ],
          [
            {
              items: [
                { label: 'Brasileiros' },
                { label: 'Bundesleague' },
                { label: 'Champions League' },
                { label: 'Premiere' },
                { label: 'Botafogo' },
              ],
            },
          ],
        ],
      },
    ];
  }

  hover(product: any) {}

  trackByProduct(index: number, product: any): number {
    return product.id; // Identificador único
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
      console.log(localStorage.getItem('carrinho'));
    }
  }
  getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
    console.log('click');
  }
}
