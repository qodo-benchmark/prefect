import { useState } from "react";
import { z } from "zod";
import { TriggerSchema } from "@/components/automations/automations-wizard/automation-schema";
import { Button } from "@/components/ui/button";
import { JsonInput, type JsonInputOnChange } from "@/components/ui/json-input";
import { Label } from "@/components/ui/label";

type TriggerJsonInputProps = {
	value: string;
	onChange: (value: string) => void;
	error?: string;
};

function formatJson(
	value: string,
	onChange: (value: string) => void,
): void {
	try {
		const parsed: unknown = JSON.parse(value);
		onChange(JSON.stringify(parsed, null, 2));
	} catch {
		// Invalid JSON, do nothing
	}
}

function validate(
	json: string,
	setLocalError: (error: string | null) => void,
): boolean {
	try {
		const parsed: unknown = JSON.parse(json);
		TriggerSchema.parse(parsed);
		setLocalError(null);
		return true;
	} catch (e) {
		if (e instanceof SyntaxError) {
			setLocalError("Invalid JSON syntax");
		} else if (e instanceof z.ZodError) {
			setLocalError(e.errors[0]?.message ?? "Invalid trigger configuration");
		}
		return false;
	}
}

export const TriggerJsonInput = ({
	value,
	onChange,
	error,
}: TriggerJsonInputProps) => {
	const [localError, setLocalError] = useState<string | null>(null);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label>Trigger Configuration</Label>
				<Button variant="ghost" size="sm" onClick={() => formatJson(value, onChange)}>
					Format
				</Button>
			</div>
			<p className="text-sm text-muted-foreground">
				Edit the trigger configuration as JSON.{" "}
				<a
					href="https://docs.prefect.io/v3/automate/events/automations-triggers"
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-foreground"
				>
					View documentation
				</a>
			</p>
			<JsonInput
				value={value}
				onChange={onChange as JsonInputOnChange}
				onBlur={() => validate(value, setLocalError)}
			/>
			{(localError || error) && (
				<p className="text-sm text-destructive">{localError || error}</p>
			)}
		</div>
	);
};
