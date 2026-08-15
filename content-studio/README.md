# KinesoScore Content Studio (Sprint 3)

Free, local weekly publicity pack. **No Remotion Lambda. No auto-post bots.**

## What it does
- Pulls public This Week / All Time leaders (when `.env` has Supabase keys)
- Writes dated caption files + `POSTING.md` checklist under `out/YYYY-MM-DD/`
- You export PNGs from the **same in-app Share Image** users get (premium, not AI slop)
- You schedule 1–2 posts in ≤20 minutes

## Sunday ritual
```bash
npm run content:week
open content-studio/out/$(date -u +%F)/POSTING.md
```

1. Generate pack  
2. In the app: **Share image** → Download Post 4:5 (and Story if you want)  
3. Drop PNGs into that day’s `out/` folder  
4. Schedule with captions from the `.txt` files  

## Optional founder score in captions
```bash
CONTENT_STUDIO_SCORE=86 CONTENT_STUDIO_STRENGTH=78 CONTENT_STUDIO_RUNNING=94 npm run content:week
```

## Brand rules
- Real product data only  
- Same card language as users  
- Soft CTA — “What’s yours?”  
- Never invent athletes or scores  

## Topic library (n8n-ready)
Educational topic catalog with factual context for future automation:

`content-studio/topic-library/` — see its README. Does not change the app UI.

Local HTTP API for n8n: `npm run content:api` → see `content-studio/api/README.md`.
