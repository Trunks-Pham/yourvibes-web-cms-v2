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
};

function getApiPath(path: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/v1/2024/${path}`;
}

