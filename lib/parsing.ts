"use server";

import csv from "csvtojson";
import {
	type Therapist,
	type RawTherapist,
	validGenders,
	validSexualOrientations,
	validReligiousBackgrounds,
	validTreatmentModalities,
	validAreasOfSpecialization,
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

// To parse a field that contains only one value of a set of possible values
function parseOneField<T extends string>(
	input: string,
	validValues: T[],
	defaultValue: T,
): T {
	return validate(input, validValues, defaultValue);
}

// Parse a field that contains many values of a set of possible values
function parseManyField<T extends string>(
	input: string,
	validValues: T[],
	defaultValue: T,
): T[] {
	const processedInput = splitData(input);
	const values = processedInput.map((value) =>
		validate(value, validValues, defaultValue),
	);
	return new Set(values).values().toArray();
}

export async function parseData(url: string): Promise<Therapist[]> {
	const rawData = await csv({ delimiter: "\t" }).fromFile(url);

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
	return splitData(ethnicIdentity);
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
	return splitData(location);
}

function parseBio(bio: string): Therapist["bio"] {
	return bio;
}

function parseSexualOrientation(
	sexualOrientation: string,
): Therapist["sexualOrientation"] {
	return parseOneField(sexualOrientation, validSexualOrientations, "Other");
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
