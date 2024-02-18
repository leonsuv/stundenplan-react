import { Link } from "@nextui-org/react";
import UserAuthForm from "./UserAuthForm";
import PhwtLogo from "@/components/PhwtLogo";
import { WavyBackground } from "@/components/ui/wavy-background";

export function Login() {
  return (
    <>
      <div className="container overflow-hidden relative min-h-screen max-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 p-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:w-[30rem]">
            <WavyBackground className="relative z-0" canvasClassName="absolute">
              <div className="flex flex-col space-y-2 text-center justify-center items-center">
                <PhwtLogo />
                <h1 className="text-2xl font-semibold tracking-tight pb-4">
                  Anmleden beim Stundenplan
                </h1>
              </div>
              <UserAuthForm />
              <p className="pt-4 text-center text-sm text-muted-foreground">
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

            </WavyBackground>
          </div>
        </div>
      </div>
    </>
  )
}