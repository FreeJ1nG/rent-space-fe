import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { PATH_AUTH } from "@/common/routes/path";
import useIsRendered from "@/common/hooks/useIsRendered";

interface UseAccessTokenFeatures {
  setAccessToken: (new_access_token: string) => void;
  forceGetAccessToken: () => string;
  getAccessToken: () => string | undefined;
  removeAccessToken: () => void;
}

export default function useAccessToken(): UseAccessTokenFeatures {
  const isRendered = useIsRendered();
  const router = useRouter();
  const setAccessToken = (new_access_token: string) => {
    Cookies.set("access-token", new_access_token);
  };
  const forceGetAccessToken = () => {
    if (Cookies.get("access-token")) {
      return Cookies.get("access-token") ?? "";
    }
    router.push(PATH_AUTH.login);
    return "";
  };
  const getAccessToken = () => {
    return Cookies.get("access-token");
  };
  const removeAccessToken = () => {
    Cookies.remove("access-token");
  };

  return {
    setAccessToken,
    forceGetAccessToken: isRendered ? forceGetAccessToken : () => "",
    getAccessToken: getAccessToken,
    removeAccessToken,
  };
}
