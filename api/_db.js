/**
 * Cliente Neon Postgres compartido.
 * Se importa desde los otros endpoints (api/items.js, api/benefits.js, etc.)
 *
 * Vercel inyecta automáticamente la URL de la DB en una de estas variables de entorno.
 * Probamos en este orden hasta encontrar una válida.
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  process.env.STORAGE_URL ||
  process.env.POSTGRES_PRISMA_URL;

if (!DATABASE_URL) {
  console.error('⚠️ No se encontró ninguna variable de entorno con la URL de la DB. Revisar Settings → Environment Variables.');
}

export const sql = neon(DATABASE_URL);

/** Helper para devolver respuestas con CORS abierto (intranet TN) */
export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
