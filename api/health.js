/**
 * Health check endpoint
 * GET /api/health → confirma que la conexión a la DB funciona y devuelve conteos
 *
 * Útil para debuggear: si esto responde 200 con conteos, todo está OK.
 */
import { sql, cors } from './_db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const [items] = await sql`SELECT COUNT(*)::int AS c FROM items`;
    const [benefits] = await sql`SELECT COUNT(*)::int AS c FROM benefits`;
    const [library] = await sql`SELECT COUNT(*)::int AS c FROM library_items`;
    const [config] = await sql`SELECT COUNT(*)::int AS c FROM hub_config`;

    return res.status(200).json({
      ok: true,
      ts: new Date().toISOString(),
      counts: {
        items: items.c,
        benefits: benefits.c,
        library_items: library.c,
        config: config.c,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
