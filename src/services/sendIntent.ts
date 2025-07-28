export default async function sendIntent(intent: any) {
  const res = await fetch('http://localhost:5000/api/intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intent),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || 'Error enviando la intención');
  }

  return res.json();
}
