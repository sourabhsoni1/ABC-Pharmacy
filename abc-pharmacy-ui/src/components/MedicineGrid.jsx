import { useState } from 'react';

const MS_PER_DAY = 1000 * 60 * 60 * 24; //Miliseconds per day

function rowStyle(medicine) {
  const daysUntilExpiry = (new Date(medicine.expiryDate) - new Date()) / MS_PER_DAY; //Subtracting two dates in JS gives the difference in millisecond and dividing it with MS_PER_DAY to convert it to days
  if (daysUntilExpiry < 30) return { backgroundColor: '#fca5a5' };
  if (medicine.quantity < 10) return { backgroundColor: '#fde68a' };
  return {};
}

export default function MedicineGrid({ medicines }) {
  const [search, setSearch] = useState('');

  const filtered = medicines.filter(m =>
    m.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 12, padding: '6px 10px', width: 260, fontSize: 14 }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: '#1e3a5f', color: '#fff', textAlign: 'left' }}>
              <th style={th}>Full Name</th>
              <th style={th}>Brand</th>
              <th style={th}>Expiry Date</th>
              <th style={th}>Quantity</th>
              <th style={th}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>
                  No medicines found.
                </td>
              </tr>
            ) : (
              filtered.map(m => (
                <tr key={m.id} style={{ ...rowStyle(m), borderBottom: '1px solid #e5e7eb' }}>
                  <td style={td}>{m.fullName}</td>
                  <td style={td}>{m.brand}</td>
                  <td style={td}>{new Date(m.expiryDate).toLocaleDateString()}</td>
                  <td style={td}>{m.quantity}</td>
                  <td style={td}>{Number(m.price).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280', display: 'flex', gap: 16 }}>
        <span><span style={{ background: '#fca5a5', padding: '2px 8px', borderRadius: 3 }}>&nbsp;</span> Expires within 30 days</span>
        <span><span style={{ background: '#fde68a', padding: '2px 8px', borderRadius: 3 }}>&nbsp;</span> Stock &lt; 10</span>
      </div>
    </div>
  );
}

const th = { padding: '10px 12px' };
const td = { padding: '9px 12px' };
