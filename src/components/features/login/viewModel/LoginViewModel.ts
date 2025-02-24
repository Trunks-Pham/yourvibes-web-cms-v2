import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo"
import { LoginRequestModel } from "@/api/features/authenticate/model/LoginModel"
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
        password: values.password
      };
      const res = await repo.login(data);
      if (res?.data) {
        setResultObject({
          type: 'success',
          message: "Đăng nhập thành công!"
        })
        onLogin(res.data);
      } else {
        setResultObject({
          type: 'error',
          message: "Đăng nhập thất bại! Email hoặc mật khẩu không đúng!"
        })
      }
    } catch (error: any) {
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    resultObject,
    setResultObject
  }
}

export default LoginViewModel