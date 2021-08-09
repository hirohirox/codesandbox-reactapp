import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (userId: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
          if (response.data) {
            const isAdmin = response.data.id === 10 ? true : false;
            setLoginUser({ ...response.data, isAdmin });
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
            setLoading(false);
          } else {
            showMessage({ title: "ユーザが見つかりません", status: "error" });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
