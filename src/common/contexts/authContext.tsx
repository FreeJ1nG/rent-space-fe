import {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserQuery,
} from "@/features/auth/api";
import {
  ChildrenProps,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAccessToken from "@/common/hooks/useAccessToken";
import useIsRendered from "@/common/hooks/useIsRendered";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import { PATH_AUTH, PATH_RENT_SPACE } from "@/common/routes/path";

interface IAuthContext {
  login?: ({ email, password }: AuthFeature.LoginParam) => void;
  register?: ({
    email,
    password,
    firstname,
    lastname,
  }: AuthFeature.RegisterParam) => void;
  logout?: () => void;
  isAuthenticated?: boolean;
  email?: string;
  firstname?: string;
  lastname?: string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: ChildrenProps) {
  const router = useRouter();
  const isRendered = useIsRendered();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [firstname, setFirstname] = useState<string | undefined>(undefined);
  const [lastname, setLastname] = useState<string | undefined>(undefined);
  const [loginUser] = useLoginMutation();
  const [registerUser] = useRegisterMutation();
  const { getAccessToken, removeAccessToken, setAccessToken } =
    useAccessToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(getAccessToken())
  );
  const [fetchUserData] = useLazyGetUserQuery();
  const [error, setError] = useState("");

  useEffect(() => {
    if (getAccessToken()) {
      fetchUserData({ accessToken: getAccessToken() })
        .unwrap()
        .then((result) => {
          setEmail(result.email);
          setFirstname(result.firstname);
          setLastname(result.lastname);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setEmail(undefined);
      setFirstname(undefined);
      setLastname(undefined);
    }
  }, [isAuthenticated]);

  const login = ({ email, password }: AuthFeature.LoginParam) => {
    loginUser({ payload: { email, password } })
      .unwrap()
      .then((result) => {
        setAccessToken(result.token);
        setIsAuthenticated(true);
        router.push(PATH_RENT_SPACE.root);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const register = ({
    email,
    password,
    firstname,
    lastname,
  }: AuthFeature.RegisterParam) => {
    registerUser({ payload: { email, password, firstname, lastname } })
      .unwrap()
      .then(() => {
        router.push(PATH_AUTH.login);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const logout = () => {
    removeAccessToken();
    setIsAuthenticated(false);
  };

  const authContextProviderValue = useMemo(
    () => ({
      ...(isRendered && {
        email,
        firstname,
        lastname,
        isAuthenticated,
        login,
        register,
        logout,
      }),
    }),
    [
      isRendered,
      email,
      firstname,
      lastname,
      login,
      register,
      logout,
      isAuthenticated,
    ]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      <>
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={5000}
          onClose={() => setError("")}
        >
          <Alert onClose={() => setError("")} severity="error">
            Something went wrong
          </Alert>
        </Snackbar>
        {children}
      </>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
