import { Skeleton } from '@/shared/ui/skeleton';

export function PaginaSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando conteúdo" className="space-y-6 py-12">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-12 w-3/4" />
      <div className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
