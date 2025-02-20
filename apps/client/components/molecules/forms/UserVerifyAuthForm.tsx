'use client'

import { handleVerification } from "@/actions/auth";
import { Button } from "@/components/atoms/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/atoms/otpInput";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

export const UserVerifyAuthForm = () => {
  const { data: session, update  } = useSession();
  const searchParams  = useSearchParams();
  const code = searchParams.get("code");
  const [value, setValue] = useState(code || "")
  const [warning, setWarning] = useState<string|null>(null)
  
  return (
    <div className="flex flex-col items-center gap-5">
      <InputOTP
        value={value}
        onChange={(value) => setValue(value)}
        maxLength={6}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-md text-red-500 text-center">
        {warning}
      </p>
      <Button 
        onClick={async () => {
          const response = await handleVerification(value, session?.user.id)

          if (response.status !== 200) {
            setValue("")
            setWarning(response.message)
          }

          await update()
          redirect('/onboarding/pricing')
        }} 
        className="w-full"
      >
        Complete Verification
      </Button>
    </div>
  )
}