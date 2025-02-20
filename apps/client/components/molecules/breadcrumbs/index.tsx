'use client'

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/atoms/breadcrumb';
import { capitalizeFirstLetter, slugify } from '@/lib/string';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const routeNames = pathname
    ?.split('/')
    ?.map((value: string) => capitalizeFirstLetter(value))
    .filter(Boolean)

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {routeNames.map((name: string, index: number) => {
          const routeLinks = routeNames.slice(0, index + 1)
          const createUrl = routeLinks.join('/').toLocaleLowerCase();
          
          return (
          <React.Fragment key={slugify(name)}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${createUrl}`}>{name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {(index < (routeNames.length - 1)) && <BreadcrumbSeparator />}
          </React.Fragment>
        )})}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
