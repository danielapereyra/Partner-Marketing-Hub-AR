/**
 * CRUD para library_items (biblioteca de templates / briefs / links / cases)
 *
 * GET /api/library                → todos
 * GET /api/library?tab=templates  → filtrado por tab
 * POST /api/library  body=obj/arr → upsert single/masivo
 * DELETE /api/library?id=X        → eliminar
 */
import { sql, cors } from './_db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { method, query, body } = req;

    if (method === 'GET') {
      if (query.id) {
        const rows = await sql`SELECT * FROM library_items WHERE id = ${query.id}`;
        if (!rows.length) return res.status(404).json({ error: 'Item not found' });
        return res.status(200).json(rows[0]);
      }
      if (query.tab) {
        const rows = await sql`SELECT * FROM library_items WHERE tab = ${query.tab} ORDER BY created_at DESC`;
        return res.status(200).json(rows);
      }
      const rows = await sql`SELECT * FROM library_items ORDER BY tab, created_at DESC`;
      return res.status(200).json(rows);
    }

    if (method === 'POST') {
      const items = Array.isArray(body) ? body : [body];
      if (!items.length) return res.status(400).json({ error: 'Empty body' });

      let count = 0;
      for (const it of items) {
        if (!it.id || !it.tab || !it.titulo) continue;
        await sql`
          INSERT INTO library_items (id, tab, titulo, description, content, url, metricas,
                                      fecha, icon, tipo, size, usos, metadata)
          VALUES (
            ${it.id}, ${it.tab}, ${it.titulo}, ${it.description || it.desc || null},
            ${it.content || null}, ${it.url || null}, ${it.metricas || null},
            ${it.fecha || null}, ${it.icon || null}, ${it.tipo || null}, ${it.size || null},
            ${it.usos || null},
            ${JSON.stringify(it.metadata || {})}::jsonb
          )
          ON CONFLICT (id) DO UPDATE SET
            tab = EXCLUDED.tab,
            titulo = EXCLUDED.titulo,
            description = EXCLUDED.description,
            content = EXCLUDED.content,
            url = EXCLUDED.url,
            metricas = EXCLUDED.metricas,
            fecha = EXCLUDED.fecha,
            icon = EXCLUDED.icon,
            tipo = EXCLUDED.tipo,
            size = EXCLUDED.size,
            usos = EXCLUDED.usos,
            metadata = EXCLUDED.metadata,
            updated_at = NOW()
        `;
        count++;
      }
      return res.status(200).json({ ok: true, count });
    }

    if (method === 'DELETE') {
      if (!query.id) return res.status(400).json({ error: 'Missing id' });
      await sql`DELETE FROM library_items WHERE id = ${query.id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('Error in /api/library:', e);
    return res.status(500).json({ error: e.message });
  }
}
