export class PokemonFilterModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  Search?: string;
  PageIndex: number = 0;
  PageSize: number = 20;
}
