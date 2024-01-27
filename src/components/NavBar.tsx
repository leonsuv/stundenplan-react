import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { PhwtLogo } from "./PhwtLogo";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-slate-100"
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

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <PhwtLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem key="Home">
          <Link
            className="w-full"
            color="foreground"
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
            color="foreground"
            href="/about"
            size="lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            About
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}