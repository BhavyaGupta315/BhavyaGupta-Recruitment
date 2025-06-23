import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isExpired, refreshAccessToken } from "@/lib/auth";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/signin");
    alert("Please Login First");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token) {
        logout();
        return;
      }

      if (isExpired(token)){
        if (!refreshToken){
          logout();
          return;
        }

        const newToken = await refreshAccessToken(token, refreshToken);
        if (!newToken){
          logout();
          return;
        }

        localStorage.setItem("token", newToken);
        setAuth(true);
        setLoading(false);
      }else{
        setAuth(true);
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { auth, loading, logout };
};
