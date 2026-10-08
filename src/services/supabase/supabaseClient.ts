import { StudentPreferences, ParentPreferences } from '../../types/preferences';
import { FinalDecisionRecord } from '../../types/familyDecision';

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

export const supabaseConfig: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  isConfigured: Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
};

export class CareerBridgeSupabaseService {
  static getConnectionStatus(): { isConfigured: boolean; label: string } {
    return {
      isConfigured: supabaseConfig.isConfigured,
      label: supabaseConfig.isConfigured ? 'Supabase Connected' : 'Demo Local Storage Mode',
    };
  }

  static async saveStudentPreferences(familyId: string, prefs: StudentPreferences): Promise<boolean> {
    if (!supabaseConfig.isConfigured) {
      // Demo local persistence
      localStorage.setItem(`careerbridge_student_prefs_${familyId}`, JSON.stringify(prefs));
      return true;
    }

    try {
      const response = await fetch(`${supabaseConfig.url}/rest/v1/student_preferences`, {
        method: 'POST',
        headers: {
          'apikey': supabaseConfig.anonKey!,
          'Authorization': `Bearer ${supabaseConfig.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          family_id: familyId,
          course_id: prefs.courseId,
          career_field: prefs.careerField,
          skills: prefs.skills,
          technology_interests: prefs.technologyInterests,
          budget_max: prefs.budgetMax,
          location_preference: prefs.locationPreference,
          preferred_institution_type: prefs.preferredInstitutionType,
          duration_preference_months: prefs.durationPreferenceMonths,
          commute_tolerance_km: prefs.commuteToleranceKm,
          career_priorities: prefs.careerPriorities,
          target_salary_monthly: prefs.targetSalaryMonthly,
          updated_at: new Date().toISOString(),
        }),
      });
      return response.ok;
    } catch (err) {
      console.error('Supabase write failed; local fallback used', err);
      return false;
    }
  }

  static async saveParentPreferences(familyId: string, prefs: ParentPreferences): Promise<boolean> {
    if (!supabaseConfig.isConfigured) {
      localStorage.setItem(`careerbridge_parent_prefs_${familyId}`, JSON.stringify(prefs));
      return true;
    }

    try {
      const response = await fetch(`${supabaseConfig.url}/rest/v1/guardian_preferences`, {
        method: 'POST',
        headers: {
          'apikey': supabaseConfig.anonKey!,
          'Authorization': `Bearer ${supabaseConfig.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          family_id: familyId,
          course_id: prefs.courseId,
          career_expectations: prefs.careerExpectations,
          job_security_priority: prefs.jobSecurityPriority,
          employment_pathway: prefs.employmentPathwayPreference,
          budget_max: prefs.budgetMax,
          location_preference: prefs.locationPreference,
          preferred_institution_type: prefs.preferredInstitutionType,
          duration_preference_months: prefs.durationPreferenceMonths,
          commute_tolerance_km: prefs.commuteToleranceKm,
          hostel_preference: prefs.hostelPreference,
          family_constraints: prefs.familyConstraints,
          parent_name: prefs.parentName,
          updated_at: new Date().toISOString(),
        }),
      });
      return response.ok;
    } catch (err) {
      console.error('Supabase parent write failed', err);
      return false;
    }
  }

  static async saveFamilyDecision(familyId: string, decision: FinalDecisionRecord): Promise<boolean> {
    if (!supabaseConfig.isConfigured) {
      localStorage.setItem(`careerbridge_family_decision_${familyId}`, JSON.stringify(decision));
      return true;
    }

    try {
      const response = await fetch(`${supabaseConfig.url}/rest/v1/family_decisions`, {
        method: 'POST',
        headers: {
          'apikey': supabaseConfig.anonKey!,
          'Authorization': `Bearer ${supabaseConfig.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          family_id: familyId,
          choice: decision.choice,
          selected_course_id: decision.selectedCourseId,
          notes: decision.notes,
          is_locked: decision.isLocked,
          locked_at: new Date().toISOString(),
        }),
      });
      return response.ok;
    } catch (err) {
      console.error('Supabase decision write failed', err);
      return false;
    }
  }
}
