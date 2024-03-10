import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import PhwtLogo from "./PhwtLogo";
import { useLocation } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { loggedOutBearer } from "@/lib/utils";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { setLoggedIn } = useContext(AppContext);
  const [ , setAuthtoken] = useLocalStorage("authToken", loggedOutBearer);
  const [ , setRefreshtoken] = useLocalStorage("refreshToken", loggedOutBearer);

  function logOut() {
    setLoggedIn(false);
    setAuthtoken(loggedOutBearer);
    setRefreshtoken(loggedOutBearer)
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="absolute h-[4rem]"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <PhwtLogo />
        </NavbarBrand>
        <NavbarItem isActive={location.pathname === "/"}>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/about"}>
          <Link href="/about" aria-current="page">
            About
          </Link>
        </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem key="Logout">
          <Button
            color="primary"
            href="/login"
            as={Link}
            size="md"
            className=""
            onClick={logOut}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <PhwtLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu className="bg-primary">
        <NavbarMenuItem key="Home">
          <Link
            className="w-full"
            color="secondary"
            href="/"
            size="lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}

          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="About">
          <Link
            className="w-full"
            color="secondary"
            href="/about"
            size="lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            About
          </Link>
        </NavbarMenuItem>
        <Spacer/>
        <NavbarMenuItem key="Logout">
          <Link
            className="w-full"
            color="danger"
            href="/login"
            size="lg"
            onClick={logOut}
          >
            Logout
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}