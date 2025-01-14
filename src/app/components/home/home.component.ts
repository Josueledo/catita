import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, PLATFORM_ID } from '@angular/core';
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
  faLock,
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
import { WhatsappComponent } from '../whatsapp/whatsapp.component';

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
    CommonModule,
    WhatsappComponent
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
  faTrophy = faTrophy;
  faBagShopping = faBagShopping;
  faGift = faGift;
  faPalette = faPalette;
  faTag = faTag;
  faLock = faLock;
  searchTerm: string = '';
  items!: MenuItem[];
  total: number = 0;
  enderecoForm: FormGroup;
  activeTabIndex: number = 0; // Define o índice da aba ativa
  moreSold: any = [];
  quantity: number = 1; // Quantidade inicial
  phoneNumber = '5533988711659';
  latestProducts: any[] = [];
  // itemsCarrinho = localStorage.getItem("carrinho")
  private crudService = inject(CrudService);
  private isBrowser: boolean;
  showPopup: boolean = false;

  responsiveOptions: any[] | undefined;

  products: any = [];
  feedbacks: any = [
    {
      text: 'Eu fiquei extremamente satisfeita com minha experiência na loja. […] A qualidade é excelente, os detalhes são perfeitos, por isso já estou na minha quarta compra na loja.',
      image: 'pessoa1.jpg',
      name: 'Danielle Fernandes',
    },
    {
      text: 'Atendimento impecável. Só tenho elogios.',
      image: 'pessoa2.jpg',
      name: 'Lyvia Passos',
    },
    {
      text: 'Minha experiência com a loja foi ótima! Além de um atendimento atencioso e eficiente, a camisa superou minhas expectativas, tanto pela beleza quanto pelo acabamento.',
      image: 'pessoa3.jpg',
      name: 'Ana Carolina',
    },
    {
      text: 'O atendimento foi atencioso e tirou todas as minhas dúvidas. A qualidade das camisas é excelente. Estou muito satisfeito e sou um cliente fiel da loja!',
      image: 'pessoa4.jpg',
      name: 'Filipe Toledo',
    },
    {
      text: 'Camisa excelente, qualidade muito boa e confortável. O atendimento da loja foi rápido e atencioso, com certeza vou comprar de novo. A camisa também chegou bem rápido.',
      image: 'pessoa5.jpg',
      name: 'Ádrian Mickael',
    },
    {
      text: 'Atendimento rápido e eficiente, camisas de alta qualidade e preço justo!',
      image: 'pessoa6.jpg',
      name: 'Ryan Sousa',
    },
  ];
  firebaseItems: [] = [];
  images = [
    {
      id: 1,
      url: '/banner1teste.png',
      responsiveUrl:'/banner1Mobile.png'
    },
    {
      id: 2,
      url: '/banner2teste.png',
      responsiveUrl:'/banner2Mobile.png'
    },

  ];
  displayedImages: { id: number; url: string }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Executa apenas no navegador
      this.updateImageUrls();
      window.addEventListener('resize', this.updateImageUrls.bind(this));
    }

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
      this.latestProducts = this.filterLatestProducts(data);
      console.log(this.latestProducts)
      this.moreSold = data.filter((product) => product.maisVendido);
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  @HostListener('window:resize', [])
  onResize() {
    this.updateImageUrls(); // Atualizar as URLs ao redimensionar a janela
  }
  private updateImageUrls() {
    const isSmallScreen = window.innerWidth <= 500;

    // Trocar as URLs com base na largura da tela
    this.displayedImages = this.images.map((image) => ({
      id: image.id,
      url: isSmallScreen ? image.responsiveUrl : image.url,
    }));
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
        breakpoint: '800px',
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
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remove o evento no navegador
      window.removeEventListener('resize', this.updateImageUrls.bind(this));
    }
  }
  openPopup() {
    this.showPopup = true;
  }

  onPopupClose() {
    this.showPopup = false;
  }
  handleButtonClick(buttonNumber: number) {
    console.log(`Botão ${buttonNumber} clicado`);
    // Adicione a lógica para redirecionar para o WhatsApp
    if (buttonNumber === 1) {
      window.open('https://wa.me/numero1', '_blank');
    } else if (buttonNumber === 2) {
      window.open('https://wa.me/numero2', '_blank');
    }
  }
  hover(product: any) {}

  trackByProduct(index: number, product: any): number {
    return product.id; // Identificador único
  }
  filterLatestProducts(products: any[]): any[] {
    // Filtrar itens que possuem o campo `dataPostagem`
    const filteredProducts = products.filter(product => product.postDate);

    // Ordenar os produtos por `dataPostagem` em ordem decrescente
    const sortedProducts = filteredProducts.sort((a, b) => {
      const dateA = a.postDate.toMillis();
      const dateB = b.postDate.toMillis();
      return dateB - dateA; // Mais recentes primeiro
    });

    // Retornar os 10 primeiros itens
    return sortedProducts.slice(0, 8);
  }


  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
    console.log('click');
  }

  openNfl(){
    this.router.navigate(['/search'], {
      queryParams: { q: "Camisas da NFL" },
    });
  }
  openNba(){
    this.router.navigate(['/search'], {
      queryParams: { q: "Camisas da NBA" },
    });
  }
  babylook(){
    this.router.navigate(['/search'], {
      queryParams: { q: "Feminina" },
    });
  }
  envioImediato(){
    this.router.navigate(['/search'], {
      queryParams: { q: "envio Imediato" },
    });
  }
  conjuntoInfantil(){
    this.router.navigate(['/search'], {
      queryParams: { q: "conjunto Infantil" },
    });
  }
}
