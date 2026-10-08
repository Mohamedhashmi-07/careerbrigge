import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStepIndex: number; // 1 to 5
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStepIndex }) => {
  const { t, navigate } = useApp();

  const steps = [
    { num: 1, label: t.stepper.step1, path: '/assessment/student' },
    { num: 2, label: t.stepper.step2, path: '/assessment/student' },
    { num: 3, label: t.stepper.step3, path: '/assessment/guardian' },
    { num: 4, label: t.stepper.step4, path: '/family-decision' },
    { num: 5, label: t.stepper.step5, path: '/dashboard/funding' },
  ];

  return (
    <div className="stepper-container" role="progressbar" aria-valuenow={currentStepIndex} aria-valuemin={1} aria-valuemax={5}>
      {steps.map((step) => {
        const isCompleted = step.num < currentStepIndex;
        const isActive = step.num === currentStepIndex;

        return (
          <div
            key={step.num}
            className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => navigate(step.path)}
            title={`Step ${step.num}: ${step.label}`}
          >
            <div className="step-circle">
              {isCompleted ? <Check size={16} strokeWidth={3} /> : step.num}
            </div>
            <span className="step-title">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};
