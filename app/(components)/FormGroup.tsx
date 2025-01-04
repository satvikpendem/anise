import type { ValidElements } from "@/lib/types";
import { CheckboxGroup } from "@radix-ui/themes";

type Props = ValidElements;

export default async function FormGroup({
	name,
	heading,
	subheading,
	elements,
}: Props) {
	return (
		<>
			<h2>{heading}</h2>
			<p className="text-gray-500 text-sm">{subheading}</p>
			<div className="flex flex-col items-start gap-4 p-4">
				<CheckboxGroup.Root name={name}>
					{elements.map((element) => (
						<CheckboxGroup.Item key={element} value={element}>
							{element}
						</CheckboxGroup.Item>
					))}
				</CheckboxGroup.Root>
			</div>
		</>
	);
}
