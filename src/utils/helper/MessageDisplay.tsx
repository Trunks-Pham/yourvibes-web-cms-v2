import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { MessageInstance } from "antd/es/message/interface";

export const messageDisplay = (resultObject: ResultObject | undefined, message: MessageInstance) => {
  if (!!resultObject?.message) {
    switch (resultObject?.type) {
      case "success":
        message.success(resultObject?.message, 5);
        break;
      case "error":
        message.error(resultObject?.message, 5);
        break;
      default:
        break;
    }
  }
}