import { parseData } from "./parsing";
import {
	preferenceTypeToValidPreferences,
	type PatientInput,
	type SearchParams,
	type Therapist,
} from "./types";

/**
 * Parse and normalize the search params from the URL. Convert any single values into an array to make it easier to compare
 * with the therapist's preferences.
 *
 * @param searchParams Raw search params from the URL
 * @returns Parsed search params as an object
 */
async function parseSearchParams(searchParams: SearchParams) {
	const params = await searchParams;
	const normalized: { [key: string]: string[] } = {};

	for (const key in params) {
		const value = params[key];
		if (value === undefined) {
			normalized[key] = ["Any"];
		} else if (typeof value === "string") {
			normalized[key] = [value];
		} else {
			normalized[key] = value;
		}
	}

	return normalized as PatientInput;
}

/**
 * Evaluate the patient's preferences and return the top three therapists that match the patient's preferences
 *
 * This method works by iterating through the list of therapists and comparing each therapist's preferences to the patient's preferences.
 * We use a match count that will be incremented for each preference that matches between the patient and the therapist. If the patient
 * selects "Any" for a preference, then we will increment the match count by the number of valid preferences for that type, because we are
 * matching all possible values.
 *
 * @param data The raw object that is parsed from the search params that the patient inputs on the form
 * @returns The top three therapists that match the patient's preferences
 */
async function evaluate(data: PatientInput) {
	const therapists = await parseData("./data/data.tsv");
	const matches: (Therapist & { matchCount: number })[] = [];

	const therapistsWithAvailability = therapists.filter(
		(therapist) => therapist.availability > 0,
	);

	for (const therapist of therapistsWithAvailability) {
		let matchCount = 0;
		for (const [k, v] of Object.entries(data) as [string, string[]][]) {
			const preferenceType = k as keyof PatientInput;
			const preferenceValues = v;
			if (preferenceValues.includes("Any")) {
				// If the value is "Any", then we should increment the match count by the number of valid preferences for that type
				// as we are matching all possible values.
				matchCount += preferenceTypeToValidPreferences[preferenceType].length;
			} else {
				if (therapist[preferenceType as keyof Therapist] !== undefined) {
					if (typeof therapist[preferenceType] === "string") {
						// Single type here
						if (preferenceValues.includes(therapist[preferenceType])) {
							matchCount++;
						}
					} else {
						// Array of types here
						for (const value of preferenceValues) {
							if ((therapist[preferenceType] as string[]).includes(value)) {
								matchCount++;
							}
						}
					}
				}
			}
		}
		if (matchCount > 0) {
			matches.push({ ...therapist, matchCount });
		}
	}

	matches.sort((a, b) => b.matchCount - a.matchCount);
	const topThree = matches.slice(0, 3);
	return topThree;
}

export async function evaluatePreferences(
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
) {
	const parsedSearchParams = await parseSearchParams(searchParams);
	const data = await evaluate(parsedSearchParams);
	return data;
}
