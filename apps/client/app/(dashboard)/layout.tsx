import { DesktopNavigation, MobileNavigation } from '@/components/molecules/navigation';
import { Breadcrumbs } from '@/components/molecules/breadcrumbs';
import { User } from '@/components/molecules/userMenu';
import { SearchInput } from '@/components/molecules/pageSearch';
import Providers from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  
  if (session?.user.verified === false || session?.user.subscriptionActive === false) {
    redirect('/onboarding')
  }

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNavigation />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNavigation />
            <Breadcrumbs />
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}