import { useCheckoutService } from './checkout.service';
import { useI18n } from '../../shared/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CheckoutPage() {
  const { selectedTemplate, loading, error, handleCheckout } = useCheckoutService();
  const { t } = useI18n();

  return (
    <Card className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">{t('checkout.title')}</h1>
      <p className="mt-2 text-sm text-slate-600">{t('checkout.description')}</p>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">{t('checkout.selectedTemplate')}</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedTemplate?.name || t('checkout.none')}</h2>
        <p className="mt-2 text-sm text-slate-600">{t('checkout.price', { price: selectedTemplate?.price?.toLocaleString('id-ID') || '0' })}</p>
      </div>

      <Button onClick={handleCheckout} disabled={loading} className="mt-8 h-auto rounded-full bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? t('checkout.processing') : t('checkout.continue')}
      </Button>
    </Card>
  );
}
