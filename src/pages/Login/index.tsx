import { AppContext } from "@/context/AppContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button, Input } from "@nextui-org/react";
import { useContext } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";


export function Login() {
  const [username, setUsername ] = useLocalStorage("username", "");
  const [password, setPassword ] = useLocalStorage("password", "");
  localStorage.setItem("persist", "true");
  const [ authtoken, setAuthtoken ] = useLocalStorage("authToken", "Bearer ");
  const [ refreshtoken, setRefreshtoken ] = useLocalStorage("refreshToken", "Bearer ");
  const { isLoggedIn, setLoggedIn } = useContext(AppContext);
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
        // Handle authentication error here
        console.error("Authentication failed");
        return;
      }

      const data = await response.json();

      // Assuming your API response contains access_token and refresh_token
      setUsername("");
      setPassword("");
      setAuthtoken(`Bearer ${data.access_token}`);
      setRefreshtoken(`Bearer ${data.refresh_token}`);
      setLoggedIn(true)

      // Optionally, you may want to do something else on successful login
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div>
      <Input value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="username"
        label="Benutzername"
        placeholder="m.mustermann" />
      <Input value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label="Passwort"
        placeholder="***********" />
      <Button onClick={reqLogin}>Login</Button>
    </div>
  )
}