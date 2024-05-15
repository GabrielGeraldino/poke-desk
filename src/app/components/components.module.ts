import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SharedModule,
    HeaderComponent,
    PokemonCardComponent,
  ],
  exports: [HeaderComponent, PokemonCardComponent],
})
export class ComponentsModule {}
