import { useState } from 'react';
import { addMedicine } from '../api';

const empty = { fullName: '', notes: '', expiryDate: '', quantity: '', price: '', brand: '' };

export default function AddMedicineForm({ onAdded }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.expiryDate || !form.quantity || !form.price || !form.brand) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    try {
      await addMedicine({
        ...form,
        quantity: parseInt(form.quantity, 10),
        price: parseFloat(form.price),
      });
      setForm(empty);
      onAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', maxWidth: 640 }}>
      <Field label="Full Name" required name="fullName" value={form.fullName} onChange={handle} />
      <Field label="Brand" required name="brand" value={form.brand} onChange={handle} />
      <Field label="Expiry Date" required name="expiryDate" type="date" value={form.expiryDate} onChange={handle} />
      <Field label="Quantity" required name="quantity" type="number" min="0" value={form.quantity} onChange={handle} />
      <Field label="Price" required name="price" type="number" min="0" step="0.01" value={form.price} onChange={handle} />
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handle}
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>
      {error && <p style={{ gridColumn: '1/-1', color: '#dc2626', margin: 0, fontSize: 13 }}>{error}</p>}
      <div style={{ gridColumn: '1/-1' }}>
        <button type="submit" disabled={saving} style={btnStyle}>
          {saving ? 'Adding...' : 'Add Medicine'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', required, ...rest }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: '#dc2626', marginLeft: 2 }}>*</span>}
      </label>
      <input name={name} type={type} required={required} style={inputStyle} {...rest} />
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4, color: '#374151' };
const inputStyle = { width: '100%', padding: '7px 10px', fontSize: 14, border: '1px solid #d1d5db', borderRadius: 4, boxSizing: 'border-box' };
const btnStyle = { padding: '8px 20px', backgroundColor: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' };
