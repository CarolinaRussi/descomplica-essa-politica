import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from '@/shared/lib/queryClient';
import { PaginaSkeleton } from '@/shared/PaginaSkeleton';
import { routeTree } from './routeTree.gen';
import '@/styles/index.css';

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPendingComponent: PaginaSkeleton,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const elementoRaiz = document.getElementById('root');
if (!elementoRaiz) throw new Error('Elemento #root não encontrado');

createRoot(elementoRaiz).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
