export interface User {
  id: string;
  name?: string;
  loginType: 'cpf' | 'phone';
  identifier: string; // CPF ou telefone
}

interface FixedDish {
  name: string;
  photoUrl: string;
}

export interface Restaurant {
  id: string;
  name: string;
  code: string;
  fixedDish: FixedDish;
}

export interface Rating {
  id: string;
  userId: string;
  restaurantId: string;
  dishName: string;
  dishPhoto?: string;
  dishRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  date: string;
}

export interface BeerRating {
  id: string;
  userId: string;
  restaurantId: string;
  beerName: (typeof import('../utils/constants').CRAFT_BEERS)[number];
  rating: number;
  date: string;
}
