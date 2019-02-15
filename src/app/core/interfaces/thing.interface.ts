export interface Thing {
  id: number;
  name: string;
  description: string;
  happened_at?: number;
  is_closed: number;
  closed_by_user_id?: number;
  closed_by_item_id?: number;
  image_id?: number;
  location_id?: number;
  type: number;
  created_at: number;
  updated_at: number;
  supporters_num: number;
}
