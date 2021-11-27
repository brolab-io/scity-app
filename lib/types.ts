export interface ICityData {
  id: string;
  name: string;
  slug: string;
  country: string;
  startDate: string;
  endDate: string;
  slotLeft: number;
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
