export interface SiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  founded: string;
  countries: string;
  products: string;
  years: string;
}

export interface BulkOffer {
  enabled: boolean;
  tagText: string;
  headingStart: string;
  headingHighlight: string;
  description: string;
  discountPercentage: number;
  discountText: string;
  discountSubText: string;
  offerEndDate: string;
  buttonText: string;
  slideImages: string[];
}

export interface HeroCampaign {
  id: number | string;
  center: string;
  left: string;
  right: string;
  title: string;
  tag: string;
}

export interface HeroConfig {
  campaigns: HeroCampaign[];
}

export interface WhoWeAre {
  heritageLabel: string;
  heading: string;
  subHeading: string;
  paragraphs: string[];
  mainImage: string;
  floatingBadgeTitle: string;
  floatingBadgeDesc: string;
  stats: {
    value: number;
    suffix: string;
    label: string;
    desc: string;
  }[];
}

export interface Category {
  name: string;
  slug: string;
  tagline: string;
  count: string;
  image: string;
}

export interface Showcase {
  indicator: string;
  headingStart: string;
  headingHighlight: string;
  description: string;
  categories: Category[];
}

export interface Expansion {
  indicator: string;
  headingStart: string;
  headingHighlight: string;
  description: string;
}

export interface PipelineScene {
  step: string;
  title: string;
  desc: string;
  image: string;
}

export interface Pipeline {
  indicator: string;
  headingStart: string;
  headingHighlight: string;
  subHeading: string;
  scenes: PipelineScene[];
}
