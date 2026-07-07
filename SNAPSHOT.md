# SNAPSHOT — Voilier MAIN NOIRE (ex-TUTKÜN)

## État au 2026-07-07

**Le site est volontairement HORS LIGNE.** Ce n'est pas un bug.

### Ce qui s'est passé le 2026-07-07
- Constat : le site ne répondait plus (404). Diagnostic : le projet Vercel avait été supprimé manuellement (aucune suppression automatique par Vercel, courriels vérifiés). La suppression remonte probablement à la session de renommage TUTKÜN → MAIN NOIRE du 2026-04-19.
- Le site a été redéployé temporairement (projet `voilier-main-noire`) pour que Thomas accède à l'admin et récupère ce dont il avait besoin.
- Une fois terminé, le projet Vercel a été re-supprimé à la demande de Thomas. URL 404 confirmée.

### Ce qui reste intact
- **Base Supabase** : projet `bjvjbeihvjfaehwpmlkn` vivant, avec les 7 tables (listings, documents, faq, inquiries, pricing_history, youtube_videos, activity_log). Les données n'ont jamais bougé.
- **Code** : repo local + GitHub `ThomasCasault/voilier-tutkun`, branche main propre.
- **Env vars** : `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local` (non commité).

### Remettre le site en ligne (5 minutes)
1. `vercel link --yes --project voilier-main-noire` (recrée le projet)
2. Ajouter les 2 env vars de `.env.local` via `vercel env add` (production, preview, development)
3. `vercel --prod`
4. `vercel git connect` pour les redéploiements auto sur push

### Prochaines étapes
- Aucune. Projet en dormance tant que Thomas ne demande pas de remise en ligne.
