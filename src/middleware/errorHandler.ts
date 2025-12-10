// errorMiddleware.ts
import { HttpError } from "./HttpErrors";

export function errorHandler(err: any, req: any, res: any, next: any) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Erro interno" });
}
