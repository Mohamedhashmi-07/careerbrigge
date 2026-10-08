import { VocationalCourse } from '../../types/course';
import { StudentPreferences, ParentPreferences } from '../../types/preferences';

export interface CourseAIFitAnalysis {
  isDemo: boolean;
  modelBadge: string;
  overallMatchScore: number;
  studentSuitability: {
    score: number;
    positives: string[];
    cautions: string[];
  };
  parentSuitability: {
    score: number;
    positives: string[];
    cautions: string[];
  };
  keyTakeaways: string[];
  scoringWeightsExplanation: {
    factor: string;
    weightPercent: number;
    description: string;
  }[];
}

export const WEIGHT_BREAKDOWN = [
  { factor: 'Course & Curriculum Alignment', weightPercent: 25, description: 'Direct interest in hands-on trade vs expected career syllabus' },
  { factor: 'Annual Family Budget Feasibility', weightPercent: 20, description: 'Institute fee vs max allocated annual student/parent budget' },
  { factor: 'Location & Commute Tolerance', weightPercent: 15, description: 'Distance feasibility without unsustainable travel costs' },
  { factor: 'Institution Category Match', weightPercent: 15, description: 'Govt ITI / Polytechnic vs Private / Aided preference' },
  { factor: 'Course Duration & Time Horizon', weightPercent: 10, description: '1-Year certification vs 3-Year polytechnic diploma' },
  { factor: 'Long-term Stability & Priorities', weightPercent: 10, description: 'Placement speed vs PSU/Govt eligibility requirement' },
  { factor: 'Foundation Skills & Prerequisites', weightPercent: 5, description: '10th marks, mathematics/science interest, practical affinity' },
];

export function explainCourseFit(
  course: VocationalCourse,
  studentPrefs: StudentPreferences,
  parentPrefs: ParentPreferences
): CourseAIFitAnalysis {
  let studentScore = 75;
  const studentPositives: string[] = [];
  const studentCautions: string[] = [];

  // Evaluate Student Match
  if (studentPrefs.courseId === course.id) {
    studentScore += 15;
    studentPositives.push('This is the student\'s explicitly preferred primary trade.');
  } else if (course.category === studentPrefs.careerField) {
    studentScore += 10;
    studentPositives.push(`Belongs to student's chosen domain: ${studentPrefs.careerField}.`);
  }

  if (course.estimatedCostMin <= studentPrefs.budgetMax) {
    studentPositives.push(`Estimated tuition (₹${course.estimatedCostMin.toLocaleString('en-IN')}) is within student's target budget (₹${studentPrefs.budgetMax.toLocaleString('en-IN')}).`);
    studentScore += 5;
  } else {
    studentCautions.push(`Tuition slightly exceeds student's estimated budget; scholarship or fee concession may be required.`);
    studentScore -= 5;
  }

  if (course.durationMonths === studentPrefs.durationPreferenceMonths) {
    studentPositives.push(`Matches student's preferred course duration (${course.durationLabel}).`);
    studentScore += 5;
  } else if (course.durationMonths > studentPrefs.durationPreferenceMonths) {
    studentCautions.push(`Course duration (${course.durationMonths} months) is longer than student's initial preference (${studentPrefs.durationPreferenceMonths} months).`);
    studentScore -= 6;
  }

  // Evaluate Parent Match
  let parentScore = 70;
  const parentPositives: string[] = [];
  const parentCautions: string[] = [];

  if (parentPrefs.courseId === course.id) {
    parentScore += 20;
    parentPositives.push('Directly matches the guardian\'s primary choice for the family.');
  } else {
    parentCautions.push(`Parent currently prefers a different route (${parentPrefs.courseId === 'diploma-eee' ? 'Diploma in Electrical & Electronics' : 'another trade'}).`);
    parentScore -= 8;
  }

  if (course.estimatedCostMin <= parentPrefs.budgetMax) {
    parentPositives.push(`Course fee is well within family budget ceiling (₹${parentPrefs.budgetMax.toLocaleString('en-IN')}).`);
    parentScore += 8;
  } else {
    parentCautions.push('Exceeds parent stated annual education budget ceiling.');
    parentScore -= 10;
  }

  if (parentPrefs.jobSecurityPriority === 'high') {
    if (course.industryDemand === 'Very High' || course.institutionTypes.includes('government')) {
      parentPositives.push('Strong industry demand and government recognized accreditation provide good placement security.');
      parentScore += 5;
    } else {
      parentCautions.push('Industry trade is relatively newer; parent may desire proven long-term public sector track records.');
      parentScore -= 6;
    }
  }

  studentScore = Math.max(40, Math.min(98, studentScore));
  parentScore = Math.max(35, Math.min(95, parentScore));
  const overall = Math.round((studentScore * 0.5) + (parentScore * 0.5));

  const keyTakeaways: string[] = [];
  if (Math.abs(studentScore - parentScore) > 15) {
    keyTakeaways.push('Notable divergence between student practical aspiration and parental stability expectations.');
  } else {
    keyTakeaways.push('Moderate to high family consensus potential with minor duration/commute adjustments.');
  }
  keyTakeaways.push(`Recommended step: Explore the Family Decision Engine to evaluate bridging options.`);

  return {
    isDemo: true,
    modelBadge: 'Rule-Based Explainable AI (Demo Mode)',
    overallMatchScore: overall,
    studentSuitability: {
      score: studentScore,
      positives: studentPositives,
      cautions: studentCautions,
    },
    parentSuitability: {
      score: parentScore,
      positives: parentPositives,
      cautions: parentCautions,
    },
    keyTakeaways,
    scoringWeightsExplanation: WEIGHT_BREAKDOWN,
  };
}
