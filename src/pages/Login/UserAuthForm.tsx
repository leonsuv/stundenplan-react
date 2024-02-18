import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/AppContext";
import { getRefresh, login } from "@/data/ApiWrapper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { loggedOutBearer } from "@/lib/utils";
import { Input, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function UserAuthForm() {
  const { setLoggedIn } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [, setAuthtoken] = useLocalStorage("authToken", loggedOutBearer);
  const [ refreshToken , setRefreshtoken] = useLocalStorage("refreshToken", loggedOutBearer);
  localStorage.setItem("persist", "true");
  const navigate = useNavigate();


  useEffect(() => {
    if (refreshToken !== loggedOutBearer) {
      try {
        getRefresh(refreshToken).then((res) => {
          if (!res) return;
          setLoggedIn(true);
          navigate("/");
        })
      } catch (error) {
        console.error(error);
      }
    }
  }, [])
  async function reqLogin() {
    setIsLoading(true);
    const data = await login(username, password);
    setIsLoading(false);

    if (data == null) {
      setLoginError(true);
      return;
    }

    setUsername("");
    setPassword("");
    setAuthtoken(`Bearer ${data.access_token}`);
    setRefreshtoken(`Bearer ${data.refresh_token}`);
    setLoggedIn(true);

    navigate("/");
  }
  return (
    <div className={"grid gap-6"}>
      <div className="grid gap-2">
        <div className="grid gap-1 w-[12rem] mx-auto">
          <Label className="sr-only" htmlFor="username">
            Benutzername
          </Label>
          <Input
            id="username"
            placeholder="m.mustermann"
            type="username"
            color={loginError?"danger":"default"}
            autoCapitalize="none"
            value={username}
            onValueChange={(value) => setUsername(value)}
            autoComplete="username"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1 w-[12rem] mx-auto">
          <Label className="sr-only" htmlFor="password">
            Passwort
          </Label>
          <Input
            id="password"
            placeholder="**********"
            type="password"
            color={loginError?"danger":"default"}
            autoCapitalize="none"
            value={password}
            onValueChange={(value) => setPassword(value)}
            autoComplete="password"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <Button className="w-[8rem] mx-auto" disabled={isLoading} onClick={reqLogin}>
          {isLoading && (
            <Spinner className="mr-2 h-4 w-4 animate-spin black" />
          )}
          Anmelden
        </Button>
      </div>
    </div>
  )
}