import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/AppContext";
import { getRefresh, login } from "@/data/ApiWrapper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { loggedOutBearer } from "@/lib/utils";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeyDown } from "@/hooks/useKeyDown"


export default function UserAuthForm() {
  const { setLoggedIn } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [, setAuthtoken] = useLocalStorage("authToken", loggedOutBearer);
  const [refreshToken, setRefreshtoken] = useLocalStorage("refreshToken", loggedOutBearer);
  useKeyDown(() => { reqLogin() }, ["Enter"]);
  const [persist, setPersist] = useState<boolean>(localStorage.getItem("persist") === "true");
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem("persist", persist ? "true" : "false");
  }, [persist])


  useEffect(() => {
    if (persist && refreshToken !== loggedOutBearer) {
      try {
        getRefresh(refreshToken).then((res) => {
          if (!res) return;
          setLoggedIn(true);
          navigate("/");
        })
      } catch (error) {
        setRefreshtoken(loggedOutBearer);
        setAuthtoken(loggedOutBearer);
      }
    }
  }, [])

  function reqLogin() {
    setIsLoading(true);
    login(username, password).then((data) => {
      uiLogin(data);
    }).catch(() => {
      setIsLoading(false);
      setLoginError(true);
    });
  }
  function uiLogin(data: { access_token: string; refresh_token: string; }) {
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
            color={loginError ? "danger" : "default"}
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
            color={loginError ? "danger" : "default"}
            autoCapitalize="none"
            value={password}
            onValueChange={(value) => setPassword(value)}
            autoComplete="password"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <Button className="w-[8rem] mx-auto" disabled={isLoading} onClick={reqLogin}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin black" />}
          Anmelden
        </Button>
        <Checkbox className="w-[14rem] mx-auto" isSelected={persist} onValueChange={setPersist}>Angemeldet bleiben</Checkbox>
      </div>
    </div>
  )
}