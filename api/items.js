/**
 * CRUD para items (acciones + comunicaciones)
 *
 * GET  /api/items                  → todos los items
 * GET  /api/items?id=X             → un item específico
 * POST /api/items     body=object  → upsert single item
 * POST /api/items     body=array   → upsert masivo
 * DELETE /api/items?id=X           → eliminar un item
 */
import { sql, cors } from './_db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { method, query, body } = req;

    if (method === 'GET') {
      if (query.id) {
        const rows = await sql`SELECT * FROM items WHERE id = ${query.id}`;
        if (!rows.length) return res.status(404).json({ error: 'Item not found' });
        return res.status(200).json(rows[0]);
      }
      const rows = await sql`SELECT * FROM items ORDER BY fecha DESC NULLS LAST, created_at DESC`;
      return res.status(200).json(rows);
    }

    if (method === 'POST') {
      const items = Array.isArray(body) ? body : [body];
      if (!items.length) return res.status(400).json({ error: 'Empty body' });

      let count = 0;
      for (const it of items) {
        if (!it.id || !it.tipo || !it.titulo) {
          continue; // skip inválidos pero no aborta
        }
        await sql`
          INSERT INTO items (id, tipo, categoria, tag, titulo, fecha, fecha_fin, cluster,
                             audiencia, canales, formato, pilar, contenido, copy, status,
                             prioridad, owners, links, comentarios, aprobador,
                             facturado, cobrado, kpis, metadata, updated_by)
          VALUES (
            ${it.id}, ${it.tipo}, ${it.categoria || null}, ${it.tag || null}, ${it.titulo},
            ${it.fecha || null}, ${it.fecha_fin || null}, ${it.cluster || null},
            ${JSON.stringify(it.audiencia || [])}::jsonb,
            ${JSON.stringify(it.canales || [])}::jsonb,
            ${it.formato || null}, ${it.pilar || null}, ${it.contenido || null}, ${it.copy || null},
            ${it.status || 'backlog'}, ${it.prioridad || null},
            ${JSON.stringify(it.owners || [])}::jsonb,
            ${JSON.stringify(it.links || [])}::jsonb,
            ${it.comentarios || null}, ${it.aprobador || null},
            ${it.facturado ?? null}, ${it.cobrado ?? null},
            ${JSON.stringify(it.kpis || {})}::jsonb,
            ${JSON.stringify(it.metadata || {})}::jsonb,
            ${it.updated_by || null}
          )
          ON CONFLICT (id) DO UPDATE SET
            tipo = EXCLUDED.tipo,
            categoria = EXCLUDED.categoria,
            tag = EXCLUDED.tag,
            titulo = EXCLUDED.titulo,
            fecha = EXCLUDED.fecha,
            fecha_fin = EXCLUDED.fecha_fin,
            cluster = EXCLUDED.cluster,
            audiencia = EXCLUDED.audiencia,
            canales = EXCLUDED.canales,
            formato = EXCLUDED.formato,
            pilar = EXCLUDED.pilar,
            contenido = EXCLUDED.contenido,
            copy = EXCLUDED.copy,
            status = EXCLUDED.status,
            prioridad = EXCLUDED.prioridad,
            owners = EXCLUDED.owners,
            links = EXCLUDED.links,
            comentarios = EXCLUDED.comentarios,
            aprobador = EXCLUDED.aprobador,
            facturado = EXCLUDED.facturado,
            cobrado = EXCLUDED.cobrado,
            kpis = EXCLUDED.kpis,
            metadata = EXCLUDED.metadata,
            updated_by = EXCLUDED.updated_by,
            updated_at = NOW()
        `;
        count++;
      }
      return res.status(200).json({ ok: true, count });
    }

    if (method === 'DELETE') {
      if (!query.id) return res.status(400).json({ error: 'Missing id' });
      await sql`DELETE FROM items WHERE id = ${query.id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('Error in /api/items:', e);
    return res.status(500).json({ error: e.message });
  }
}
