const BASE = '/api';

export async function getMedicines() {
  const res = await fetch(`${BASE}/medicines`);
  if (!res.ok) throw new Error('Failed to fetch medicines');
  return res.json();
}

export async function addMedicine(medicine) {
  const res = await fetch(`${BASE}/medicines`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicine),
  });
  if (!res.ok) throw new Error('Failed to add medicine');
  return res.json();
}

export async function getSales() {
  const res = await fetch(`${BASE}/sales`);
  if (!res.ok) throw new Error('Failed to fetch sales');
  return res.json();
}

export async function recordSale(medicineId, quantitySold) {
  const res = await fetch(`${BASE}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ medicineId, quantitySold }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to record sale');
  }
  return res.json();
}
