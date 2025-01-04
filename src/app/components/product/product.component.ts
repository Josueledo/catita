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

@Component({
  selector: 'app-product',
  imports: [
    FontAwesomeModule,
    CarouselModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    SidebarModule,
    FormsModule,
    SkeletonModule,
    TabViewModule,
    ReactiveFormsModule,
    StepperModule,
    FooterComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
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
  availableSizes: string[] = ['PP', 'P', 'M', 'G']; // Lista de tamanhos
  private isBrowser: boolean;
  enderecoForm: FormGroup;
  activeTabIndex: number = 0; // Define o índice da aba ativa
  phoneNumber = '5533988711659';
  carrinho: any = [];
  faBars = faBars;
  displaySidebar = false
  faBagShopping = faBagShopping
  searchTerm: string = '';

  route = inject(ActivatedRoute);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: FormBuilder,private router: Router
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
  }

  ngOnInit() {
    this.carrinho = this.getItem('carrinho')
      ? JSON.parse(this.getItem('carrinho')!)
      : [];
    console.log(this.carrinho);
    this.updateValue();

    this.crudService.getItems().subscribe((data) => {
      for (let i = 0; data.length > i; i++) {
        if (data[i].id === this.route.snapshot.paramMap.get('id')) {
          this.product = data[i];
        }
      }
    });
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

  nextTab() {
    this.activeTabIndex = 1; // Muda para a aba de endereço
  }
  onSidebarHide(event: any) {
  }

  closeSidebar() {
    this.displaySidebar = false;
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

  addOnCart(product: any) {
    if (this.selectedSize === '') {
      alert('please select a size');
      return;
    }
    let item = {
      image1: product.image1,
      productId: product.id,
      id: this.carrinho.length,
      title: product.title,
      custom_name: this.customName,
      custom_number: this.customNumber,
      size: this.selectedSize,
      quantity: this.quantity,
      price: product.price,
    };

    if (item.custom_name !== '') {
      item.price += 30;
    }
    if (item.custom_number !== '') {
      item.price += 30;
    }
    this.carrinho.push(item);

    this.setItem('carrinho', JSON.stringify(this.carrinho));

    this.customName = '';
    this.customNumber = '';
    this.quantity = 1;
    this.selectedSize = '';
    this.updateValue();
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
