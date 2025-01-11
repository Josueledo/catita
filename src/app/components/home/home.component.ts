import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Carousel } from 'primeng/carousel';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPaperPlane,
  faMagnifyingGlass,
  faCartShopping,
  faQuoteLeft,
  faStar,
  faBars,
  faBagShopping,
  faGift,
  faTag,
  faPalette,
  faTrophy,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CrudService } from '../../services/crud.service';
import { Router, RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { FooterComponent } from '../footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TabPanel, TabViewModule } from 'primeng/tabview';
import { HeaderComponent } from '../header/header.component';

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
    TabViewModule,
    HeaderComponent,
    CommonModule
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
  responsiveMenu = false;
  displaySidebar = false;
  faTrophy = faTrophy
  faBagShopping = faBagShopping;
  faGift =faGift
  faPalette = faPalette
  faTag = faTag
  faLock = faLock
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
  feedbacks: any = [
    {
      text: 'Eu fiquei extremamente satisfeita com minha experiência na loja. […] A qualidade é excelente, os detalhes são perfeitos, por isso já estou na minha quarta compra na loja.',
      image:'pessoa1.jpg',
      name:'Danielle Fernandes'
    },
    {
      text: 'Atendimento impecável. Só tenho elogios.',
      image:'pessoa2.jpg',
      name:'Lyvia Passos'

    },
    {
      text: 'Minha experiência com a loja foi ótima! Além de um atendimento atencioso e eficiente, a camisa superou minhas expectativas, tanto pela beleza quanto pelo acabamento.',
      image:'pessoa3.jpg',
      name:'Ana Carolina'

    },
  ];
  firebaseItems: any = [];
  images = [
    {
      id: 1,
      url: '/banner1teste.png',
    },
    {
      id: 2,
      url: '/banner2teste.png',
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private fb: FormBuilder
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

  ngOnInit() {
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
  }

  hover(product: any) {}

  trackByProduct(index: number, product: any): number {
    return product.id; // Identificador único
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
