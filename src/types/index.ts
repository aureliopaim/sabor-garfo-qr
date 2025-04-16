
export interface User {
  id: string;
  name?: string;
  loginType: 'cpf' | 'phone';
  identifier: string; // CPF ou telefone
}

export interface Restaurant {
  id: string;
  name: string;
  code: string; // código de 6 dígitos
}

export interface Rating {
  id: string;
  userId: string;
  restaurantId: string;
  dishRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  date: string;
}

export interface BeerRating {
  id: string;
  userId: string;
  restaurantId: string;
  beerName?: string;
  rating: number;
  date: string;
}
