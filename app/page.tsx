import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import {
	validAreasOfSpecialization,
	type ValidElements,
	validEthnicIdentities,
	validGenders,
	validLocations,
	validPaymentMethods,
	validReligiousBackgrounds,
	validSexualOrientations,
	validTreatmentModalities,
} from "@/lib/types";
import FormGroup from "./(components)/FormGroup";
import { redirect } from "next/navigation";

const validElements: ValidElements[] = [
	{
		name: "ethnicIdentity",
		heading: "Preferred ethnic identity of your therapist",
		subheading: "Leave blank for any",
		elements: validEthnicIdentities,
	},
	{
		name: "genderIdentity",
		heading: "Preferred gender of your therapist",
		subheading: "Leave blank for any",
		elements: validGenders,
	},
	{
		name: "sexualOrientation",
		heading: "Preferred sexual orientation of your therapist",
		subheading: "Leave blank for any",
		elements: validSexualOrientations,
	},
	{
		name: "religiousBackground",
		heading: "Preferred religious background of your therapist",
		subheading: "Leave blank for any",
		elements: validReligiousBackgrounds,
	},
	{
		name: "treatmentModality",
		heading: "Preferred treatment modality of your therapist",
		subheading: "Leave blank for any",
		elements: validTreatmentModalities,
	},
	{
		name: "areasOfSpecialization",
		heading: "Preferred area of specialization of your therapist",
		subheading: "Leave blank for any",
		elements: validAreasOfSpecialization,
	},
	{
		name: "location",
		heading: "Preferred location of your therapist",
		subheading: "Leave blank for any",
		elements: validLocations,
	},
	{
		name: "paymentMethods",
		heading: "Preferred payment method of your therapist",
		subheading: "Leave blank for any",
		elements: validPaymentMethods,
	},
];

export default async function Home() {
	const handleSubmit = async (formData: FormData) => {
		"use server";

		const data: { [key: string]: string[] } = validElements.reduce(
			(acc, element) => {
				acc[element.name] = [];
				return acc;
			},
			{} as Record<string, string[]>,
		);

		for (const element of validElements) {
			const value = formData.getAll(element.name);
			if (value.length === 0) {
				data[element.name] = ["Any"];
			} else {
				data[element.name] = value.map(String);
			}
		}

		const searchParams = new URLSearchParams();

		for (const [key, values] of Object.entries(data)) {
			for (const value of values) {
				searchParams.append(key, value);
			}
		}

		const resultsPageUrl = `/results?${searchParams.toString()}`;

		redirect(resultsPageUrl);
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle className="text-xl">Anise</CardTitle>
						<CardDescription>
							Please enter your preferences of therapy and we will find the best
							therapist for you. Choose as many options for each category as you
							like.
						</CardDescription>
					</CardHeader>
					<form action={handleSubmit}>
						<CardContent>
							{validElements.map((element) => (
								<FormGroup key={element.name} {...element} />
							))}
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button type="submit" className="w-full">
								Submit
							</Button>
						</CardFooter>
					</form>
				</Card>
			</main>
		</div>
	);
}
