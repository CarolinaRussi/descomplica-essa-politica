import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: PaginaInicial,
});

const modulos = [
  { titulo: 'Educação Política Básica', descricao: 'Três Poderes e esferas de governo.' },
  { titulo: 'História dos Presidentes', descricao: 'Linha do tempo da República.' },
  { titulo: 'Quiz de Votações', descricao: 'Compare suas posições com votações reais.' },
  { titulo: 'Tradução do Juridiquês', descricao: 'Termos legislativos em linguagem direta.' },
];

function PaginaInicial() {
  return (
    <section className="py-16 sm:py-24">
      <p className="text-sm font-medium tracking-widest text-accent uppercase">
        Dados, fatos e transparência
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">
        Política brasileira sem enrolação, com fontes que você pode conferir.
      </h1>

      <div className="mt-12 rounded-md bg-indigo-fade px-5 py-6 text-primary-foreground">
        <p className="max-w-md font-serif text-2xl leading-snug">
          O índigo atravessa a edição. O lacre marca o fato do dia.
        </p>
      </div>

      <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
        {modulos.map((modulo) => (
          <li key={modulo.titulo} className="bg-card p-6">
            <h2 className="text-xl">{modulo.titulo}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{modulo.descricao}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
