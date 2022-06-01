export interface ILngAttr {
  'en-US'?: string;
  'de-DE'?: string;
  'fr-FR'?: string;
  'es-ES'?: string;
  'sp-SP'?: string;
}
export type Lng = 'en-US' | 'de-DE' | 'fr-FR' | 'es-ES' | 'sp-SP'

type Benefit = {
  text: ILngAttr;
}

type Deal = {
  expireTime: string;
  headline: ILngAttr;
  details: ILngAttr;
}

type Image = {
  url: string;
  caption: ILngAttr;
}

export interface IHotel {
  id: number;
  minPrice: number;
  currencyCode: string;
  countryCode: string;

  name: ILngAttr;
  address: ILngAttr;
  city: ILngAttr;
  description: ILngAttr;

  benefits: Benefit[];

  deals: Deal[];

  images: Image[];
  lat?: number;
  lng?: number;
}

export interface IApiResponse {
  success: boolean;
  error?: string;
  result: IHotel[];
}

export interface IResponse {
  data: IApiResponse;
}

export const HOTELS_ENDPOINT =
  'https://61d480b38df81200178a8d15.mockapi.io/hotels-redesign/freelancer-task/hotels';
export const BASE_URL = 'https://reisetopia.de';
