/**
 * CRUD para configuración global del Hub
 * Almacena settings clave/valor: tipos de iniciativa, labels de biblioteca, caps mensuales, etc.
 *
 * GET  /api/config           → todo el config
 * GET  /api/config?key=X     → un setting específico
 * POST /api/config  body={key,value} → set/update
 * DELETE /api/config?key=X   → eliminar setting
 */
import { sql, cors } from './_db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { method, query, body } = req;

    if (method === 'GET') {
      if (query.key) {
        const rows = await sql`SELECT * FROM hub_config WHERE key = ${query.key}`;
        if (!rows.length) return res.status(404).json({ error: 'Config key not found' });
        return res.status(200).json(rows[0]);
      }
      const rows = await sql`SELECT * FROM hub_config ORDER BY key`;
      // Devolver como objeto {key: value} para uso fácil del cliente
      const out = {};
      for (const r of rows) out[r.key] = r.value;
      return res.status(200).json(out);
    }

    if (method === 'POST') {
      const items = Array.isArray(body) ? body : [body];
      let count = 0;
      for (const c of items) {
        if (!c.key) continue;
        await sql`
          INSERT INTO hub_config (key, value)
          VALUES (${c.key}, ${JSON.stringify(c.value)}::jsonb)
          ON CONFLICT (key) DO UPDATE SET
            value = EXCLUDED.value,
            updated_at = NOW()
        `;
        count++;
      }
      return res.status(200).json({ ok: true, count });
    }

    if (method === 'DELETE') {
      if (!query.key) return res.status(400).json({ error: 'Missing key' });
      await sql`DELETE FROM hub_config WHERE key = ${query.key}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('Error in /api/config:', e);
    return res.status(500).json({ error: e.message });
  }
}
