import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CrudService } from './../../services/crud.service';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Importação necessária
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';

import {
  faPaperPlane,
  faMagnifyingGlass,
  faCartShopping,
  faQuoteLeft,
  faStar,
  faBars,
  faBagShopping
} from '@fortawesome/free-solid-svg-icons';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { FooterComponent } from '../footer/footer.component';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';
import { WhatsappComponent } from '../whatsapp/whatsapp.component';

@Component({
  selector: 'app-product',
  imports: [
    FontAwesomeModule,
    CarouselModule,
    ButtonModule,
    CommonModule,
    SidebarModule,
    FormsModule,
    SkeletonModule,
    TabViewModule,
    ReactiveFormsModule,
    StepperModule,
    FooterComponent,
    ToastModule,
    HeaderComponent,
    WhatsappComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers:[MessageService]
})
export class ProductComponent {
  crudService = inject(CrudService);
  product: any = [];
  faPaperPlane = faPaperPlane;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;
  faQuoteLeft = faQuoteLeft;
  faStar = faStar;
  total: number = 0;
  customName: string = ''; // Nome personalizado
  customNumber: string = ''; // Número personalizado
  quantity: number = 1; // Quantidade inicial
  selectedSize: string = ''; // Tamanho selecionado
  availableSizes: string[] = ['P', 'M', 'G', 'GG',"3G"]; // Lista de tamanhos
  private isBrowser: boolean;
  enderecoForm: FormGroup;
  activeTabIndex: number = 0; // Define o índice da aba ativa
  phoneNumber = '5533988711659';
  carrinho: any = [];
  faBars = faBars;
  displaySidebar = false
  faBagShopping = faBagShopping
  searchTerm: string = '';
  selectedImage!: string;
  cartService = inject(CartService)
  route = inject(ActivatedRoute);
  messageService = inject(MessageService)

  secondaryImages!: string[]

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: FormBuilder,private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.enderecoForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      numeroCasa: ['', Validators.required],
      cidade: ['', Validators.required],
    });
    this.crudService.getItems().subscribe((data) => {
      for (let i = 0; data.length > i; i++) {
        if (data[i].id === this.route.snapshot.paramMap.get('id')) {
          this.product = data[i];
          this.selectedImage = this.product.image1
          this.secondaryImages = [this.product.image1,this.product.image2,this.product.image3,this.product.image4,]
        }
      }
    });
  }

  ngOnInit() {
    this.carrinho = this.getItem('carrinho')
      ? JSON.parse(this.getItem('carrinho')!)
      : [];
    console.log(this.carrinho);


  }
  updateMainImage(image: string): void {
    this.selectedImage = image;
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


  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addOnCart(product: any) {
    if (this.selectedSize === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Selecione um tamanho!',
        life: 5000,
      });
      return;
    }

    let item = {
      image1: product.image1,
      productId: product.id,
      title: product.title,
      custom_name: this.customName,
      custom_number: this.customNumber,
      size: this.selectedSize,
      quantity: this.quantity,
      price: product.price,
    };

    if (item.custom_name !== '') item.price += 30;
    if (item.custom_number !== '') item.price += 30;

    this.cartService.addToCart(item); // Adiciona ao carrinho via serviço

    this.customName = '';
    this.customNumber = '';
    this.quantity = 1;
    this.selectedSize = '';

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto adicionado ao carrinho!',
    });
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
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
    console.log("click")
  }
}
