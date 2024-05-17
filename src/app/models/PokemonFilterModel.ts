export class PokemonFilterModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  q?: string;
  page: number = 1;
  pageSize: number = 20;
}
export class PokemonFilterBaseModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  page: number = 1;
  pageSize: number = 20;
}
