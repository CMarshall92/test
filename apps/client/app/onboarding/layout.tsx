'use client'

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathName = usePathname()
  
  if (session?.user.verified === false && pathName !== '/onboarding/verify') {
    redirect('/onboarding/verify')
  }

  if (session?.user.verified === true && session?.user.subscriptionActive === false && pathName !== '/onboarding/pricing') {
    redirect('/onboarding/pricing')
  }

  if (session?.user.verified === true && session?.user.subscriptionActive === true && pathName !== '/') {
    redirect('/')
  }

  return children
}