import { useCallback, useState } from 'react';
import { useI18n } from '../../shared/i18n/i18n-context';

export interface LandingStep {
  title: string;
  description: string;
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

  const steps: LandingStep[] = [
    {
      title: t('step.register.title'),
      description: t('step.register.description'),
    },
    {
      title: t('step.selectTemplate.title'),
      description: t('step.selectTemplate.description'),
    },
    {
      title: t('step.buy.title'),
      description: t('step.buy.description'),
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
    steps,
    highlights,
  };
}
