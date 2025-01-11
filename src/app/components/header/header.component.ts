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
                label: 'Versão jogador',
                items: [
                  { label: 'Alemanha', items: [] },
                  { label: 'Argentina', items: [] },
                  {
                    label: 'Brasil',
                    items: [
                      {
                        label: 'Botafogo',
                        command: () =>
                          this.onCategorySelected([
                            'Botafogo',
                            'jogador',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Flamengo',
                        command: () =>
                          this.onCategorySelected([
                            'flamengo',
                            'jogador',
                            'masculino',
                          ]),
                      },
                      {
                        label: 'Corinthians',
                        command: () =>
                          this.onCategorySelected([
                            'corinthians',
                            'jogador',
                            'masculino',
                          ]),
                      },
                    ],
                  },
                  { label: 'Espanha', items: [] },
                  { label: 'França', items: [] },
                  { label: 'Inglaterra', items: [] },
                  { label: 'Portugal', items: [] },
                ],
              },
              {
                label: 'Versão de Torcedor',
                items: [{ label: 'Corinthians' }, { label: 'Palmeiras' }],
              },
              {
                label: 'Retrô',
                items: [{ label: 'Corinthians' }, { label: 'Palmeiras' }],
              },
              {
                label: 'Seleções',
                items: [{ label: 'Corinthians' }, { label: 'Palmeiras' }],
              },
            ],
          },
          {
            label: 'Feminina',
            items: [
              {
                label: 'Versao jogador',
                items: [
                  {
                    label: 'Botafogo',
                    command: () =>
                      this.onCategorySelected([
                        'Botafogo',
                        'jogador',
                        'feminina',
                      ]),
                  },
                  {
                    label: 'Flamengo',
                    command: () =>
                      this.onCategorySelected([
                        'flamengo',
                        'jogador',
                        'feminina',
                      ]),
                  },
                  {
                    label: 'Corinthians',
                    command: () =>
                      this.onCategorySelected([
                        'corinthians',
                        'jogador',
                        'feminina',
                      ]),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Conjunto infantil',
        items: [
          {
            label: 'Botafogo',
            command: () =>
              this.onCategorySelected(['Botafogo', 'jogador', 'feminina']),
          },
          {
            label: 'Flamengo',
            command: () =>
              this.onCategorySelected(['flamengo', 'jogador', 'feminina']),
          },
          {
            label: 'Corinthians',
            command: () =>
              this.onCategorySelected(['corinthians', 'jogador', 'feminina']),
          },
        ],
      },
      {
        label: 'Camisas de basquete',
        items: [
          {
            label: 'Lebrom Jeimes',
            command: () =>
              this.onCategorySelected(['Botafogo', 'jogador', 'feminina']),
          },
          {
            label: 'Vlancleriston',
            command: () =>
              this.onCategorySelected(['flamengo', 'jogador', 'feminina']),
          },
          {
            label: 'Caça rato',
            command: () =>
              this.onCategorySelected(['corinthians', 'jogador', 'feminina']),
          },
        ],
      },
      {
        label: 'Camisas da NFL',
        items: [
          {
            label: 'ABC',
            command: () =>
              this.onCategorySelected(['Botafogo', 'jogador', 'feminina']),
          },
          {
            label: 'Ponte preta',
            command: () =>
              this.onCategorySelected(['flamengo', 'jogador', 'feminina']),
          },
          {
            label: 'Jucentude',
            command: () =>
              this.onCategorySelected(['corinthians', 'jogador', 'feminina']),
          },
        ],
      },
      {
        label: 'Envio imediato',
      },
      {
        label: 'Outros',
        items: [
          {
            label: 'Corta-Vento',
            command: () =>
              this.onCategorySelected(['Botafogo', 'jogador', 'feminina']),
          },
          {
            label: 'Shorts de futebol',
            command: () =>
              this.onCategorySelected(['flamengo', 'jogador', 'feminina']),
          },
          {
            label: 'Meias',
            command: () =>
              this.onCategorySelected(['corinthians', 'jogador', 'feminina']),
          },
          {
            label: 'Kit de treino',
            command: () =>
              this.onCategorySelected(['corinthians', 'jogador', 'feminina']),
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
