import { useCallback, useState } from 'react';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface LandingPlan {
  name: string;
  price: string;
  features: string[];
  highlight: boolean;
}

export interface LandingHighlight {
  title: string;
  body: string;
}

export function useLandingService() {
  const [authOpen, setAuthOpen] = useState(false);
  const { t } = useI18n();

  const openAuthModal = useCallback(() => {
    setAuthOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const plans: LandingPlan[] = [
    {
      name: t('plan.starter'),
      price: t('plan.free'),
      features: [t('plan.feature1'), t('plan.feature2'), t('plan.feature3')],
      highlight: false,
    },
    {
      name: t('plan.signature'),
      price: 'Rp 199k',
      features: [t('plan.feature4'), t('plan.feature5'), t('plan.feature6')],
      highlight: true,
    },
    {
      name: t('plan.luxury'),
      price: 'Rp 499k',
      features: [t('plan.feature7'), t('plan.feature8'), t('plan.feature9')],
      highlight: false,
    },
  ];

  const highlights: LandingHighlight[] = [
    {
      title: t('highlight.story.title'),
      body: t('highlight.story.body'),
    },
    {
      title: t('highlight.rsvp.title'),
      body: t('highlight.rsvp.body'),
    },
    {
      title: t('highlight.romance.title'),
      body: t('highlight.romance.body'),
    },
  ];

  return {
    authOpen,
    openAuthModal,
    closeAuthModal,
    plans,
    highlights,
  };
}
