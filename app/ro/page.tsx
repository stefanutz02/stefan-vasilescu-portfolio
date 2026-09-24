import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('ro');

export default function Page() {
  return <HomePage lang="ro" />;
}
