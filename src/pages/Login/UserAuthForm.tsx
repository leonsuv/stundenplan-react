import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/AppContext";
import { login } from "@/data/ApiWrapper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input, Spinner } from "@nextui-org/react";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function UserAuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState<boolean>(false);
  localStorage.setItem("persist", "true");
  const [, setAuthtoken] = useLocalStorage("authToken", "Bearer ");
  const [, setRefreshtoken] = useLocalStorage("refreshToken", "Bearer ");
  const { setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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
    setLoggedIn(true)

    navigate("/");
  }
  return (
    <div className={"grid gap-6"}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="username">
            Benutzername
          </Label>
          <Input
            id="username"
            placeholder="m.mustermann"
            type="username"
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="password">
            Passwort
          </Label>
          <Input
            id="password"
            placeholder="**********"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} onClick={reqLogin}>
          {isLoading && (
            <Spinner className="mr-2 h-4 w-4 animate-spin black" />
          )}
          Anmelden
        </Button>
      </div>
    </div>
  )
}