export interface VocationalJob {
  id: string;
  title: string;
  trade: string;
  companyDemo: string;
  location: string;
  workType: 'Full-time' | 'Apprenticeship (NAPS)' | 'Contractual';
  experienceLevel: 'Fresher / Entry' | '1-2 Years' | '3+ Years';
  salaryRangeDemo: string;
  minQualification: string;
  postedDaysAgo: number;
  skillsRequired: string[];
  dataStatus: 'demo';
  officialSourceLabel: string;
}
