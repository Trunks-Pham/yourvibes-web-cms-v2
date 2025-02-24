export interface ChartDataModel {
  month_list?: string[];
  revenue_list?: number[];
}

export interface StatsModel {
  previous_months_revenue?: number;
  previous_days_revenue?: number;
  total_count_of_users?: number;
  total_count_of_posts?: number;
}