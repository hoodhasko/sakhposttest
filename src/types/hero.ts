interface HeroBannerResponseMedia {
  id: number;
  url: string;
  type: string;
}

interface HeroBannerResponseVendor {
  general_info?: {
    name?: string;
  };
}

export interface HeroBannerResponseItem {
  id: number;
  title: string;
  sort: number;
  deeplink: string;
  button_text: string | null;
  erid: string | null;
  inn: string | null;
  legal_name: string | null;
  media: HeroBannerResponseMedia;
  vendor: HeroBannerResponseVendor | null;
}

export interface HeroBannersResponse extends Array<HeroBannerResponseItem> {}
