import Image from 'next/image';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/atoms/table';
import { SelectProduct } from 'db/schema';
import { deleteProduct } from '@/actions/products';

export const Row = ({ data }: { data: SelectProduct }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={data.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{data.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {data.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${data.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{data.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {data.availableAt.toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
