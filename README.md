# Supabase React Sales Dashboard

A lightweight React + Vite dashboard that visualizes sales deal totals from a Supabase Postgres table in real time.

## Features

- React 19 + Vite frontend
- Supabase JS client for database access and realtime updates
- Sales totals grouped by deal name
- Form for inserting new sales deals into Supabase
- Live updates via Postgres change subscriptions

## What it does

This project connects to a Supabase project and reads from a `sales_deals` table. It aggregates deal values by name, displays totals in a line chart, and refreshes automatically when new deals are added.

The dashboard also includes a simple form so users can add new deals. New entries are inserted into Supabase and the chart updates immediately through the realtime subscription.

## Project structure

- `src/main.tsx` – React entry point
- `src/App.tsx` – Renders the header and dashboard
- `src/Header.tsx` – App header UI
- `src/Dashboard.tsx` – Fetches aggregated data and renders the chart
- `src/Form.tsx` – Submit form for adding new deals
- `src/supabase-client.ts` – Supabase client setup using environment variables

## Environment variables

The app expects the following environment variables in a `.env` file or your shell environment:

- `VITE_SUPABASE_URL` – your Supabase project URL
- `VITE_SUPABASE_KEY` – your Supabase anon/public key

Example `.env`:

```env
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_KEY=public-anon-key
```

## Requirements

- Node.js 18+ (or compatible)
- `pnpm` installed
- Supabase project with a `sales_deals` table

## Installation

```bash
pnpm install
```

## Run locally

```bash
pnpm dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
pnpm build
```

## Preview production build

```bash
pnpm preview
```

## Notes

- The app uses Supabase realtime subscriptions to refresh the chart when rows change in the `sales_deals` table.
- The form selects from the current agent names in the fetched metrics and submits a new deal amount for the selected name.

## License

This repository is currently private and unlicensed.
