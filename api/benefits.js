/**
 * CRUD para benefits (iniciativas con agencias)
 *
 * GET  /api/benefits              → todos
 * GET  /api/benefits?id=X         → uno
 * POST /api/benefits   body=obj   → upsert single
 * POST /api/benefits   body=array → upsert masivo
 * DELETE /api/benefits?id=X       → eliminar
 */
import { sql, cors } from './_db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { method, query, body } = req;

    if (method === 'GET') {
      if (query.id) {
        const rows = await sql`SELECT * FROM benefits WHERE id = ${query.id}`;
        if (!rows.length) return res.status(404).json({ error: 'Benefit not found' });
        return res.status(200).json(rows[0]);
      }
      const rows = await sql`SELECT * FROM benefits ORDER BY fecha_objetivo DESC NULLS LAST, created_at DESC`;
      return res.status(200).json(rows);
    }

    if (method === 'POST') {
      const items = Array.isArray(body) ? body : [body];
      if (!items.length) return res.status(400).json({ error: 'Empty body' });

      let count = 0;
      for (const b of items) {
        if (!b.id || !b.tipo_beneficio || !b.agencia) continue;
        await sql`
          INSERT INTO benefits (id, tipo_beneficio, agencia, tier_agencia, formato, formato_av,
                                pilar, headline, cta_palabra, beneficio_ofrecido, evento,
                                monto_co_inversion, venue, num_invitados, etapa, prioridad,
                                fecha_objetivo, fecha_publicado, owner_tn, owner_agencia,
                                brief_link, link_metricas, notas, custom_fields, metadata, updated_by)
          VALUES (
            ${b.id}, ${b.tipo_beneficio}, ${b.agencia}, ${b.tier_agencia || null},
            ${b.formato || null}, ${b.formato_av || null}, ${b.pilar || null},
            ${b.headline || null}, ${b.cta_palabra || null}, ${b.beneficio_ofrecido || null},
            ${b.evento || null}, ${b.monto_co_inversion || null}, ${b.venue || null},
            ${b.num_invitados || null}, ${b.etapa || 'idea'}, ${b.prioridad || null},
            ${b.fecha_objetivo || null}, ${b.fecha_publicado || null},
            ${b.owner_tn || null}, ${b.owner_agencia || null},
            ${b.brief_link || null}, ${b.link_metricas || null}, ${b.notas || null},
            ${JSON.stringify(b.custom_fields || [])}::jsonb,
            ${JSON.stringify(b.metadata || {})}::jsonb,
            ${b.updated_by || null}
          )
          ON CONFLICT (id) DO UPDATE SET
            tipo_beneficio = EXCLUDED.tipo_beneficio,
            agencia = EXCLUDED.agencia,
            tier_agencia = EXCLUDED.tier_agencia,
            formato = EXCLUDED.formato,
            formato_av = EXCLUDED.formato_av,
            pilar = EXCLUDED.pilar,
            headline = EXCLUDED.headline,
            cta_palabra = EXCLUDED.cta_palabra,
            beneficio_ofrecido = EXCLUDED.beneficio_ofrecido,
            evento = EXCLUDED.evento,
            monto_co_inversion = EXCLUDED.monto_co_inversion,
            venue = EXCLUDED.venue,
            num_invitados = EXCLUDED.num_invitados,
            etapa = EXCLUDED.etapa,
            prioridad = EXCLUDED.prioridad,
            fecha_objetivo = EXCLUDED.fecha_objetivo,
            fecha_publicado = EXCLUDED.fecha_publicado,
            owner_tn = EXCLUDED.owner_tn,
            owner_agencia = EXCLUDED.owner_agencia,
            brief_link = EXCLUDED.brief_link,
            link_metricas = EXCLUDED.link_metricas,
            notas = EXCLUDED.notas,
            custom_fields = EXCLUDED.custom_fields,
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
      await sql`DELETE FROM benefits WHERE id = ${query.id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('Error in /api/benefits:', e);
    return res.status(500).json({ error: e.message });
  }
}
