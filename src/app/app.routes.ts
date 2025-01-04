import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'product-details/:id', component: ProductComponent },
  {path:'search', component:SearchComponent}
];
