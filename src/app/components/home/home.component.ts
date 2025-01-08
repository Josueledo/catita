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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TabPanel, TabViewModule } from 'primeng/tabview';

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
    PanelMenuModule,
    ReactiveFormsModule,
    TabPanel,
    TabViewModule
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
  items!: MenuItem[];
  total: number = 0;
    enderecoForm: FormGroup;
    activeTabIndex: number = 0; // Define o índice da aba ativa

  quantity: number = 1; // Quantidade inicial
  phoneNumber = '5533988711659';

  // itemsCarrinho = localStorage.getItem("carrinho")
  private crudService = inject(CrudService);
  private isBrowser: boolean;

  responsiveOptions: any[] | undefined;

  products: any = [];
  firebaseItems: any = [];
  images = [
    {
      id: 1,
      url: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/Banner-Corinthians-03-09-desk.jpg',
    },
    {
      id: 2,
      url: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/banner-nike-app-08-03-desk.jpg',
    },
  ];




  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,private fb: FormBuilder
  ) {
    this.enderecoForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      numeroCasa: ['', Validators.required],
      cidade: ['', Validators.required],
    });
    this.crudService.getItems().subscribe((data) => {
      this.products = data;
      console.log(this.products[0].categoria);
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onSidebarHide(event: any) {
    console.log('Sidebar fechada.');
  }

  closeSidebar() {
    this.displaySidebar = false;
  }
  nextTab() {
    this.activeTabIndex = 1; // Muda para a aba de endereço
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
        label: 'Camisas de futebol',
        items: [
          {
            label: 'Masculina',
            items: [
              {
                label: 'Versao jogador',
                items: [
                  {
                    label: 'Botafogo',
                    command: () => this.onCategorySelected('botafogo'),
                  },
                  {
                    label: 'Flamengo',
                    command: () => this.onCategorySelected('flamengo'),
                  },
                  {
                    label: 'Corinthians',
                    command: () => this.onCategorySelected('corinthians'),
                  },
                ],
              },
              {
                label: 'Versão de Torcedo',
                items: [{ label: 'Corinthians' }, { label: 'Palmeiras' }],
              },
              {
                label: 'Retrô',
                items: [{ label: 'Corinthians' }, { label: 'Palmeiras' }],
              },
            ],
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
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
  onCategorySelected(category: string): void {
    this.router.navigate(['/search'], {
      queryParams: { category },
    });
  }


  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseCart(product: any) {
    console.log(product);
    product.quantity++;
    this.updateValue();
  }
  decreaseCart(product: any) {
    product.quantity--;
    this.updateValue();
  }

  updateValue() {
    this.total = 0;
    for (let i = 0; this.carrinho.length > i; i++) {
      this.total += this.carrinho[i].price * this.carrinho[i].quantity;
    }
  }

  deleteProduct(itemId: number) {
    this.carrinho = this.carrinho.filter((item: any) => item.id !== itemId);

    localStorage.setItem('carrinho', JSON.stringify(this.carrinho)); // Atualiza o localStorage
  }

  onSubmit() {
    let message: string = '';
    if (this.enderecoForm.valid) {
      console.log('Itens selecionados: ');
      for (let i = 0; this.carrinho.length > i; i++) {
        let text = `${this.carrinho[i].quantity}X ${
          this.carrinho[i].title
        } \n Nome personalizado: ${
          this.carrinho[i].custom_name
        } \n Numero personalizado: ${
          this.carrinho[i].custom_number
        } \n PRICE: R$${this.carrinho[i].price * this.carrinho[i].quantity},00`;

        message += text;
      }
      message += '\n \n TOTAL: R$' + this.total + ',00';
      // console.log('TOTAL: R$' + this.total + ",00");
      message += `\n \n Endereço: \n NOME: ${this.enderecoForm.value.nome} \n CPF: ${this.enderecoForm.value.cpf} \n CEP: ${this.enderecoForm.value.cep} \n Numero: ${this.enderecoForm.value.numeroCasa} \n CIDADE: ${this.enderecoForm.value.cidade}`;
      console.log(this.enderecoForm.value.nome);
      const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, '_blank');
    } else {
      console.log('Formulário inválido!');
    }
  }
}
