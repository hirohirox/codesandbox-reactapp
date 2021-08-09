import { useContext } from "react";

import {
  LoginUserContextType,
  LoginUserContext
} from "./../providers/LoginUserProvider";

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
