# Roamigo

**Repo:** https://github.com/InesOps/Roamigo · **Status:** in progress · single commit, March 2026

A travel-planning assistant: a FastAPI backend and a hand-built dashboard for planning
trips, exploring places on a map and tracking a budget. Built with no front-end framework
and no paid APIs — everything geographic comes from OpenStreetMap.

---

## What's actually there

The repository is in two halves, at two different stages.

### The front end — substantial, working, standalone

`app/templates/index.html` plus `app/static/app.js` (~1,400 lines) and `styles.css` (~900
lines) make up a six-page single-page app, written in plain HTML, CSS and JavaScript with
no build step and no framework:

| Page | What it does |
| --- | --- |
| **Dashboard** | Trip overview, budget gauge, activity summary |
| **Chat** | Conversation UI with history, multiple threads, and summaries |
| **Map** | Leaflet map — search a place, drop and manage markers, locate me |
| **Trips** | Trip gallery, create and edit trips, detail view |
| **Itinerary** | Day-by-day plan for the active trip |
| **Settings** | Profile, preferences, light/dark theme |

Notable pieces:

- **Place search without a paid API** — geocoding runs against OpenStreetMap's Nominatim,
  and the map itself is Leaflet. No Google Maps key, no billing account.
- **Everything persists in `localStorage`** behind a small typed key map, with JSON
  read/write helpers that fail safe on corrupt data rather than throwing. Chats, trips,
  markers, budget, profile, preferences, theme and the active selection all survive a
  reload.
- **Leaflet is loaded from a CDN**, so the map init waits for the library to appear
  instead of assuming it's there — the app still renders if the CDN is unreachable.
- Accessibility basics are in place: skip link, ARIA labels on navigation and regions.

### The back end — a clean skeleton, mostly unimplemented

`app/` is a properly layered FastAPI application: routers in `api/`, SQLAlchemy setup in
`core/`, ORM models in `models/`, Pydantic schemas in `schemas/`, and external calls
isolated in `services/`. Dependency injection handles the database session per request.

| Endpoint | State |
| --- | --- |
| `GET /health` | Working |
| `GET /places` | **Working** — queries the OpenStreetMap Overpass API for amenities of a given category in a given city, returning name and coordinates |
| `POST /chat` | Stub — creates a conversation row and echoes its id; no language model wired in yet |
| `POST /itinerary` | Stub — returns a hardcoded two-day Rome itinerary |

The `Conversation` model already carries the fields a real planner would need — country,
city, trip length, budget level — which is where the chat endpoint is heading: extract
those from conversation, then generate an itinerary from them.

---

## Stack

**Back end:** Python · FastAPI · SQLAlchemy · Pydantic · SQLite · Uvicorn
**Front end:** vanilla HTML/CSS/JavaScript · Leaflet
**Data:** OpenStreetMap — Overpass API (places) and Nominatim (geocoding)

---

## Running it

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Interactive API docs at `/docs`. The SQLite file is created on first run.

---

## Honest current state

The two halves aren't connected yet — the front end makes exactly one network call
(geocoding, straight to Nominatim) and never talks to the FastAPI backend. The chat and
itinerary endpoints are placeholders. `requirements.txt` is also missing `requests`, which
`places_service.py` imports.

So: a complete, genuinely usable UI sitting next to a well-structured backend that is
mostly still scaffolding. The next step is wiring the front end to `/places`, then giving
`/chat` something real to do.

---

## What it demonstrates

- Clean separation of concerns in a FastAPI app — routers, services, models and schemas
  each in their own layer, with external HTTP calls isolated behind a service function.
- A large interactive UI built without a framework or a build step, including map
  integration and durable client-side state.
- Choosing free, open data sources over paid APIs, and handling the failure modes that
  come with them.
