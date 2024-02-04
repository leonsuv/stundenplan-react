import { AppContext } from "@/context/AppContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [username, setUsername ] = useLocalStorage("username", "");
  const [password, setPassword ] = useLocalStorage("password", "");
  const [loginError, setLoginError] = useState<boolean>(false);
  localStorage.setItem("persist", "true");
  const [ authtoken, setAuthtoken ] = useLocalStorage("authToken", "Bearer ");
  const [ refreshtoken, setRefreshtoken ] = useLocalStorage("refreshToken", "Bearer ");
  const { setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  async function reqLogin() {
    try {
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://app.phwt.de/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Encode username and password
        },
      });

      if (!response.ok) {
        setLoginError(true);
        return;
      }

      const data = await response.json();

      setUsername("");
      setPassword("");
      setAuthtoken(`Bearer ${data.access_token}`);
      setRefreshtoken(`Bearer ${data.refresh_token}`);
      setLoggedIn(true)

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div>
      <Input value={username}
        onChange={(e) => {setUsername(e.target.value); setLoginError(false)}}
        type="username"
        label="Benutzername"
        placeholder="m.mustermann"
        isRequired
        isInvalid={loginError}
        />
      <Input value={password}
        onChange={(e) => {setPassword(e.target.value); setLoginError(false)}}
        type="password"
        label="Passwort"
        placeholder="***********"
        isRequired
        isInvalid={loginError}
        />
      <Button onClick={reqLogin}>Login</Button>
    </div>
  )
}