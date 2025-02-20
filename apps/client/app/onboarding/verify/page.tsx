import { Icons } from "@/components/atoms/icons";
import { UserVerifyAuthForm } from "@/components/molecules/forms/UserVerifyAuthForm";
import { Suspense } from "react";

export const metadata = {
  title: 'Crosspost.co.uk | Verify Account',
  description: ''
};

export default function VerifyPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[375px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-md text-muted-foreground">
              lets get you account verified, enter the code you recieved in the email & click continue to complete verifiaction
            </p>
          </div>
          <Suspense>
            <UserVerifyAuthForm />
          </Suspense>
        </div>
      </div>
      
      <div className="hidden lg:block relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1726137569888-ce43cc13e414?fm=jpg&q=60&w=3000"
          alt="Promo"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}