import { ILngAttr, Lng } from '../@shared/types/hotels.types';


export const getLngString = (obj: ILngAttr): string | undefined => {
  const langs = ['en-US', 'de-DE', 'fr-FR', 'es-ES','sp-SP'] as Lng[];
  const lng = langs.find((l) => obj[l]);

  return lng ? obj[lng] : '';
}