export interface ListVendorsFiltersResponse {
  data: ListVendorsFiltersItem[];
  total: number;
}

export interface ListVendorsFiltersItem {
  id: number;
  rating: string | null;
  disabled_until: string | null;
  disabled_reason: string | null;
  general_info: {
    name: string;
  };
  image: Image;
  logo: Image;
  schedule: ScheduleItem[];
}

interface Image {
  url: string;
  url_lg: string;
}

interface ScheduleItem {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  open_time: string;
  close_time: string;
  type: string;
  vendor_id: number;
  day_numbers: number[];
}
