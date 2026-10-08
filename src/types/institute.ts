export interface Institute {
  id: string;
  name: string;
  code: string;
  type: 'government' | 'private' | 'government-aided';
  affiliatingBody: string; // e.g., NCVT / DGT / State Board of Technical Education
  city: string;
  district: string;
  state: string;
  coursesOffered: string[];
  annualFeeDemo: string;
  hasHostel: boolean;
  hasIndustryTieUps: boolean;
  labRatingDemo: string;
  placementAssistance: string;
  dataStatus: 'demo' | 'verified';
  contactPhone?: string;
  websiteDemo?: string;
}
