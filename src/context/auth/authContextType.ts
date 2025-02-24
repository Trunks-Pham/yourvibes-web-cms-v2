import { UserModel } from "../../api/features/authenticate/model/LoginModel";

export interface AuthContextType {
  onLogin: (user: any) => void;
  onUpdateProfile: (user: any) => void;
  onLogout: () => void;
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoginUser: (userId: string) => boolean;
  checkingLoading: boolean
}