import { Component, Input, input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonModel } from '../../models/PokemonModel';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokenon: PokemonModel = new PokemonModel();
}
