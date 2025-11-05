'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface WizardExecutionHistory {
  id: string;
  name: string;
  completed: boolean;
  stepsCompleted: number;
  totalSteps: number;
  timestamp: number;
}

interface WizardContextType {
  currentWizardId: string | null;
  currentStepIndex: number;
  history: WizardExecutionHistory[];
  setCurrentWizardId: (id: string | null) => void;
  setCurrentStepIndex: (index: number) => void;
  addHistory: (record: WizardExecutionHistory) => void;
  updateHistory: (id: string, updates: Partial<WizardExecutionHistory>) => void;
  completeWizard: (id: string) => void;
  resetHistory: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<WizardExecutionHistory[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('wizard-history');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to parse wizard-history:', err);
      return [];
    }
  });

  const [currentWizardId, setCurrentWizardId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem('wizard-history', JSON.stringify(history));
    } catch (err) {
      console.error('Failed to save wizard-history:', err);
    }
  }, [history]);

  const addHistory = (record: WizardExecutionHistory) => {
    setHistory((prev) => {
      const exists = prev.find((r) => r.id === record.id);
      if (exists) return prev;
      return [...prev, record];
    });
  };

  const updateHistory = (id: string, updates: Partial<WizardExecutionHistory>) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const completeWizard = (id: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: true,
              stepsCompleted: item.totalSteps,
              timestamp: Date.now(),
            }
          : item
      )
    );
  };

  const resetHistory = () => {
    setHistory([]);
    localStorage.removeItem('wizard-history');
  };

  return (
    <WizardContext.Provider
      value={{
        currentWizardId,
        currentStepIndex,
        history,
        setCurrentWizardId,
        setCurrentStepIndex,
        addHistory,
        updateHistory,
        completeWizard,
        resetHistory,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
}
