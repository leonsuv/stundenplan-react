import { Link } from "@nextui-org/react";
import UserAuthForm from "./UserAuthForm";
import PhwtLogo from "@/components/PhwtLogo";

export function Login() {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="hidden md:inline absolute right-4 top-4 md:right-8 md:top-8">
            <PhwtLogo/>
          </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div>

          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Dieses Projekt wurde von{" "}
              <Link
                href="https://github.com/leonsuv/stundenplan-react"
                className="underline underline-offset-4 hover:text-gray-500 text-blue-400"
              >
                Leon Suvorkov 
              </Link>{" "}
              Entwickelt
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center justify-center items-center">
              <PhwtLogo/>
              <h1 className="text-2xl font-semibold tracking-tight">
                Anmleden beim Stundenplan
              </h1>
              <p className="text-sm text-muted-foreground">
                Zum fortfahren Benutzerdaten angeben.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Mit dem Klicken auf Anmelden, nehmen Sie die{" "}
              <Link
                href="https://ilias.phwt.de"
                className="underline underline-offset-4 hover:text-primary"
              >
                Interne Benutzerrichtlinie 
              </Link>{" "}
              und{" "}
              <Link
                href="https://www.phwt.de/datenschutz/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Datenschutzerklärung
              </Link>
              {" "} der PHWT an.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}