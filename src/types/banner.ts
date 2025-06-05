export type BannerState = {
  loading: boolean;
  bannerErrors: any;
  success: boolean;
  bannerMessage: string;
  bannerDetail: BannerDetail;
};

export type CreateBannerBody = {
  image: string;
};

export type BannerDetail = {
  id: number;
  image: string;
  updated_at?: string | null;
  updated_by?: string | null;
};
