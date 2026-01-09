export interface ExchangeRate {
  currency: string;
  flag: string;
  name: string;
  buyRate: number;
  sellRate: number;
  lastUpdated: string;
  isDisabled?: boolean;
}

export interface BranchLocation {
  id: string;
  city: string;
  address: string;
  openingHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
}

export interface VIPBenefits {
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
}
