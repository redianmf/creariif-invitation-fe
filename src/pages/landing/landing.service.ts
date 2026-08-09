import { useCallback, useState } from 'react';

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

  const openAuthModal = useCallback(() => {
    setAuthOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const plans: LandingPlan[] = [
    {
      name: 'Starter',
      price: 'Free',
      features: ['1 invitation', 'Basic theme', 'Guest RSVP'],
      highlight: false,
    },
    {
      name: 'Signature',
      price: 'Rp 199k',
      features: ['Unlimited invites', 'Premium templates', 'Custom story section'],
      highlight: true,
    },
    {
      name: 'Luxury',
      price: 'Rp 499k',
      features: ['Full design suite', 'Priority support', 'Advanced personalization'],
      highlight: false,
    },
  ];

  const highlights: LandingHighlight[] = [
    {
      title: 'Beautiful storytelling',
      body: 'Craft a cinematic introduction with elegant layouts and moving imagery.',
    },
    {
      title: 'Real-time RSVP',
      body: 'Let guests respond instantly and keep every celebration feeling personal.',
    },
    {
      title: 'Designed for romance',
      body: 'From timeless florals to minimalist luxury, every detail stays graceful.',
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
