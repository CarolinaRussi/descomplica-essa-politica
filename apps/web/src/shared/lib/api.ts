const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export const api = async <Resposta>(caminho: string, init?: RequestInit): Promise<Resposta> => {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!resposta.ok) {
    throw new ApiError(resposta.status, `Falha ao acessar ${caminho} (${resposta.status})`);
  }

  return resposta.json() as Promise<Resposta>;
};
