import { Tabs as TabsAtom, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { ReactNode } from 'react';
import { slugify } from '@/lib/string';
import React from 'react';
import { nanoid } from 'nanoid';

export interface TabType {
  title: string,
  content?: ReactNode | null
  hideOnMobile?: boolean 
}

interface Props {
  tabs: TabType[];
  actions: ReactNode[];
  defaultTabIndex?: number;
}

export const Tabs = ({ defaultTabIndex, actions = [], tabs = [] }: Props) => (
  <TabsAtom
    defaultValue={
      defaultTabIndex 
        ? slugify(tabs?.[defaultTabIndex]?.title || "") 
        : slugify(tabs?.[0]?.title || "")
    }
  >
    <div className="flex items-center">
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger
            key={slugify(tab.title)} 
            value={slugify(tab.title)} 
            className={tab.hideOnMobile ? "hidden sm:flex" : ""}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="ml-auto flex items-center gap-2">
        {actions.map((action: ReactNode) => (
          <React.Fragment key={nanoid()}>
            {action}
          </React.Fragment>
        ))}
      </div>
    </div>
    {tabs.map(tab => (
      <TabsContent key={slugify(tab.title)} value={slugify(tab.title)}>
        {tab.content}
      </TabsContent>
    ))}
  </TabsAtom>
)