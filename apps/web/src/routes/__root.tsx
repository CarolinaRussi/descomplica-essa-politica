import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  type ErrorComponentProps,
} from '@tanstack/react-router';
import { Button } from '@/shared/ui/button';
import { Toaster } from '@/shared/ui/sonner';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: LayoutRaiz,
  errorComponent: ErroPagina,
});

function LayoutRaiz() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <header className="border-b">
        <div aria-hidden="true" className="h-1 bg-indigo-fade" />
        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
          <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
            Descomplica Essa Política
          </Link>
        </div>
      </header>
      <main id="conteudo" className="mx-auto max-w-5xl px-6">
        <Outlet />
      </main>
      <Toaster position="bottom-center" />
    </>
  );
}

function ErroPagina({ reset }: ErrorComponentProps) {
  return (
    <div role="alert" className="mx-auto max-w-xl py-24 text-center">
      <h1 className="text-3xl">Não foi possível carregar esta página</h1>
      <p className="mt-3 text-muted-foreground">
        Verifique sua conexão e tente novamente. Se o problema continuar, volte em alguns minutos.
      </p>
      <Button className="mt-8" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  );
}
