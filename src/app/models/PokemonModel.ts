export class PokemonModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  id?: string;
  name?: string;
  supertype?: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  evolvesTo?: string[];
  rules?: string[];
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set?: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited: string;
      expanded: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
  number?: string;
  artist?: string;
  rarity?: string;
  nationalPokedexNumbers?: number[];
  legalities?: {
    unlimited: string;
    expanded: string;
  };
  images?: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices: {
      holofoil: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
    };
  };
}

export class RaritiesModel {
  data: [] = [];
}

export class TypeModel {
  data: [] = [];
}

export class SupertypeModel {
  data: [] = [];
}

export class SubtypeModel {
  data: [] = [];
}
export class SetModel {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  id?: string;
  name?: string;
  series?: string;
  printedTotal?: number;
  total?: number;
  legalities = {
    unlimited: '',
    standard: '',
    expanded: '',
  };
  ptcgoCode?: string;
  releaseDate?: Date;
  updatedAt?: Date;
  images = {
    symbol: '',
    logo: '',
  };
}
