export type DataStatus = 'demo' | 'verified' | 'official';

export interface CareerPathStep {
  stage: string;
  title: string;
  timeframe: string;
  description: string;
  salaryRangeDemo: string;
}

export interface WhatYouLearn {
  subjects: string[];
  technicalSkills: string[];
  practicalSkills: string[];
  toolsAndTech: string[];
}

export interface InstituteAffiliation {
  id: string;
  name: string;
  type: 'government' | 'private' | 'government-aided';
  city: string;
  state: string;
  estimatedFeeAnnual: number;
  hostelAvailable: boolean;
}

export interface VocationalCourse {
  id: string;
  code: string;
  title: string;
  titleHi?: string;
  titleTa?: string;
  category: 'Automotive & EV' | 'Electrical & Electronics' | 'IT & Digital Skills' | 'Healthcare & Paramedical' | 'Renewable Energy' | 'Manufacturing & CNC' | 'Construction & Civil' | 'Design & Media';
  level: 'Certificate (ITI / NSDC)' | 'Diploma (Polytechnic)' | 'Advanced Diploma';
  durationMonths: number;
  durationLabel: string;
  eligibility: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  institutionTypes: ('government' | 'private' | 'government-aided')[];
  overview: string;
  overviewTa?: string;
  overviewHi?: string;
  whatYouLearn: WhatYouLearn;
  careerPathway: CareerPathStep[];
  typicalJobRoles: {
    roleTitle: string;
    industrySector: string;
    entryLevelExpectation: string;
  }[];
  furtherStudyOptions: string[];
  institutes: InstituteAffiliation[];
  industryDemand: 'High' | 'Very High' | 'Moderate';
  dataStatus: DataStatus;
  officialSourceLabel?: string;
}
