import { Routes } from '@angular/router';
import { About } from './pages/about/about'; 
import { Home } from './pages/home/home';  
import { Contact } from './pages/contact/contact';
import { Products } from './pages/products/products';
import { Stories } from './pages/stories/stories';

export const routes: Routes = [
  { path: '', component: Home },         
  { path: 'about', component: About },   
  { path: 'contact', component: Contact },
  { path: 'products', component: Products },
  { path: 'stories', component: Stories }
];