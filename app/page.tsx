"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { handleSubmit } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function Home() {
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
							{/* <div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-1.5"></div>
							</div> */}
							<div>
								<p>Test</p>
								{/* <ToggleGroup
									type="multiple"
									className="flex flex-col gap-2 align-top items-start pl-4"
								>
									<ToggleGroupItem value="1" className="w-full">
										Option 1
									</ToggleGroupItem>
									<ToggleGroupItem value="2">Option 2</ToggleGroupItem>
									<ToggleGroupItem value="3">Option 3</ToggleGroupItem>
								</ToggleGroup> */}
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
