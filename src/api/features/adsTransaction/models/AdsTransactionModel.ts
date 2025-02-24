import { PostResponseModel } from "../../post/models/PostResponseModel"

export interface AdsTransactionListRequestModel {
  post_id?: string
  status?: boolean
  user_email?: string
  from_date?: string
  to_date?: string
  from_price?: number
  to_price?: number
  sort_by?: string
  is_descending?: boolean
  limit?: number
  page?: number
}

export interface AdsTransactionListResponseModel {
  id?: string,
  post_id?: string,
  post?: PostResponseModel,
  user_email?: string,
  start_date?: string,
  end_date?: string,
  day_remaining?: number,
  created_at?: string,
  updated_at?: string,
  bill?: {
    id?: string,
    advertise_id?: string,
    price?: number,
    created_at?: string,
    updated_at?: string,
    status?: boolean
  }
}