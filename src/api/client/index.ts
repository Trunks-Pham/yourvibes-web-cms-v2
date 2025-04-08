// import axios from "axios";
// import { BaseApiResponseModel } from "../baseApiResponseModel/baseApiResponseModel";
// import IApiClient from "./IApiClient";
// import ModelConverter from "@/utils/modelConvert/ModelConverter";
// import curlirize from "axios-curlirize";

// const api = axios.create({
//   timeout: 60000,
// });

// //curlirize(api);

// //Request interceptors
// api.interceptors.request.use(
//   (config) => {
//     // Get from async storage
//     const token = localStorage.getItem('accesstoken');
//     // for ngrok
//     if (config?.url?.includes("ngrok-free.app")) {
//       config.headers!["ngrok-skip-browser-warning"] = "69420";
//     }
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     Promise.reject(error)
//   }
// );

// //Response interceptors
// api.interceptors.response.use(
//   (response) => {
//     return response?.data;
//   },
//   (error) => {
//     console.error(error)
//     if (error?.response?.status === 403) {
//       if (!!localStorage.getItem("accesstoken")) {
//         localStorage.clear();
//         window.location.href = "/login"; //relative to domain
//       }
//     }
//     return Promise.resolve(error?.response?.data);
//   }
// );

// class AxiosClient implements IApiClient {
//   async post<T extends Object>(
//     path: string,
//     data: Map<string, any> | any = {},
//     config?: Map<string, any> | any
//   ): Promise<BaseApiResponseModel<T>> {
//     let response = await api.post(path, data, config);
//     return ModelConverter.decode(response, BaseApiResponseModel<T>);
//   }

//   async get<T extends Object>(
//     path: string,
//     data: Map<string, any> | any = {}
//   ): Promise<BaseApiResponseModel<T>> {
//     let response = await api.get(path, {
//       params: data,
//     });
//     return ModelConverter.decode(response, BaseApiResponseModel<T>);
//   }

//   async delete<T extends Object>(
//     path: string,
//     data: Map<string, any> | any = {}
//   ): Promise<BaseApiResponseModel<T>> {
//     let response = await api.delete(path, {
//       params: data,
//     });
//     return ModelConverter.decode(response, BaseApiResponseModel<T>);
//   }

//   async patch<T extends Object>(
//     path: string,
//     data: Map<string, any> | any = {},
//     config?: Map<string, any> | any
//   ): Promise<BaseApiResponseModel<T>> {
//     let response = await api.patch(path, data, config);
//     return ModelConverter.decode(response, BaseApiResponseModel<T>);
//   }
// }

// export default new AxiosClient();


import axios from "axios";
import { BaseApiResponseModel } from "../baseApiResponseModel/baseApiResponseModel";
import IApiClient from "./IApiClient";
import ModelConverter from "@/utils/modelConvert/ModelConverter";
import curlirize from "axios-curlirize";

const api = axios.create({
  timeout: 60000,
});

// Request interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (config?.url?.includes("ngrok-free.app")) {
      config.headers["ngrok-skip-browser-warning"] = "69420";
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error); // Thêm return
  }
);

// Response interceptors
api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.error(error);
    const status = error?.response?.status;
    const url = error?.response?.config?.url; // Lấy URL của request
    const hasToken = !!localStorage.getItem("accesstoken");

    // Xử lý khi đang ở màn hình login (request tới /login)
    if (url?.includes("/login")) {
      if (status === 403) {
        // Tài khoản bị chặn khi đăng nhập
        return Promise.reject({
          message: "Tài khoản của bạn đã bị chặn bởi Admin.",
          status: 403,
        });
      } else if (status === 401) {
        // Thông tin đăng nhập sai
        return Promise.reject({
          message: "Thông tin đăng nhập không đúng.",
          status: 401,
        });
      }
      return Promise.reject(error); // Các lỗi khác
    }

    // Xử lý khi đã đăng nhập (có token) nhưng gặp lỗi
    if (hasToken) {
      if (status === 401) {
        localStorage.clear();
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/login";
        return Promise.reject(error); // Trả lỗi để không xử lý tiếp
      } else if (status === 403) {
        localStorage.clear();
        alert("Tài khoản của bạn đã bị chặn bởi Admin.");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Các lỗi khác không xử lý ở đây
    return Promise.reject(error);
  }
);

class AxiosClient implements IApiClient {
  async post<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.post(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async get<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.get(path, { params: data });
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async delete<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.delete(path, { params: data });
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async patch<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.patch(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }
}

export default new AxiosClient();