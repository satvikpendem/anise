export const validGenders = [
	"Male",
	"Female",
	"Non-binary",
	"Other",
	"Prefer not to say",
] as const satisfies string[];

export const validSexualOrientations = [
	"Straight",
	"Gay",
	"Lesbian",
	"Bisexual",
	"Asexual",
	"Pansexual",
	"Other",
	"Prefer not to say",
] as const satisfies string[];

export const validReligiousBackgrounds = [
	"Christian",
	"Catholic",
	"Muslim",
	"Jewish",
	"Hindu",
	"Buddhist",
	"Atheist",
	"Agnostic",
	"None",
	"Other",
	"Prefer not to say",
] as const satisfies string[];

export const validTreatmentModalities = [
	"Cognitive Behavioral Therapy (CBT)",
	"Motivational Interviewing",
	"Psychodynamic Therapy",
	"Acceptance and Commitment Therapy (ACT)",
	"Dialectical Behavioral Therapy (DBT)",
	"Mindfulness-Based (MBCT)",
	"Person Centered Therapy",
	"Art Therapy",
	"Narrative Therapy",
	"Contextual Therapy",
	"Family Systems Therapy",
	"Eye Movement Desensitization and Reprocessing (EMDR)",
	"Prolonged Exposure Therapy",
	"Therapist's Recommendation",
	"Trauma Focused CBT",
	"Relational-Cultural Therapy",
	"Emotionally Focused Therapy",
	"Restoration Therapy",
] as const satisfies string[];

export const validAreasOfSpecialization = [
	"Depression",
	"Low self-esteem",
	"Ethnicity and racial identity related issues and/or trauma",
	"LGBTQ+ related concerns",
	"Academic stress",
	"Occupation-related stress",
	"Major life transitions",
	"Social fears",
	"Interpersonal problems",
	"Relationship difficulties",
	"Sexual concerns",
	"Anxiety",
	"Panic attacks",
	"Worry",
	"Culturally-responsive treatments",
	"Work-related stress",
	"Trauma-related stress",
	"Sleep problems",
	"OCD",
	"Attention Deficit Hyperactivity Disorder (ADD/ADHD)",
	"Autism",
	"Anger management",
	"Grief/bereavement",
	"Mood disorder",
	"Personality disorders",
	"Post-Traumatic Stress Disorder (PTSD)",
	"Race-based trauma",
	"Substance use disorder",
	"Trauma therapy",
	"Anger Management",
	"ADHD",
	"Impulse-control difficulties",
	"Eating Disorders",
	"Other",
] as const satisfies string[];

export const validPaymentMethods = [
	"Aetna",
	"Magellan",
	"Anthem",
	"Self-pay",
] as const satisfies string[];

export type RawTherapist = {
	firstName: string;
	lastName: string;
	ethnicIdentity: string;
	genderIdentity: string;
	availability: string;
	language: string;
	location: string;
	bio: string;
	sexualOrientation: string;
	religiousBackground: string;
	treatmentModality: string;
	areasOfSpecialization: string;
	paymentMethods: string;
};

export type Therapist = {
	name: string;
	ethnicIdentity: string[];
	genderIdentity: (typeof validGenders)[number];
	availability: number;
	language: string[];
	location: string[];
	bio: string;
	sexualOrientation: (typeof validSexualOrientations)[number];
	religiousBackground: (typeof validReligiousBackgrounds)[number];
	treatmentModality: (typeof validTreatmentModalities)[number][];
	areasOfSpecialization: (typeof validAreasOfSpecialization)[number][];
	paymentMethods: (typeof validPaymentMethods)[number][];
};

export type PatientInput = Pick<
	Therapist,
	| "genderIdentity"
	| "sexualOrientation"
	| "religiousBackground"
	| "treatmentModality"
	| "areasOfSpecialization"
	| "location"
	| "paymentMethods"
>;
