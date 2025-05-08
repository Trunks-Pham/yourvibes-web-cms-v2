export const ApiPath = {
  // Auth
  LOGIN: getApiPath("admins/login"),

  //INFO
  UPDATE_INFO: getApiPath("admins/"),
  CHANGE_PASSWORD: getApiPath("admins/change_password"),

  //ADMIN MANAGEMENT
  GET_ADMINS_LIST: getApiPath("admins/"),
  CREATE_ADMIN: getApiPath("admins/super_admin"),
  UPDATE_ADMIN: getApiPath("admins/super_admin"),
  RESET_PASSWORD: getApiPath("admins/super_admin/forgot_admin_password"),

  //REPORT
  GET_REPORTED_LIST: getApiPath("report/"),  
  GET_REPORTED_DETAIL: getApiPath("report/{report_id}"),  
  ACIVATE_REPORTED: getApiPath("report/activate/"), 
  HANDLE_REPORTED: getApiPath("report/handle_report/"), 
  DELETE_REPORTED: getApiPath("report/"), 

  //ADS TRANSACTIONS
  GET_ADS_TRANSACTION_LIST: getApiPath("advertise/admin"),
  GET_ADS_TRANSACTION_DETAIL: getApiPath("advertise"),

  //DASHBOARD
  GET_CHART_DATA: getApiPath("revenue/monthly_revenue"),
  GET_STATS: getApiPath("revenue/system_stats"),

  //Test_cache
  CLEARCACHE: getApiPath("systems/all_cache"),
  CLEARCACHE_COMMENT: getApiPath("systems/comment_cache"),
  CLEARCACHE_POST: getApiPath("systems/post_cache"),
  //Test_post
  CHECK_EXPIRY_ADVARTISEMENT: getApiPath("systems/check_expiry_of_advertisement"),
  CHECK_EXPORY_POST: getApiPath("systems/check_expiry_of_feature_post"),
  UPDATE_CREATED_POST: getApiPath("systems/delay_post_created_at/"),
  EXPIRY_ADVETISE_BY_POST_ID: getApiPath("systems/expired_advertise/"),
  PUSH_ADVERTISE_TO_NEWFEED: getApiPath("systems/push_advertise_to_new_feed"),
  PUSH_FEATURE_POST_TO_NEWFEED: getApiPath("systems/push_feature_post_to_new_feed"),
  UPDATE_LIKE_COMMENT_STATISTIC_COUNT: getApiPath("systems/update_post_and_statistics/"),
};

function getApiPath(path: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/v1/2024/${path}`;
}

