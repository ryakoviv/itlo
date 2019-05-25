export interface Thing {
  id: number;
  name: string;
  description: string;
  happened_at?: number;
  is_closed: number;
  closed_by_user_id?: number;
  closed_by_item_id?: number;
  image?: any;
  location_text: string;
  location_center_lat: number;
  location_center_lng: number;
  location_radius: number;
  type: number;
  created_at: number;
  updated_at: number;
  supporters_num: number;
  userIsOwner: boolean;
}
