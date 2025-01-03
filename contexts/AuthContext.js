import { createContext } from "react";

export const AuthContext = createContext({
  isAdminSigned: false,
  loadingAdmin: true,
  setIsAdminSigned: () => {},
});
