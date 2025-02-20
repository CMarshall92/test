import {
  Card as CardAtom,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/atoms/card';
import { ReactNode } from 'react';

export const Card = ({ title, description, content }: { title: string; description?: string; content?: ReactNode }) => (
  <CardAtom>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {content && (
      <CardContent>
        {content}
      </CardContent>
    )}
  </CardAtom>
)