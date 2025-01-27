import { Component, ViewChild } from '@angular/core';
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
  showPopup: boolean = false;
  quantity: number = 1; // Quantidade inicial
  phoneNumber = '';

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
      complemento: [],
    });
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Camisas de Futebol',
        items: [
          {
            label: 'Masculinas',
            items: [
              {
                label: 'Torcedor',
                items: [
                  {
                    label: 'Alemanha',
                    items: [
                      {
                        label: 'Bayer Leverkusen',
                        command: () => {
                          this.onCategorySelected([
                            'Bayer Leverkusen',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Bayer de Munique',
                        command: () => {
                          this.onCategorySelected([
                            'Bayer de Munique',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Borussia Dortmund',
                        command: () => {
                          this.onCategorySelected([
                            'Borussia Dortmund',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: "Borussia M'gladbach",
                        command: () => {
                          this.onCategorySelected([
                            "Borussia M'gladbach",
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Frankfurt',
                        command: () => {
                          this.onCategorySelected([
                            'Frankfurt',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Leipzig',
                        command: () => {
                          this.onCategorySelected([
                            'Leipzig',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Wolfsburg',
                        command: () => {
                          this.onCategorySelected([
                            'Wolfsburg',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'Argentina',
                    items: [
                      {
                        label: 'Boca Juniors',
                        command: () => {
                          this.onCategorySelected([
                            'Boca Juniors',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Independiente',
                        command: () => {
                          this.onCategorySelected([
                            'Independiente',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: "Newell's Old Boys",
                        command: () => {
                          this.onCategorySelected([
                            "Newell's Old Boys",
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Racing',
                        command: () => {
                          this.onCategorySelected([
                            'Racing',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'River Plate',
                        command: () => {
                          this.onCategorySelected([
                            'River Plate',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'San Lorenzo',
                        command: () => {
                          this.onCategorySelected([
                            'San Lorenzo',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'Brasil',
                    items: [
                      {
                        label: 'Atletico-MG',
                        command: () => {
                          this.onCategorySelected([
                            'Atletico mg',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Bahia',
                        command: () => {
                          this.onCategorySelected([
                            'Bahia',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Botafogo',
                        command: () => {
                          this.onCategorySelected([
                            'Botafogo',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Ceará',
                        command: () => {
                          this.onCategorySelected([
                            'Ceara',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Corinthians',
                        command: () => {
                          this.onCategorySelected([
                            'Corinthians',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Cruzeiro',
                        command: () => {
                          this.onCategorySelected([
                            'Cruzeiro',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Flamengo',
                        command: () => {
                          this.onCategorySelected([
                            'Flamengo',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Fluminense',
                        command: () => {
                          this.onCategorySelected([
                            'Fluminense',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Fortaleza',
                        command: () => {
                          this.onCategorySelected([
                            'Fortaleza',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Grêmio',
                        command: () => {
                          this.onCategorySelected([
                            'Gremio',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Internacional',
                        command: () => {
                          this.onCategorySelected([
                            'Internacional',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Juventude',
                        command: () => {
                          this.onCategorySelected([
                            'Juventude',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Mirassol',
                        command: () => {
                          this.onCategorySelected([
                            'Mirassol',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Palmeiras',
                        command: () => {
                          this.onCategorySelected([
                            'Palmeiras',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Red Bull Bragantino',
                        command: () => {
                          this.onCategorySelected([
                            'Red Bull Bragantino',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Santos',
                        command: () => {
                          this.onCategorySelected([
                            'Santos',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Sport Recife',
                        command: () => {
                          this.onCategorySelected([
                            'Sport Recife',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'São Paulo',
                        command: () => {
                          this.onCategorySelected([
                            'Sao Paulo',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Vasco',
                        command: () => {
                          this.onCategorySelected([
                            'Vasco',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Vitória',
                        command: () => {
                          this.onCategorySelected([
                            'Vitoria',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'Espanha',
                    items: [
                      {
                        label: 'Athletic Club',
                        command: () => {
                          this.onCategorySelected([
                            'Athletic Club',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Atlético de Madrid',
                        command: () => {
                          this.onCategorySelected([
                            'Atletico de Madrid',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Barcelona',
                        command: () => {
                          this.onCategorySelected([
                            'Barcelona',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Celta de Vigo',
                        command: () => {
                          this.onCategorySelected([
                            'Celta de Vigo',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Girona',
                        command: () => {
                          this.onCategorySelected([
                            'Girona',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Rayo Vallecano',
                        command: () => {
                          this.onCategorySelected([
                            'Rayo Vallecano',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Real Bétis',
                        command: () => {
                          this.onCategorySelected([
                            'Real Betis',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Real Madrid',
                        command: () => {
                          this.onCategorySelected([
                            'Real Madrid',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Real Sociedad',
                        command: () => {
                          this.onCategorySelected([
                            'Real Sociedad',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Valencia',
                        command: () => {
                          this.onCategorySelected([
                            'Valencia',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Villarreal',
                        command: () => {
                          this.onCategorySelected([
                            'Villarreal',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'França',
                    items: [
                      {
                        label: 'Lille',
                        command: () => {
                          this.onCategorySelected([
                            'Lille',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Lyon',
                        command: () => {
                          this.onCategorySelected([
                            'Lyon',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Mônaco',
                        command: () => {
                          this.onCategorySelected([
                            'Monaco',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Nice',
                        command: () => {
                          this.onCategorySelected([
                            'Nice',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Olympique de Marseille',
                        command: () => {
                          this.onCategorySelected([
                            'Olympique de Marseille',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Paris Saint-Germain',
                        command: () => {
                          this.onCategorySelected([
                            'Paris Saint Germain',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'Inglaterra',
                    items: [
                      {
                        label: 'Arsenal',
                        command: () => {
                          this.onCategorySelected([
                            'Arsenal',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Aston Villa',
                        command: () => {
                          this.onCategorySelected([
                            'Aston Villa',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Bornemouth',
                        command: () => {
                          this.onCategorySelected([
                            'Bornemouth',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Brentford',
                        command: () => {
                          this.onCategorySelected([
                            'Brentford',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Brighton & Hover ALbion',
                        command: () => {
                          this.onCategorySelected([
                            'Brighton & Hover ALbion',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Chelsea',
                        command: () => {
                          this.onCategorySelected([
                            'Chelsea',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Crystal Palace',
                        command: () => {
                          this.onCategorySelected([
                            'Crystal Palace',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Everton',
                        command: () => {
                          this.onCategorySelected([
                            'Everton',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Fulham',
                        command: () => {
                          this.onCategorySelected([
                            'Fulham',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Leicester City',
                        command: () => {
                          this.onCategorySelected([
                            'Leicester City',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Liverpool',
                        command: () => {
                          this.onCategorySelected([
                            'Liverpool',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Manchester City',
                        command: () => {
                          this.onCategorySelected([
                            'Manchester City',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Manchester United',
                        command: () => {
                          this.onCategorySelected([
                            'Manchester United',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Newcastle United',
                        command: () => {
                          this.onCategorySelected([
                            'Newcastle United',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Nottingham Forest',
                        command: () => {
                          this.onCategorySelected([
                            'Nottingham Forest',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Southampton',
                        command: () => {
                          this.onCategorySelected([
                            'Southampton',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Tottenham',
                        command: () => {
                          this.onCategorySelected([
                            'Tottenham',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'West Ham',
                        command: () => {
                          this.onCategorySelected([
                            'West Ham',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Wolfsburg',
                        command: () => {
                          this.onCategorySelected([
                            'Wolfsburg',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'Italia',
                    items: [
                      {
                        label: 'Itália',
                        command: () => {
                          this.onCategorySelected([
                            'Italia',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Napoli',
                        command: () => {
                          this.onCategorySelected([
                            'Napoli',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Atalanta',
                        command: () => {
                          this.onCategorySelected([
                            'Atalanta',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Inter de Milão',
                        command: () => {
                          this.onCategorySelected([
                            'Inter de Milao',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Lazio',
                        command: () => {
                          this.onCategorySelected([
                            'Lazio',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Juventos',
                        command: () => {
                          this.onCategorySelected([
                            'Juventos',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Fiorentina',
                        command: () => {
                          this.onCategorySelected([
                            'Fiorentina',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Milan',
                        command: () => {
                          this.onCategorySelected([
                            'Milan',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Roma',
                        command: () => {
                          this.onCategorySelected([
                            'Roma',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Parma',
                        command: () => {
                          this.onCategorySelected([
                            'Parma',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Venezia',
                        command: () => {
                          this.onCategorySelected([
                            'Venezia',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                  {
                    label: 'Portugal',
                    items: [
                      {
                        label: 'Benfica',
                        command: () => {
                          this.onCategorySelected([
                            'Benfica',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Porto',
                        command: () => {
                          this.onCategorySelected([
                            'Porto',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                      {
                        label: 'Sporting',
                        command: () => {
                          this.onCategorySelected([
                            'Sporting',
                            'Torcedor',
                            'masculinas',
                          ]),
                            this.closeCategoria();
                        },
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Versão de Jogador',
                command: () => {
                  this.onCategorySelected(['Jogador']), this.closeCategoria();
                },
              },
              {
                label: 'Retrô',
                command: () => {
                  this.onCategorySelected(['Retro']), this.closeCategoria();
                },
              },
              {
                label: 'Seleções',
                command: () => {
                  this.onCategorySelected(['Brasil']), this.closeCategoria();
                },
              },
            ],
          },
          {
            label: 'Feminina',
            command: () => {
              this.onCategorySelected(['Feminina']), this.closeCategoria();
            },
          },
        ],
      },
      {
        label: 'Conjunto Infantil',
        command: () => {
          this.onCategorySelected(['Conjunto infantil']), this.closeCategoria();
        },
      },
      {
        label: 'Camisas de Basquete',
        command: () => {
          this.onCategorySelected(['Camisas de basquete']),
            this.closeCategoria();
        },
      },
      {
        label: 'Camisas da NFL',
        command: () => {
          this.onCategorySelected(['Camisas da NFL']), this.closeCategoria();
        },
      },
      {
        label: 'Envio Imediato',
        command: () => {
          this.onProntaEntregaSelected(), this.closeCategoria();
        },
      },
      {
        label: 'Outros',
        items: [
          {
            label: 'Corta-Vento',
            command: () => {
              this.onCategorySelected(['Corta vento']), this.closeCategoria();
            },
          },
          {
            label: 'Shorts de futebol',
            command: () => {
              this.onCategorySelected(['Shorts de futebal']),
                this.closeCategoria();
            },
          },
          {
            label: 'Meias',
            command: () => {
              this.onCategorySelected(['Meias']), this.closeCategoria();
            },
          },
          {
            label: 'Kit de treino',
            command: () => {
              this.onCategorySelected(['Kit de treino']), this.closeCategoria();
            },
          },
        ],
      },
    ];
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.updateValue();
    });
  }
  closeAllPanels() {
    this.items.forEach((category) => {
      if (category.items) {
        category.expanded = false;
      }
    });
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }
  onSidebarHide(event: any) {}

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

  navigateToProntaEntrega(): void {
    this.router.navigate(['/pronta-entrega'], {
      queryParams: { prontaEntrega: 'true' },
    });
  }
  closeCategoria() {
    this.responsiveMenu = false;
  }
  onSubmit() {
    if (this.enderecoForm.valid) {
      let message = '';

      // Loop para adicionar cada item do carrinho à mensagem
      for (let i = 0; i < this.cartItems.length; i++) {
        let text = `
          *Produto:* ${this.cartItems[i].title}
          \n*Quantidade:* ${this.cartItems[i].quantity}
          \n*Nome personalizado:* ${
            this.cartItems[i].custom_name || 'Não informado'
          }
          \n*Número personalizado:* ${
            this.cartItems[i].custom_number || 'Não informado'
          }
          \n*Tamanho:* ${this.cartItems[i].size}
          \n*Preço:* R$${(
            this.cartItems[i].price * this.cartItems[i].quantity
          ).toFixed(2)}
          \n
          ─────────────────────────────
        `;
        message += text;
      }

      // Adicionando o total à mensagem
      message += `
        \n
        *TOTAL:* R$${this.total.toFixed(2)}
        \n
        *Endereço de entrega:*
        \n
        *Nome:* ${this.enderecoForm.value.nome}
        \n
        *Numero Celular:* ${this.enderecoForm.value.numero}
        \n
        *CPF:* ${this.enderecoForm.value.cpf}
        \n
        *CEP:* ${this.enderecoForm.value.cep}
        \n
        *Cidade:* ${this.enderecoForm.value.cidade}
        \n
        *Bairro:* ${this.enderecoForm.value.bairro}
        \n
        *Rua:* ${this.enderecoForm.value.rua}
        \n
        *Número:* ${this.enderecoForm.value.numeroCasa}
        \n
        *Complemento:* ${this.enderecoForm.value.complemento}
        \n
      `;

      // Criando o link para o WhatsApp com a mensagem
      this.phoneNumber = '5533999432252';

      const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, '_blank');
    } else {
      console.log('Formulário inválido!');
    }
  }
  onProntaEntregaSelected(): void {
    this.router.navigate(['/search'], {
      queryParams: { filter: 'Pronta entrega' },
    });
  }
  onCategorySelected(categories: string[]): void {
    this.closeAllPanels()
    const isProntaEntrega = categories.includes('Pronta entrega');

    this.router.navigate(['/search'], {
      queryParams: {
        categories: categories.join(','),
        prontaEntrega: isProntaEntrega ? true : false,
      },
    });
  }
  openPopup(): void {
    this.showPopup = true; // Exibe o popup
  }

  closePopup(): void {
    this.showPopup = false; // Fecha o popup
  }

  handleButtonClick(buttonNumber: number): void {
    this.showPopup = false; // Fecha o popup após clicar
    if (buttonNumber === 1) {
      this.phoneNumber = '5533999432252';
      this.onSubmit();
    } else if (buttonNumber === 2) {
      this.phoneNumber = '5531973101528';
      this.onSubmit();
    }
  }
}
