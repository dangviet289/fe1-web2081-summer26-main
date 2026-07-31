import { Routes } from '@angular/router';
import { About } from './pages/about/about'; 
import { Home } from './pages/home/home';  
import { Contact } from './pages/contact/contact';
import { Products } from './pages/products/products';
import { Stories } from './pages/stories/stories';
import { AddStory } from './pages/add-story/add-story';
import { EditStory } from './pages/edit-story/edit-story';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

import { authGuard, guestGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },         
  { path: 'about', component: About },   
  { path: 'contact', component: Contact },
  { path: 'products', component: Products },
  { path: 'stories', component: Stories },
  { path: 'add-story', component: AddStory},
  { path: 'edit-story/:id', component: EditStory},
  { path: 'register', component: Register},
  { path: 'login', component: Login},
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: '**', redirectTo: '' }
];