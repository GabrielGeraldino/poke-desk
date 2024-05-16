import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { ListDecksComponent } from './pages/list-decks/list-decks.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: { text: 'home-page' },
  },
  {
    path: 'home-page',
    component: HomePageComponent,
    data: { text: 'home-page' },
  },
  { path: 'pokemons', component: PokemonsComponent, data: { text: 'pokemons' } },
  { path: 'list-decks', component: ListDecksComponent, data: { text: 'list-decks' } }
];
