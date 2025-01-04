import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { parseData } from "@/lib/parsing";
import { Label } from "@radix-ui/react-label";
import { CheckboxGroup } from "@radix-ui/themes";

export default async function Home() {
	const data = await parseData("./data/data.tsv");
	console.log(data);

	const handleSubmit = async (formData: FormData) => {
		"use server";
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Anise</CardTitle>
						<CardDescription>
							Please enter your preferences of therapy and we will find the best
							therapist for you.
						</CardDescription>
					</CardHeader>
					<form action={handleSubmit}>
						<CardContent>
							<h2>Test</h2>
							<div className="flex items-center gap-4 p-4">
								{/* <Checkbox name="test" value="test" id="test" />
								<label
									htmlFor="test"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Test
								</label> */}
								<CheckboxGroup.Root>
									<CheckboxGroup.Item value="test">Hello</CheckboxGroup.Item>
									<CheckboxGroup.Item value="test">Hello</CheckboxGroup.Item>
									<CheckboxGroup.Item value="test">Hello</CheckboxGroup.Item>
									<CheckboxGroup.Item value="test">Hello</CheckboxGroup.Item>
								</CheckboxGroup.Root>
							</div>
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
