export interface ICityData {
  id: string;
  name: string;
  slug: string;
  country: string;
  startDate: string;
  endDate: string;
  slotLeft: number;
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
