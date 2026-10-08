import { StudentPreferences, ParentPreferences } from '../../types/preferences';
import { WhatIfParameters, WhatIfSimulationResult } from '../../types/familyDecision';
import { analyzeFamilyPerspectives } from './familyDecisionService';

export function runWhatIfSimulation(
  student: StudentPreferences,
  parent: ParentPreferences,
  params: WhatIfParameters
): WhatIfSimulationResult {
  const currentAnalysis = analyzeFamilyPerspectives(student, parent);
  const currentScore = currentAnalysis.familyAlignmentScore;

  // Clone preferences with simulated adjustments
  const simStudent = { ...student };
  const simParent = { ...parent };

  simParent.budgetMax = params.parentBudgetMax;
  simStudent.budgetMax = params.studentBudgetMax;
  simParent.durationPreferenceMonths = params.preferredDurationMonths;
  simStudent.durationPreferenceMonths = params.preferredDurationMonths;
  simParent.commuteToleranceKm = params.commuteToleranceKm;
  simStudent.commuteToleranceKm = params.commuteToleranceKm;
  if (params.allowHostel) {
    simParent.hostelPreference = 'acceptable';
  }

  // Calculate simulated score
  let simScore = currentScore;
  const impactFactors: { factor: string; impact: 'positive' | 'neutral' | 'negative'; detail: string }[] = [];

  // Impact 1: Duration harmonization
  if (params.preferredDurationMonths === 36 || params.preferredDurationMonths === 24) {
    simScore += 6;
    impactFactors.push({
      factor: 'Duration Agreement',
      impact: 'positive',
      detail: `Aligning on ${params.preferredDurationMonths} months eliminates the credential vs speed friction.`,
    });
  }

  // Impact 2: Budget flexibility
  if (params.parentBudgetMax >= 50000) {
    simScore += 5;
    impactFactors.push({
      factor: 'Expanded Budget Ceiling',
      impact: 'positive',
      detail: `₹${params.parentBudgetMax.toLocaleString('en-IN')} comfortably covers polytechnic fees, tools, and certification exams.`,
    });
  } else if (params.parentBudgetMax < 25000) {
    simScore -= 4;
    impactFactors.push({
      factor: 'Tight Budget Constraint',
      impact: 'negative',
      detail: 'Restricts options strictly to zero-fee government ITIs with merit quota.',
    });
  }

  // Impact 3: Hostel / Mobility
  if (params.allowHostel) {
    simScore += 4;
    impactFactors.push({
      factor: 'Hostel Accommodation Allowed',
      impact: 'positive',
      detail: 'Unlocks top-tier state polytechnics outside the immediate home district.',
    });
  }

  // Impact 4: Commute expansion
  if (params.commuteToleranceKm >= 25) {
    simScore += 2;
    impactFactors.push({
      factor: 'Extended Commute Range',
      impact: 'positive',
      detail: 'Includes industrial training corridors in adjacent municipal zones.',
    });
  }

  simScore = Math.min(97, Math.max(40, simScore));
  const deltaPercent = simScore - currentScore;

  let explanation = '';
  if (deltaPercent > 0) {
    explanation = `Adjusting constraints unlocks +${deltaPercent}% higher compatibility by removing location and budget bottlenecks, enabling viable consensus on courses like Diploma in Mechatronics or Suryamitra.`;
  } else if (deltaPercent < 0) {
    explanation = `Tighter constraints reduced compatibility by ${Math.abs(deltaPercent)}%, limiting available courses to strictly localized low-cost trades.`;
  } else {
    explanation = `Current adjustments maintain baseline alignment without significant divergence in options.`;
  }

  return {
    currentMatchPercent: currentScore,
    simulatedMatchPercent: simScore,
    deltaPercent,
    explanation,
    impactFactors,
  };
}
