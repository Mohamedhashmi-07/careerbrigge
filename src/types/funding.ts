export interface Scholarship {
  id: string;
  name: string;
  nameHi?: string;
  nameTa?: string;
  source: string;
  sourceType: 'central_govt' | 'state_govt' | 'skill_mission' | 'industry_csr';
  benefitAmount: string;
  courseApplicability: string[];
  incomeCriteria: string;
  academicCriteria: string;
  requiredDocuments: string[];
  deadline: string;
  officialUrl?: string;
  isOfficialConfigured: boolean;
  dataStatus: 'official' | 'demo' | 'verified';
  eligibilityStatus: 'Eligible based on profile' | 'Needs document review' | 'Check income limit';
  description: string;
}

export interface EducationLoan {
  id: string;
  schemeName: string;
  providerName: string;
  loanType: 'subsidized_govt_scheme' | 'state_corporation' | 'scheduled_bank';
  maxAmount: string;
  interestRateInfo: string;
  subsidyDetails: string;
  eligibility: string;
  requiredDocuments: string[];
  repaymentTerms: string;
  officialPortalUrl?: string;
  isOfficialConfigured: boolean;
  dataStatus: 'official' | 'demo';
  description: string;
}

export type DocumentStatus = 'missing' | 'uploaded' | 'under_review' | 'verified';

export interface DocumentVaultItem {
  id: string;
  title: string;
  category: 'identity' | 'income' | 'academic' | 'category' | 'admission';
  status: DocumentStatus;
  requiredFor: string[];
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  notes?: string;
}
