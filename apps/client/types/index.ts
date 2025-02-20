export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type User = {
  id?: number;
  userId: string | null;
  email: string | null;
  name: string | null;
  image: string | null;
  verified?: boolean | null;
  subscriptionActive?: boolean | null;
  createdAt?: Date | null; 
  updatedAt?: Date | null;
}

export type VerificationToken = {
  id?: number;
  userId?: string | null;
  code: string | null;
  expiresAt?: Date | null;
}

export type Price = {
  productId: string
  priceId: string
  title: string
  description: string
  term: 'M' | 'Y',
  price: number
}