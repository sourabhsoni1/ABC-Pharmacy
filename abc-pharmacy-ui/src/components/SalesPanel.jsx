import { useState } from 'react';
import { recordSale } from '../api';

export default function SalesPanel({ medicines, sales, onSaleRecorded }) {
  const [medicineId, setMedicineId] = useState('');
  const [qty, setQty] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!medicineId || !qty || parseInt(qty, 10) <= 0) {
      setError('Select a medicine and enter a valid quantity.');
      return;
    }
    setSaving(true);
    try {
      await recordSale(medicineId, parseInt(qty, 10));
      setMedicineId('');
      setQty('');
      onSaleRecorded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <label style={labelStyle}>Medicine</label>
          <select value={medicineId} onChange={e => setMedicineId(e.target.value)} style={inputStyle}>
            <option value="">-- Select --</option>
            {medicines.map(m => (
              <option key={m.id} value={m.id}>{m.fullName} (stock: {m.quantity})</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Quantity Sold</label>
          <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} style={{ ...inputStyle, width: 100 }} />
        </div>
        <button type="submit" disabled={saving} style={btnStyle}>
          {saving ? 'Recording...' : 'Record Sale'}
        </button>
        {error && <span style={{ color: '#dc2626', fontSize: 13 }}>{error}</span>}
      </form>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: '#1e3a5f', color: '#fff', textAlign: 'left' }}>
              <th style={th}>Medicine</th>
              <th style={th}>Qty Sold</th>
              <th style={th}>Price/Unit (₹)</th>
              <th style={th}>Total (₹)</th>
              <th style={th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>
                  No sales recorded yet.
                </td>
              </tr>
            ) : (
              [...sales].reverse().map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={td}>{s.medicineName}</td>
                  <td style={td}>{s.quantitySold}</td>
                  <td style={td}>{Number(s.pricePerUnit).toFixed(2)}</td>
                  <td style={td}>{Number(s.totalPrice).toFixed(2)}</td>
                  <td style={td}>{new Date(s.saleDate).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4, color: '#374151' };
const inputStyle = { padding: '7px 10px', fontSize: 14, border: '1px solid #d1d5db', borderRadius: 4, boxSizing: 'border-box' };
const btnStyle = { padding: '8px 20px', backgroundColor: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' };
const th = { padding: '10px 12px' };
const td = { padding: '9px 12px' };
