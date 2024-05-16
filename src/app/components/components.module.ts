import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { CardsAddComponent } from './cards-add/cards-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SharedModule,
    HeaderComponent,
    PokemonCardComponent,
    CardsAddComponent,
  ],
  exports: [HeaderComponent, PokemonCardComponent, CardsAddComponent],
})
export class ComponentsModule {}
