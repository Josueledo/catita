import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TabPanel, TabViewModule } from 'primeng/tabview';
import {
  faPaperPlane,
  faMagnifyingGlass,
  faCartShopping,
  faQuoteLeft,
  faStar,
  faBars,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [
    FontAwesomeModule,
    CarouselModule,
    ButtonModule,
    SidebarModule,
    SkeletonModule,
    FormsModule,
    PanelMenuModule,
    ReactiveFormsModule,
    TabViewModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faPaperPlane = faPaperPlane;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;
  faQuoteLeft = faQuoteLeft;
  faBars = faBars;
  responsiveMenu = false;
  displaySidebar = false;
  faBagShopping = faBagShopping;
  carrinho: any = [];
  searchTerm: string = '';
  items!: MenuItem[];
  total: number = 0;
  enderecoForm: FormGroup;
  activeTabIndex: number = 0; // Define o índice da aba ativa
  cartItems: any[] = [];

  quantity: number = 1; // Quantidade inicial
  phoneNumber = '5533988711659';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {
    this.enderecoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // Nome obrigatório e com no mínimo 3 caracteres
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // CPF obrigatório com 11 dígitos numéricos
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}\d{3}$/)]], // CEP no formato 00000-000
      numero: ['', [Validators.required, Validators.min(1)]], // Número da casa, obrigatório e maior que 0
      numeroCasa: ['', [Validators.required, Validators.min(1)]], // Número da casa, obrigatório e maior que 0
      cidade: ['', [Validators.required, Validators.minLength(3)]], // Cidade obrigatória e com no mínimo 3 caracteres
      bairro: ['', [Validators.required, Validators.minLength(3)]], // Cidade obrigatória e com no mínimo 3 caracteres
      rua: ['', [Validators.required, Validators.minLength(3)]], // Cidade obrigatória e com no mínimo 3 caracteres
    });
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Camisas de futebol',
        items: [
          {
            label: 'Masculinas',
            items: [
              {
                label: 'Torcedor',
                items: [
                  { label: 'Alemanha',
                     items: [
                    {
                      label: 'Bayer Leverkusen',
                      command: () =>
                        this.onCategorySelected([
                          'Bayer Leverkusen',
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: 'Bayer de Munique',
                      command: () =>
                        this.onCategorySelected([
                          'Bayer de Munique',
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: 'Borussia Dortmund',
                      command: () =>
                        this.onCategorySelected([
                          'Borussia Dortmund',
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Borussia M'gladbach",
                      command: () =>
                        this.onCategorySelected([
                          "Borussia M'gladbach",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Frankfurt",
                      command: () =>
                        this.onCategorySelected([
                          "Frankfurt",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Leipzig",
                      command: () =>
                        this.onCategorySelected([
                          "Leipzig",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Wolfsburg",
                      command: () =>
                        this.onCategorySelected([
                          "Wolfsburg",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                  { label: 'Argentina', items: [
                    {
                      label: "Boca Juniors",
                      command: () =>
                        this.onCategorySelected([
                          "Boca Juniors",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Independiente",
                      command: () =>
                        this.onCategorySelected([
                          "Independiente",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Newell's Old Boys",
                      command: () =>
                        this.onCategorySelected([
                          "Newell's Old Boys",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Racing",
                      command: () =>
                        this.onCategorySelected([
                          "Racing",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "River Plate",
                      command: () =>
                        this.onCategorySelected([
                          "River Plate",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "San Lorenzo",
                      command: () =>
                        this.onCategorySelected([
                          "San Lorenzo",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                  {
                    label: 'Brasil',
                    items: [
                      {
                        label: 'Atletico-MG',
                        command: () =>
                          this.onCategorySelected([
                            'Atletico mg',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Bahia',
                        command: () =>
                          this.onCategorySelected([
                            'Bahia',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Botafogo',
                        command: () =>
                          this.onCategorySelected([
                            'Botafogo',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Ceará',
                        command: () =>
                          this.onCategorySelected([
                            'Ceara',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Corinthians',
                        command: () =>
                          this.onCategorySelected([
                            'Corinthians',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Cruzeiro',
                        command: () =>
                          this.onCategorySelected([
                            'Cruzeiro',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Flamengo',
                        command: () =>
                          this.onCategorySelected([
                            'Flamengo',
                            'Torcedor',
                            'masculinas',
                          ]),
                      },
                      {
                        label: 'Fluminense',
                        command: () =>
                          this.onCategorySelected([
                            'Fluminense',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Fortaleza',
                        command: () =>
                          this.onCategorySelected([
                            'Fortaleza',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Grêmio',
                        command: () =>
                          this.onCategorySelected([
                            'Gremio',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Internacional',
                        command: () =>
                          this.onCategorySelected([
                            'Internacional',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Juventude',
                        command: () =>
                          this.onCategorySelected([
                            'Juventude',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Mirassol',
                        command: () =>
                          this.onCategorySelected([
                            'Mirassol',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Palmeiras',
                        command: () =>
                          this.onCategorySelected([
                            'Palmeiras',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Red Bull Bragantino',
                        command: () =>
                          this.onCategorySelected([
                            'Red Bull Bragantino',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Santos',
                        command: () =>
                          this.onCategorySelected([
                            'Santos',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Sport Recife',
                        command: () =>
                          this.onCategorySelected([
                            'Sport Recife',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'São Paulo',
                        command: () =>
                          this.onCategorySelected([
                            'Sao Paulo',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Vasco',
                        command: () =>
                          this.onCategorySelected([
                            'Vasco',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Vitória',
                        command: () =>
                          this.onCategorySelected([
                            'Vitoria',
                            'Torcedor',
                            'masculino',
                          ]),
                      },
                    ],
                  },
                  { label: 'Espanha', items: [
                    {
                      label: "Athletic Club",
                      command: () =>
                        this.onCategorySelected([
                          "Athletic Club",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Atlético de Madrid",
                      command: () =>
                        this.onCategorySelected([
                          "Atletico de Madrid",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Barcelona",
                      command: () =>
                        this.onCategorySelected([
                          "Barcelona",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Celta de Vigo",
                      command: () =>
                        this.onCategorySelected([
                          "Celta de Vigo",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Girona",
                      command: () =>
                        this.onCategorySelected([
                          "Girona",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Rayo Vallecano",
                      command: () =>
                        this.onCategorySelected([
                          "Rayo Vallecano",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Real Bétis",
                      command: () =>
                        this.onCategorySelected([
                          "Real Betis",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Real Madrid",
                      command: () =>
                        this.onCategorySelected([
                          "Real Madrid",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Real Sociedad",
                      command: () =>
                        this.onCategorySelected([
                          "Real Sociedad",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Valencia",
                      command: () =>
                        this.onCategorySelected([
                          "Valencia",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Villarreal",
                      command: () =>
                        this.onCategorySelected([
                          "Villarreal",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                  { label: 'França', items: [
                    {
                      label: "Lille",
                      command: () =>
                        this.onCategorySelected([
                          "Lille",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Lyon",
                      command: () =>
                        this.onCategorySelected([
                          "Lyon",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Mônaco",
                      command: () =>
                        this.onCategorySelected([
                          "Monaco",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Nice",
                      command: () =>
                        this.onCategorySelected([
                          "Nice",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Olympique de Marseille",
                      command: () =>
                        this.onCategorySelected([
                          "Olympique de Marseille",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Paris Saint-Germain",
                      command: () =>
                        this.onCategorySelected([
                          "Paris Saint Germain",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                  { label: 'Inglaterra', items: [
                    {
                      label: "Arsenal",
                      command: () =>
                        this.onCategorySelected([
                          "Arsenal",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Aston Villa",
                      command: () =>
                        this.onCategorySelected([
                          "Aston Villa",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Bornemouth",
                      command: () =>
                        this.onCategorySelected([
                          "Bornemouth",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Brentford",
                      command: () =>
                        this.onCategorySelected([
                          "Brentford",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Brighton & Hover ALbion",
                      command: () =>
                        this.onCategorySelected([
                          "Brighton & Hover ALbion",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Chelsea",
                      command: () =>
                        this.onCategorySelected([
                          "Chelsea",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Crystal Palace",
                      command: () =>
                        this.onCategorySelected([
                          "Crystal Palace",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Everton",
                      command: () =>
                        this.onCategorySelected([
                          "Everton",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Fulham",
                      command: () =>
                        this.onCategorySelected([
                          "Fulham",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Leicester City",
                      command: () =>
                        this.onCategorySelected([
                          "Leicester City",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Liverpool",
                      command: () =>
                        this.onCategorySelected([
                          "Liverpool",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Manchester City",
                      command: () =>
                        this.onCategorySelected([
                          "Manchester City",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Manchester United",
                      command: () =>
                        this.onCategorySelected([
                          "Manchester United",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Newcastle United",
                      command: () =>
                        this.onCategorySelected([
                          "Newcastle United",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Nottingham Forest",
                      command: () =>
                        this.onCategorySelected([
                          "Nottingham Forest",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Southampton",
                      command: () =>
                        this.onCategorySelected([
                          "Southampton",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Tottenham",
                      command: () =>
                        this.onCategorySelected([
                          "Tottenham",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "West Ham",
                      command: () =>
                        this.onCategorySelected([
                          "West Ham",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Wolfsburg",
                      command: () =>
                        this.onCategorySelected([
                          "Wolfsburg",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                  { label: 'Italia', items: [
                    {
                      label: "Itália",
                      command: () =>
                        this.onCategorySelected([
                          "Italia",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Napoli",
                      command: () =>
                        this.onCategorySelected([
                          "Napoli",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Atalanta",
                      command: () =>
                        this.onCategorySelected([
                          "Atalanta",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Inter de Milão",
                      command: () =>
                        this.onCategorySelected([
                          "Inter de Milao",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Lazio",
                      command: () =>
                        this.onCategorySelected([
                          "Lazio",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Juventos",
                      command: () =>
                        this.onCategorySelected([
                          "Juventos",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Fiorentina",
                      command: () =>
                        this.onCategorySelected([
                          "Fiorentina",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Milan",
                      command: () =>
                        this.onCategorySelected([
                          "Milan",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Roma",
                      command: () =>
                        this.onCategorySelected([
                          "Roma",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Parma",
                      command: () =>
                        this.onCategorySelected([
                          "Parma",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Venezia",
                      command: () =>
                        this.onCategorySelected([
                          "Venezia",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                  { label: 'Portugal', items: [
                    {
                      label: "Benfica",
                      command: () =>
                        this.onCategorySelected([
                          "Benfica",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Porto",
                      command: () =>
                        this.onCategorySelected([
                          "Porto",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                    {
                      label: "Sporting",
                      command: () =>
                        this.onCategorySelected([
                          "Sporting",
                          'Torcedor',
                          'masculinas',
                        ]),
                    },
                  ] },
                ],
              },
              {
                label: 'Versão de Jogador',
                command: () =>
                  this.onCategorySelected([
                    'Jogador',

                  ]),
              },
              {
                label: 'Retrô',
                command: () =>
                  this.onCategorySelected([
                    'Retro',

                  ]),
              },
              {
                label: 'Seleções',
                items: [{ label: 'Corinthians' }, { label: 'Palmeiras' }],
              },
            ],
          },
          {
            label: 'Feminina',
            command: () =>
              this.onCategorySelected([
                'Feminina',

              ]),
          },
        ],
      },
      {
        label: 'Conjunto infantil',
        command: () =>
          this.onCategorySelected([
            'Conjunto infantil',

          ]),
      },
      {
        label: 'Camisas de basquete',
        command: () =>
          this.onCategorySelected([
            'Camisas de basquete',

          ]),
      },
      {
        label: 'Camisas da NFL',
        command: () =>
          this.onCategorySelected([
            'Camisas da NFL',

          ]),
      },
      {
        label: 'Envio imediato',
        command: () =>
          this.onCategorySelected([
            'envio imediato',

          ]),
      },
      {
        label: 'Outros',
        items: [
          {
            label: 'Corta-Vento',
            command: () =>
              this.onCategorySelected(['Corta vento']),
          },
          {
            label: 'Shorts de futebol',
            command: () =>
              this.onCategorySelected(['Shorts de futebal']),
          },
          {
            label: 'Meias',
            command: () =>
              this.onCategorySelected(['Meias']),
          },
          {
            label: 'Kit de treino',
            command: () =>
              this.onCategorySelected(['Kit de treino']),
          },
        ],
      },
    ];
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.updateValue();
      console.log(this.cartItems);
    });
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
    console.log('click');
  }
  onSidebarHide(event: any) {
    console.log('Sidebar fechada.');
  }

  closeSidebar() {
    this.displaySidebar = false;
    this.responsiveMenu = false;
  }
  nextTab() {
    this.activeTabIndex = 1; // Muda para a aba de endereço
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
    for (let i = 0; this.cartItems.length > i; i++) {
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
  }
  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  onSubmit() {
    if (this.enderecoForm.valid) {
      console.log('Itens selecionados: ');
      let message = '';

      // Loop para adicionar cada item do carrinho à mensagem
      for (let i = 0; i < this.cartItems.length; i++) {
        let text = `
          *Produto:* ${this.cartItems[i].title}
          \n *Quantidade:* ${this.cartItems[i].quantity}
          \n *Nome personalizado:* ${
            this.cartItems[i].custom_name || 'Não informado'
          }
          \n *Número personalizado:* ${
            this.cartItems[i].custom_number || 'Não informado'
          }
          \n *Tamanho:* ${this.cartItems[i].size}
          \n *Preço:* R$${(
            this.cartItems[i].price * this.cartItems[i].quantity
          ).toFixed(2)}
          \n
        `;
        message += text;
      }

      // Adicionando o total à mensagem
      message += `
        \n
        *TOTAL:* R$${this.total.toFixed(2)}
        \n
        *Endereço de entrega:*
        \n *Nome:* ${this.enderecoForm.value.nome}
        \n *CPF:* ${this.enderecoForm.value.cpf}
        \n *CEP:* ${this.enderecoForm.value.cep}
        \n *Número:* ${this.enderecoForm.value.numeroCasa}
        \n *Cidade:* ${this.enderecoForm.value.cidade}
      `;

      console.log(this.enderecoForm.value.nome);

      // Criando o link para o WhatsApp com a mensagem
      const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, '_blank');
    } else {
      console.log('Formulário inválido!');
    }
  }
  onCategorySelected(categories: string[]): void {
    this.router.navigate(['/search'], {
      queryParams: { categories: categories.join(',') },
    });
  }
}
