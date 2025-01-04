import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { evaluatePreferences } from "@/lib/evaluation";

export default async function Results({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const data = await evaluatePreferences(searchParams);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle className="text-xl">Anise</CardTitle>
						<CardDescription>
							Here are the top three therapists that match your preferences:
						</CardDescription>
					</CardHeader>
					<CardContent>
						{data.map(
							({
								name,
								bio,
								ethnicIdentity,
								genderIdentity,
								availability,
								language,
								location,
								sexualOrientation,
								religiousBackground,
								treatmentModality,
								areasOfSpecialization,
								paymentMethods,
							}) => {
								const output = [
									{ bioType: availability, heading: "Availability" },
									{ bioType: ethnicIdentity, heading: "Ethnic Identity" },
									{ bioType: genderIdentity, heading: "Gender Identity" },
									{ bioType: language, heading: "Language" },
									{ bioType: sexualOrientation, heading: "Sexual Orientation" },
									{
										bioType: religiousBackground,
										heading: "Religious Background",
									},
									{ bioType: treatmentModality, heading: "Treatment Modality" },
									{
										bioType: areasOfSpecialization,
										heading: "Areas of Specialization",
									},
									{ bioType: location, heading: "Location" },
									{ bioType: paymentMethods, heading: "Payment Methods" },
								];

								return (
									<div key={name} className="flex flex-col gap-4 pb-4">
										<h2 className="underline text-lg">{name}</h2>
										<p className="text-sm">{bio}</p>
										{output.map(({ bioType, heading }) => (
											<div key={heading}>
												<h3>{heading}</h3>
												<ul className="text-sm list-disc pl-4">
													{Array.isArray(bioType) ? (
														bioType.map((bioType) => (
															<li key={bioType}>{bioType}</li>
														))
													) : (
														<li>{bioType}</li>
													)}
												</ul>
											</div>
										))}
									</div>
								);
							},
						)}
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
