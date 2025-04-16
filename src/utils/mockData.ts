import { User, Restaurant, Rating, BeerRating } from '../types';

// Dados de mock para desenvolvimento
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    loginType: 'cpf',
    identifier: '123.456.789-00'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    loginType: 'phone',
    identifier: '(11) 99999-8888'
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sabores da Terra',
    code: '123456',
    fixedDish: {
      name: 'Feijoada Completa',
      photoUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'
    }
  },
  {
    id: '2',
    name: 'Cantina Italiana',
    code: '654321',
    fixedDish: {
      name: 'Risoto de Funghi',
      photoUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
    }
  },
  {
    id: '3',
    name: 'Tempero Mineiro',
    code: '987654',
    fixedDish: {
      name: 'Feijão Tropeiro',
      photoUrl: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d'
    }
  }
];

export const mockRatings: Rating[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    dishName: 'Feijoada Completa',
    dishRating: 4,
    serviceRating: 5,
    cleanlinessRating: 4,
    date: '2023-05-10'
  },
  {
    id: '2',
    userId: '1',
    restaurantId: '2',
    dishName: 'Risoto de Funghi',
    dishRating: 3,
    serviceRating: 4,
    cleanlinessRating: 5,
    date: '2023-05-12'
  }
];

export const mockBeerRatings: BeerRating[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    beerName: 'IPA Dourada',
    rating: 5,
    date: '2023-05-10'
  },
  {
    id: '2',
    userId: '1',
    restaurantId: '2',
    beerName: 'Stout Chocolate',
    rating: 4,
    date: '2023-05-12'
  }
];
