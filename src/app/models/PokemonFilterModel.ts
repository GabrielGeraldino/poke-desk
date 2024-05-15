export class PokemonFilterModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  q?: string;
  page: number = 1;
  pageSize: number = 20;
}
