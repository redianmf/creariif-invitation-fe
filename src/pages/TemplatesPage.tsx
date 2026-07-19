import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
}

export function TemplatesPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await api.templates.list(token);
        setTemplates(response || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Choose a template</h1>
            <p className="text-sm text-slate-500">Select a layout for your invitation and continue to checkout.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading templates…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <div key={template.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="h-40 bg-gradient-to-br from-pink-100 via-rose-50 to-slate-100 p-6">
                <div className="h-full rounded-2xl border border-white/70 bg-white/70 p-4">
                  <p className="text-sm font-semibold text-slate-700">{template.category}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{template.name}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600">{template.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <ShoppingBag size={16} /> Rp {template.price.toLocaleString('id-ID')}
                  </div>
                  <button onClick={() => navigate('/checkout', { state: { template } })} className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
