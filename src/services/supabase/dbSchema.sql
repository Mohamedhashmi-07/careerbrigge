-- ============================================================================
-- CAREERBRIDGE AI — SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- VOCATIONAL EDUCATION & FAMILY DECISION SUPPORT PLATFORM
-- ============================================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('student', 'guardian', 'admin');
CREATE TYPE alignment_status AS ENUM ('aligned', 'partially_aligned', 'different', 'not_specified');
CREATE TYPE doc_status AS ENUM ('missing', 'uploaded', 'under_review', 'verified');
CREATE TYPE decision_choice AS ENUM (
  'choose_student_preference',
  'choose_parent_preference',
  'choose_mutual_option',
  'continue_discussion',
  'not_decided'
);

-- 2. FAMILIES / COUNCILS
CREATE TABLE IF NOT EXISTS families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  access_code VARCHAR(16) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES families(id) ON DELETE SET NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  phone TEXT,
  preferred_language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. STUDENT PREFERENCES (Independent Table)
CREATE TABLE IF NOT EXISTS student_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  career_field TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  technology_interests TEXT[] DEFAULT '{}',
  budget_max NUMERIC(10, 2) NOT NULL DEFAULT 50000,
  location_preference TEXT,
  preferred_institution_type TEXT DEFAULT 'government',
  duration_preference_months INT DEFAULT 12,
  commute_tolerance_km INT DEFAULT 15,
  career_priorities TEXT[] DEFAULT '{}',
  target_salary_monthly NUMERIC(10, 2) DEFAULT 20000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_family_student UNIQUE (family_id)
);

-- 5. GUARDIAN / PARENT PREFERENCES (Completely Independent Table)
CREATE TABLE IF NOT EXISTS guardian_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  guardian_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  career_expectations TEXT,
  job_security_priority TEXT DEFAULT 'high',
  employment_pathway TEXT DEFAULT 'immediate_job',
  budget_max NUMERIC(10, 2) NOT NULL DEFAULT 60000,
  location_preference TEXT,
  preferred_institution_type TEXT DEFAULT 'government',
  duration_preference_months INT DEFAULT 36,
  commute_tolerance_km INT DEFAULT 25,
  hostel_preference TEXT DEFAULT 'flexible',
  family_constraints TEXT[] DEFAULT '{}',
  parent_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_family_guardian UNIQUE (family_id)
);

-- 6. FAMILY DECISIONS (Agreement Lock)
CREATE TABLE IF NOT EXISTS family_decisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  choice decision_choice NOT NULL DEFAULT 'not_decided',
  selected_course_id TEXT NOT NULL,
  agreed_by_student BOOLEAN DEFAULT FALSE,
  agreed_by_guardian BOOLEAN DEFAULT FALSE,
  notes TEXT,
  is_locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. DOCUMENT VAULT (Private Student / Guardian Records)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  status doc_status DEFAULT 'missing',
  storage_path TEXT,
  file_name TEXT,
  file_size TEXT,
  uploaded_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. COURSES (Catalog)
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration_months INT NOT NULL,
  eligibility TEXT,
  estimated_cost_min NUMERIC(10, 2),
  estimated_cost_max NUMERIC(10, 2),
  institution_types TEXT[],
  overview TEXT,
  data_status TEXT DEFAULT 'demo'
);

-- 9. SCHOLARSHIPS (Catalog)
CREATE TABLE IF NOT EXISTS scholarships (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  source TEXT NOT NULL,
  source_type TEXT NOT NULL,
  benefit_amount TEXT NOT NULL,
  income_criteria TEXT,
  academic_criteria TEXT,
  required_documents TEXT[],
  deadline TEXT,
  official_url TEXT,
  data_status TEXT DEFAULT 'official'
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Public can read courses and scholarships
CREATE POLICY "Public can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public can view scholarships" ON scholarships FOR SELECT USING (true);

-- Profiles: Users can view & update only their own profile
CREATE POLICY "Users can access own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- Family access: Users belonging to the same family_id can access preferences
CREATE POLICY "Family members can view student preferences" ON student_preferences
  FOR SELECT USING (
    family_id IN (SELECT family_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Student can update own preferences" ON student_preferences
  FOR ALL USING (
    student_id = auth.uid() OR
    family_id IN (SELECT family_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Family members can view guardian preferences" ON guardian_preferences
  FOR SELECT USING (
    family_id IN (SELECT family_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Guardian can update own preferences" ON guardian_preferences
  FOR ALL USING (
    guardian_id = auth.uid() OR
    family_id IN (SELECT family_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Family members can view and lock family decisions" ON family_decisions
  FOR ALL USING (
    family_id IN (SELECT family_id FROM profiles WHERE profiles.id = auth.uid())
  );

CREATE POLICY "Private document vault access" ON documents
  FOR ALL USING (
    family_id IN (SELECT family_id FROM profiles WHERE profiles.id = auth.uid())
  );
