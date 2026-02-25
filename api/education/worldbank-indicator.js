export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const indicator = url.searchParams.get('indicator') || 'SE.XPD.TOTL.GD.ZS';

  const apiUrl = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&per_page=20000&mrv=1`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  const rows = data[1];

  const cleaned = rows
    .filter(r => r.value !== null)
    .map(r => ({
      country: r.country.value,
      iso3: r.countryiso3code,
      value: r.value,
      year: r.date
    }));

  return new Response(JSON.stringify(cleaned), {
    headers: { 'Content-Type': 'application/json' }
  });
}

