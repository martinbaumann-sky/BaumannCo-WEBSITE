import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AiAnalysisResult {
  recommendedService: string;
  analysis: string;
  agenda: string[];
}

export enum BookingState {
  IDLE,
  ANALYZING,
  ANALYSIS_COMPLETE,
  CONFIRMED
}

export interface BookingFormState {
  name: string;
  email: string;
  company: string;
  challenge: string;
  date: string;
}