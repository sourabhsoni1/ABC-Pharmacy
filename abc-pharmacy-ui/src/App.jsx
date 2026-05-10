import { useEffect, useState, useCallback } from 'react';
import { getMedicines, getSales } from './api';
import MedicineGrid from './components/MedicineGrid';
import AddMedicineForm from './components/AddMedicineForm';
import SalesPanel from './components/SalesPanel';
import './App.css';

const TABS = ['Medicines', 'Add Medicine', 'Sales'];

export default function App() {
  const [tab, setTab] = useState('Medicines');
  const [medicines, setMedicines] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [meds, sls] = await Promise.all([getMedicines(), getSales()]);
      setMedicines(meds);
      setSales(sls);
    } catch {
      setError('Could not connect to the API. Make sure the backend is running on port 5284.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ backgroundColor: '#1e3a5f', color: '#fff', padding: '14px 32px' }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>ABC Pharmacy</h1>
      </header>

      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 32px', display: 'flex', gap: 0 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? '#1e3a5f' : '#6b7280',
              borderBottom: tab === t ? '2px solid #1e3a5f' : '2px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </nav>

      <main style={{ padding: '24px 32px', maxWidth: 1100, margin: '0 auto' }}>
        {loading && <p style={{ color: '#6b7280' }}>Loading...</p>}
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}

        {!loading && !error && (
          <>
            {tab === 'Medicines' && (
              <section>
                <h2 style={sectionTitle}>Medicine List</h2>
                <MedicineGrid medicines={medicines} />
              </section>
            )}
            {tab === 'Add Medicine' && (
              <section>
                <h2 style={sectionTitle}>Add New Medicine</h2>
                <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                  <AddMedicineForm onAdded={() => { load(); setTab('Medicines'); }} />
                </div>
              </section>
            )}
            {tab === 'Sales' && (
              <section>
                <h2 style={sectionTitle}>Sales Records</h2>
                <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                  <SalesPanel
                    medicines={medicines}
                    sales={sales}
                    onSaleRecorded={load}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

const sectionTitle = { fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#111827' };
