"use server";

import csv from "csvtojson";
import {
	type Therapist,
	type RawTherapist,
	validEthnicIdentities,
	validGenders,
	validSexualOrientations,
	validReligiousBackgrounds,
	validTreatmentModalities,
	validAreasOfSpecialization,
	validLocations,
	validPaymentMethods,
} from "./types";

function splitData(data: string) {
	return data.split(",").map((value) => value.trim());
}

// Process the string to make comparison easier
function comparizeString(s: string) {
	const trimmed = s.trim();
	// make every word lowercase
	if (trimmed.includes(" ")) {
		return trimmed
			.split(" ")
			.map((word) => word.trim().toLocaleLowerCase())
			.join(" ");
	}
	return s.trim().toLocaleLowerCase();
}

function compareDatum(one: string, two: string) {
	return comparizeString(one) === comparizeString(two);
}

function compareData(needle: string, haystack: string[]) {
	return haystack.some((element) => compareDatum(element, needle));
}

function validate<T extends string>(
	input: string,
	validValues: string[],
	defaultValue: T,
): T {
	return compareData(input, validValues) ? (input as T) : defaultValue;
}

/**
 * Parse a field that contains only one value of a set of possible values, such as
 * "A" out of ["A", "B", "C"]. If the input is not in the validValues array, we return the defaultValue.
 *
 * @param input Raw input string
 * @param validValues Array of valid values that we want and we return the default value if the input is not in the array
 * @param defaultValue The default value we should use if the input is not in the array
 * @returns One of the valid values or the default value
 */
function parseOneField<T extends string>(
	input: string,
	validValues: T[],
	defaultValue: T,
): T {
	return validate(input, validValues, defaultValue);
}

/**
 * Parse a field that contains many values of a set of possible values, such as
 * "A, B, C" out of ["A", "B", "C", "D", "E"]. If the input is not in the validValues array, we return the defaultValue.
 *
 * @param input Raw input string
 * @param validValues Array of valid values that we want and we return the default value if the input is not in the array
 * @param defaultValue Default value to use if the input is not in the array
 * @returns Array of valid values or an array with the default value
 */
function parseManyField<T extends string>(
	input: string,
	validValues: T[],
	defaultValue: T,
): T[] {
	const processedInput = splitData(input);
	const values = processedInput.map((value) =>
		validate(value, validValues, defaultValue),
	);
	// Use a set to remove duplicates
	return new Set(values).values().toArray();
}

/**
 * We have the raw data in a file, so we need to parse it into JSON. We use separate parsers for each field to ensure that the data is in the correct format.
 *
 * @param filePath file path of the data file, defaults to tsv
 * @returns
 */
export async function parseData(
	filePath: string,
	delimiter = "\t",
): Promise<Therapist[]> {
	const rawData = await csv({ delimiter }).fromFile(filePath);

	return rawData.map(
		({
			firstName,
			lastName,
			ethnicIdentity,
			genderIdentity,
			availability,
			language,
			location,
			bio,
			sexualOrientation,
			religiousBackground,
			treatmentModality,
			areasOfSpecialization,
			paymentMethods,
		}: RawTherapist) => ({
			name: parseName(firstName, lastName),
			ethnicIdentity: parseEthnicIdentity(ethnicIdentity),
			genderIdentity: parseGenderIdentity(genderIdentity),
			availability: parseAvailability(availability),
			language: parseLanguage(language),
			location: parseLocation(location),
			bio: parseBio(bio),
			sexualOrientation: parseSexualOrientation(sexualOrientation),
			religiousBackground: parseReligiousBackground(religiousBackground),
			treatmentModality: parseTreatmentModality(treatmentModality),
			areasOfSpecialization: parseAreasOfSpecialization(areasOfSpecialization),
			paymentMethods: parsePaymentMethods(paymentMethods),
		}),
	);
}

function parseName(first: string, last: string): Therapist["name"] {
	return `${first} ${last}`;
}

function parseEthnicIdentity(
	ethnicIdentity: string,
): Therapist["ethnicIdentity"] {
	return parseManyField(ethnicIdentity, validEthnicIdentities, "Other");
}

function parseGenderIdentity(
	genderIdentity: string,
): Therapist["genderIdentity"] {
	return parseOneField(genderIdentity, validGenders, "Other");
}

function parseAvailability(availability: string): Therapist["availability"] {
	return Number(availability);
}

function parseLanguage(language: string): Therapist["language"] {
	return splitData(language);
}

function parseLocation(location: string): Therapist["location"] {
	return parseManyField(location, validLocations, "Other");
}

function parseBio(bio: string): Therapist["bio"] {
	return bio;
}

function parseSexualOrientation(
	sexualOrientation: string,
): Therapist["sexualOrientation"] {
	return parseManyField(sexualOrientation, validSexualOrientations, "Other");
}

function parseReligiousBackground(
	religiousBackground: string,
): Therapist["religiousBackground"] {
	return parseOneField(religiousBackground, validReligiousBackgrounds, "Other");
}

function parseTreatmentModality(
	treatmentModality: string,
): Therapist["treatmentModality"] {
	return parseManyField(
		treatmentModality,
		validTreatmentModalities,
		"Therapist's Recommendation",
	);
}

function parseAreasOfSpecialization(
	areasOfSpecialization: string,
): Therapist["areasOfSpecialization"] {
	return parseManyField(
		areasOfSpecialization,
		validAreasOfSpecialization,
		"Other",
	);
}

function parsePaymentMethods(
	paymentMethods: string,
): Therapist["paymentMethods"] {
	return parseManyField(paymentMethods, validPaymentMethods, "Self-pay");
}
