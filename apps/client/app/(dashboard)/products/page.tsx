import { File, PlusCircle } from 'lucide-react';
import { Tabs } from '@/components/molecules/tabs';
import { Button } from '@/components/atoms/button';
import { DataTable } from '@/components/molecules/dataTable';
import { getProducts } from '@/actions/products';

export const metadata = {
  title: 'Crosspost.co.uk | Products',
  description: ''
};

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset)
  );

  const tabs = [
    {
      title: 'All',
      content: (
        <DataTable
          rowData={products}
          offset={newOffset ?? 0}
          totalRows={totalProducts}
        />
      ),
    },
    {
      title: 'Active',
    },
    {
      title: 'Draft',
    },
    {
      title: 'Archived',
      hideOnMobile: true
    },
  ]

  const tabActions = [
    <Button size="sm" variant="outline" className="h-8 gap-1">
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Export
      </span>
    </Button>,
    <Button size="sm" className="h-8 gap-1">
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Product
      </span>
    </Button>
  ]

  return <Tabs tabs={tabs} actions={tabActions} />
}