import { StudentPreferences, ParentPreferences } from '../../types/preferences';
import {
  MatrixRow,
  DifferenceExplanation,
  MutualOption,
  AlignmentStatus,
} from '../../types/familyDecision';
import { DEMO_COURSES } from '../../data/demo/courses';

export interface FamilyAnalysisResult {
  familyAlignmentScore: number;
  matrixRows: MatrixRow[];
  differenceExplanations: DifferenceExplanation[];
  mutualOptions: MutualOption[];
  summaryNote: string;
}

export function analyzeFamilyPerspectives(
  student: StudentPreferences,
  parent: ParentPreferences
): FamilyAnalysisResult {
  const studentCourse = DEMO_COURSES.find(c => c.id === student.courseId);
  const parentCourse = DEMO_COURSES.find(c => c.id === parent.courseId);

  const studentCourseTitle = studentCourse ? studentCourse.title : student.courseId;
  const parentCourseTitle = parentCourse ? parentCourse.title : parent.courseId;

  // 1. Matrix Construction
  const matrixRows: MatrixRow[] = [];

  // Dimension 1: Selected Course
  const courseMatch: AlignmentStatus = student.courseId === parent.courseId ? 'aligned' : 'different';
  matrixRows.push({
    dimensionKey: 'course',
    dimensionLabel: 'Primary Course / Trade',
    studentValue: studentCourseTitle,
    parentValue: parentCourseTitle,
    status: courseMatch,
    detailNote: courseMatch === 'aligned'
      ? 'Both student and parent selected the same primary trade.'
      : 'Student seeks cutting-edge hands-on focus while parent favors broad conventional stability.',
  });

  // Dimension 2: Education Budget
  const budgetRatio = student.budgetMax / (parent.budgetMax || 1);
  let budgetStatus: AlignmentStatus = 'aligned';
  if (budgetRatio < 0.6 || budgetRatio > 1.4) {
    budgetStatus = 'partially_aligned';
  }
  if (Math.abs(student.budgetMax - parent.budgetMax) > 30000) {
    budgetStatus = 'different';
  }
  matrixRows.push({
    dimensionKey: 'budget',
    dimensionLabel: 'Annual Education Budget',
    studentValue: `₹${student.budgetMax.toLocaleString('en-IN')}`,
    parentValue: `₹${parent.budgetMax.toLocaleString('en-IN')}`,
    status: budgetStatus,
    detailNote: `Parent has allocated ₹${parent.budgetMax.toLocaleString('en-IN')}, accommodating both government and subsidized courses.`,
  });

  // Dimension 3: Institution Category
  const instStatus: AlignmentStatus =
    student.preferredInstitutionType === parent.preferredInstitutionType
      ? 'aligned'
      : (student.preferredInstitutionType === 'any' || parent.preferredInstitutionType === 'any')
      ? 'partially_aligned'
      : 'different';
  matrixRows.push({
    dimensionKey: 'institution',
    dimensionLabel: 'Institution Preference',
    studentValue: student.preferredInstitutionType.toUpperCase(),
    parentValue: parent.preferredInstitutionType.toUpperCase(),
    status: instStatus,
    detailNote: 'Both favor government ITI / Polytechnic institutions for low tuition and high credibility.',
  });

  // Dimension 4: Duration
  const durStatus: AlignmentStatus =
    student.durationPreferenceMonths === parent.durationPreferenceMonths
      ? 'aligned'
      : Math.abs(student.durationPreferenceMonths - parent.durationPreferenceMonths) <= 12
      ? 'partially_aligned'
      : 'different';
  matrixRows.push({
    dimensionKey: 'duration',
    dimensionLabel: 'Course Duration',
    studentValue: `${student.durationPreferenceMonths} Months (${Math.round(student.durationPreferenceMonths / 12)} Yr)`,
    parentValue: `${parent.durationPreferenceMonths} Months (${Math.round(parent.durationPreferenceMonths / 12)} Yrs)`,
    status: durStatus,
    detailNote: durStatus === 'aligned'
      ? 'Agreed on timeframe.'
      : `Student prefers faster entry (${student.durationPreferenceMonths}m) while parent prioritizes 3-year polytechnic credential.`,
  });

  // Dimension 5: Commute & Location
  const commuteDiff = Math.abs(student.commuteToleranceKm - parent.commuteToleranceKm);
  const commuteStatus: AlignmentStatus = commuteDiff <= 10 ? 'aligned' : 'partially_aligned';
  matrixRows.push({
    dimensionKey: 'commute',
    dimensionLabel: 'Daily Commute / Location',
    studentValue: `Up to ${student.commuteToleranceKm} km (${student.locationPreference})`,
    parentValue: `Up to ${parent.commuteToleranceKm} km (${parent.hostelPreference === 'acceptable' ? 'Hostel allowed' : 'Day scholar preferred'})`,
    status: commuteStatus,
    detailNote: 'Commute parameters are compatible within district transit corridors.',
  });

  // Dimension 6: Career Priority vs Job Security
  matrixRows.push({
    dimensionKey: 'priority',
    dimensionLabel: 'Career Priority & Job Security',
    studentValue: student.careerPriorities[0] || 'Hands-on practical work',
    parentValue: `Job Security Priority: ${parent.jobSecurityPriority.toUpperCase()}`,
    status: 'partially_aligned',
    detailNote: 'Student is driven by emerging tech enthusiasm; parent seeks proven recruitment track records.',
  });

  // 2. Family Alignment Score calculation
  let totalScore = 0;
  // Course: 25%
  totalScore += courseMatch === 'aligned' ? 25 : 12;
  // Budget: 20%
  totalScore += budgetStatus === 'aligned' ? 20 : budgetStatus === 'partially_aligned' ? 14 : 8;
  // Institution: 15%
  totalScore += instStatus === 'aligned' ? 15 : instStatus === 'partially_aligned' ? 10 : 5;
  // Duration: 15%
  totalScore += durStatus === 'aligned' ? 15 : durStatus === 'partially_aligned' ? 9 : 4;
  // Commute: 15%
  totalScore += commuteStatus === 'aligned' ? 15 : 9;
  // Priorities: 10%
  totalScore += 7;

  const familyAlignmentScore = Math.min(96, Math.max(35, totalScore));

  // 3. Difference Explanations (derived from actual preferences)
  const differenceExplanations: DifferenceExplanation[] = [];

  if (student.courseId !== parent.courseId) {
    differenceExplanations.push({
      id: 'diff-course',
      dimension: 'course',
      dimensionLabel: 'Different Course Focus',
      studentPerspective: `Selected "${studentCourseTitle}" aiming for hands-on exposure to rapidly growing green tech mobility sectors.`,
      parentPerspective: `Selected "${parentCourseTitle}" seeking long-term employment safety in established state electricity boards, railways, and industrial utilities.`,
      analysisText: 'The student prioritizes emerging practical innovation with immediate workshop skills, whereas the parent places greater weight on broad, versatile accreditation and historical recruitment stability.',
      suggestedBridge: 'A 3-year Diploma in Mechatronics or Electrical & Electronics with EV / Green Energy elective modules gives both: an AICTE-recognized diploma for PSU eligibility plus hands-on EV technology skills.',
    });
  }

  if (durStatus !== 'aligned') {
    differenceExplanations.push({
      id: 'diff-duration',
      dimension: 'duration',
      dimensionLabel: 'Course Duration Gap',
      studentPerspective: `Prefers a shorter ${student.durationPreferenceMonths}-month pathway to begin earning and gain industry experience quickly.`,
      parentPerspective: `Prefers a ${parent.durationPreferenceMonths}-month (3-year) program to secure a full polytechnic diploma credential.`,
      analysisText: 'The time horizon creates tension between the student’s urge for early financial independence and the parent’s concern that a 1-year certificate might cap future promotional growth.',
      suggestedBridge: 'Explore lateral-entry pathways: Start with a 1-year certified program with an employer apprenticeship (NAPS), followed by evening/lateral diploma progression.',
    });
  }

  if (student.budgetMax !== parent.budgetMax) {
    differenceExplanations.push({
      id: 'diff-budget',
      dimension: 'budget',
      dimensionLabel: 'Budget Expectations',
      studentPerspective: `Estimated budget ceiling: ₹${student.budgetMax.toLocaleString('en-IN')} / year.`,
      parentPerspective: `Family ceiling budgeted at ₹${parent.budgetMax.toLocaleString('en-IN')} / year.`,
      analysisText: 'Parent has budgeted higher than student expects, meaning the family has headroom to absorb polytechnic lab fees or transport costs if the course delivers guaranteed value.',
      suggestedBridge: 'Target Government ITI or Central Polytechnic where actual annual fees are under ₹5,000, leaving surplus for toolkits and certified examinations.',
    });
  }

  // 4. Mutual Consensus Options ("Options Both Can Agree On")
  const mutualOptions: MutualOption[] = [
    {
      courseId: 'diploma-mechatronics',
      courseTitle: 'Diploma in Mechatronics & Industrial Automation',
      category: 'Manufacturing & CNC / Automation',
      durationLabel: '3 Years (Polytechnic Diploma)',
      estimatedCostRange: '₹3,600 - ₹22,000 / year',
      institutionType: 'Government Polytechnic / Aided',
      familyMatchPercent: 91,
      studentMatchPercent: 89,
      parentMatchPercent: 93,
      careerPathSummary: 'Automation Technician → Robotics Specialist → Smart Factory Engineer',
      whyItFits: [
        'Satisfies student desire for cutting-edge electronics, sensors, and robotics.',
        'Satisfies parent desire for a rigorous 3-year state-board diploma with PSU/MNC eligibility.',
        'Extremely high demand across automotive (EV) assembly plants and industrial plants.',
      ],
      tradeOffs: [
        'Requires 3 years rather than 1 year.',
        'Higher academic dedication required for semester exams.',
      ],
    },
    {
      courseId: 'solar-technician',
      courseTitle: 'Solar PV Installation & Maintenance (Suryamitra)',
      category: 'Renewable Energy',
      durationLabel: '1 Year (Govt Certified)',
      estimatedCostRange: '₹3,200 - ₹12,000 / year',
      institutionType: 'Government ITI / National Solar Institute',
      familyMatchPercent: 86,
      studentMatchPercent: 88,
      parentMatchPercent: 84,
      careerPathSummary: 'Solar Installer → Rooftop Supervisor → Empaneled Green Contractor',
      whyItFits: [
        'Matches student 1-year fast-employment timeline in high-growth green sector.',
        'Backed by massive Central Government PM Surya Ghar scheme with guaranteed local work.',
        'Extremely low tuition with government Suryamitra stipend support.',
      ],
      tradeOffs: [
        'Field/outdoor installation work required.',
        'Requires entrepreneurship or contractor initiative for highest earnings.',
      ],
    },
    {
      courseId: 'diploma-eee',
      courseTitle: 'Diploma in EEE with Electric Mobility Elective',
      category: 'Electrical & Electronics',
      durationLabel: '3 Years (Polytechnic Diploma)',
      estimatedCostRange: '₹3,850 - ₹18,000 / year',
      institutionType: 'Government Polytechnic',
      familyMatchPercent: 88,
      studentMatchPercent: 82,
      parentMatchPercent: 94,
      careerPathSummary: 'Electrical Trainee → Plant Maintenance Lead → Licensed Supervisor',
      whyItFits: [
        'Gives parent complete peace of mind with conventional state electricity board eligibility.',
        'Student can take final-year EV power systems project and NAPS EV apprenticeship.',
        'Low cost at government polytechnics with hostel facility.',
      ],
      tradeOffs: [
        '1st year focuses on core electrical theory rather than solely EV mechanics.',
      ],
    },
  ];

  return {
    familyAlignmentScore,
    matrixRows,
    differenceExplanations,
    mutualOptions,
    summaryNote: 'Both perspectives share common ground around technical hands-on vocations and government-recognized institutions. The divergence lies primarily in course specialization depth and duration.',
  };
}
