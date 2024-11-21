export const revalidate = 0

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CategoryClient } from '@/components/tables/category-tables/client';
import { Category } from '@/models/Category';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Categories', link: '/dashboard/categories' }
];
export default async function page() {
  const data = await Category.find()
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryClient data={data} />
      </div>
    </PageContainer>
  );
}
