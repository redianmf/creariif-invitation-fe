import { useCheckoutService } from './checkout.service';

export function CheckoutPage() {
  const { selectedTemplate, loading, error, handleCheckout } = useCheckoutService();

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
      <p className="mt-2 text-sm text-slate-600">Finalize your selected template and create the first invitation order.</p>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">Selected template</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedTemplate?.name || 'No template selected'}</h2>
        <p className="mt-2 text-sm text-slate-600">Price: Rp {selectedTemplate?.price?.toLocaleString('id-ID') || '0'}</p>
      </div>

      <button onClick={handleCheckout} disabled={loading} className="mt-8 rounded-full bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Processing…' : 'Continue to payment'}
      </button>
    </div>
  );
}
