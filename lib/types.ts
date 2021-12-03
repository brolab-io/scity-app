export interface ICityData {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  country: string;
  openTime: string;
  closeTime: string;
  numberOfSlots: number;
}

export interface ICardData {
  name: string;
  hash: string;
  description: string | null;
  image: string;
  ownerAddress: string | null;
  attributes: {
    display_type?: string;
    trait_type: string;
    value: string | number;
  }[];
}

export interface MenuItem {
  title: string;
  href: string;
  icon: string;
}

export interface IAreaInfo {
  price: string;
  limit: number;
  startTime: number;
  endTime: number;
  currentQuantity: number;
}
