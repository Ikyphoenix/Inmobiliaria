import { Routes } from '@angular/router';
import { Home } from './public/home/home';
import { Properties } from './public/properties/properties';

export const routes: Routes = [{path: '', component: Home, title: 'Inicio'},
    {path: 'propiedades', component: Properties, title: 'Propiedades'},
    {path: '**', redirectTo: ''}];