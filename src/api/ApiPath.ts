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

  // //REPORT ACCOUNT
  // GET_REPORTED_ACCOUNT_LIST: getApiPath("users/report"),
  // GET_REPORTED_ACCOUNT_DETAIL: getApiPath("users/report"),
  // ACIVATE_REPORTED_USER: getApiPath("users/report/activate"),

  // //REPORT POST
  // GET_REPORTED_POSTS_LIST: getApiPath("posts/report"),
  // GET_REPORTED_POST_DETAIL: getApiPath("posts/report"),
  // ACIVATE_REPORTED_POST: getApiPath("posts/report/activate"),

  // //REPORT COMMENT
  // GET_REPORTED_COMMENT_LIST: getApiPath("comments/report"),
  // GET_REPORTED_COMMENT_DETAIL: getApiPath("comments/report"),
  // ACIVATE_REPORTED_COMMENT: getApiPath("comments/report/activate"),

  //=======================================================================================================
  // Account (Type 0)
  GET_REPORTED_ACCOUNT_LIST: getApiPath("report/account/list"),
  GET_REPORTED_ACCOUNT_DETAIL: getApiPath("report/account/detail"),
  ACTIVATE_REPORTED_USER: getApiPath("report/account/activate"),

  // Post (Type 1)
  GET_REPORTED_POSTS_LIST: getApiPath("report/post/list"),
  GET_REPORTED_POST_DETAIL: getApiPath("report/post/detail"),
  ACTIVATE_REPORTED_POST: getApiPath("report/post/activate"),

  // Comment (Type 2)
  GET_REPORTED_COMMENT_LIST: getApiPath("report/comment/list"),
  GET_REPORTED_COMMENT_DETAIL: getApiPath("report/comment/detail"),
  ACTIVATE_REPORTED_COMMENT: getApiPath("report/comment/activate"),
  //=======================================================================================================

  //ADS TRANSACTIONS
  GET_ADS_TRANSACTION_LIST: getApiPath("advertise/admin"),
  GET_ADS_TRANSACTION_DETAIL: getApiPath("advertise"),

  //DASHBOARD
  GET_CHART_DATA: getApiPath("revenue/monthly_revenue"),
  GET_STATS: getApiPath("revenue/system_stats"),
};

function getApiPath(path: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/v1/2024/${path}`;
}

