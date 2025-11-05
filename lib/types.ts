export interface WizardStep {
  id: string;
  title: string;
  description: string;
  type: string;
  config?: Record<string, unknown>;
}

export interface Wizard {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  status: "active" | "draft";
  createdAt?: string;
  steps: WizardStep[];
}