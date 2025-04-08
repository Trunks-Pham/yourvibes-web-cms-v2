// import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
// import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo"
// import { LoginRequestModel } from "@/api/features/authenticate/model/LoginModel"
// import { useAuth } from "@/context/auth/useAuth";
// import { useState } from "react";

// const LoginViewModel = (repo: AuthenRepo) => {
//   const [loading, setLoading] = useState(false);
//   const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
//   const { onLogin } = useAuth();

//   const login = async (values: any) => {
//     try {
//       setLoading(true);
//       const data: LoginRequestModel = {
//         email: values.email,
//         password: values.password
//       };
//       const res = await repo.login(data);
//       if (res?.data) {
//         setResultObject({
//           type: 'success',
//           message: "Đăng nhập thành công!"
//         })
//         onLogin(res.data);
//       } else {
//         setResultObject({
//           type: 'error',
//           message: "Đăng nhập thất bại! Email hoặc mật khẩu không đúng!"
//         })
//       }
//     } catch (error: any) {
//       setResultObject({
//         type: 'error',
//         message: "Lỗi hệ thống, vui lòng thử lại!"
//       })
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     login,
//     loading,
//     resultObject,
//     setResultObject
//   }
// }

// export default LoginViewModel


import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo";
import { LoginRequestModel } from "@/api/features/authenticate/model/LoginModel";
import { useAuth } from "@/context/auth/useAuth";
import { useState } from "react";

const LoginViewModel = (repo: AuthenRepo) => {
  const [loading, setLoading] = useState(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const { onLogin } = useAuth();

  const login = async (values: any) => {
    try {
      setLoading(true);
      const data: LoginRequestModel = {
        email: values.email,
        password: values.password,
      };
      const res = await repo.login(data);
      if (res?.data) {
        setResultObject({
          type: "success",
          message: "Đăng nhập thành công!",
        });
        onLogin(res.data); // Gọi hàm lưu token và chuyển hướng
      }
    } catch (error: any) {
      // Xử lý lỗi chi tiết từ interceptor
      if (error?.status === 400) {
        setResultObject({
          type: "error",
          message: error.message || "Yêu cầu không hợp lệ.",
        });
      } else if (error?.status === 401) {
        setResultObject({
          type: "error",
          message: "Email hoặc mật khẩu không đúng!",
        });
      } else if (error?.status === 403) {
        setResultObject({
          type: "error",
          message: "Tài khoản của bạn đã bị chặn bởi Admin!",
        });
      } else {
        setResultObject({
          type: "error",
          message: error?.message || "Lỗi hệ thống, vui lòng thử lại!",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    resultObject,
    setResultObject,
  };
};

export default LoginViewModel;