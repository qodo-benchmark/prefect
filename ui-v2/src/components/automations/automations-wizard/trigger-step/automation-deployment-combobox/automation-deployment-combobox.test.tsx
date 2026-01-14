import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPointerEvents } from "@tests/utils/browser";
import {
	beforeAll,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { AutomationDeploymentCombobox } from "./index";

describe("AutomationDeploymentCombobox", () => {
	beforeAll(() => {
		mockPointerEvents();
	});

	const renderComponent = (props: {
		selectedDeploymentIds?: string[];
		onSelectDeploymentIds?: (ids: string[]) => void;
	}) => {
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		});

		return render(
			<QueryClientProvider client={queryClient}>
				<AutomationDeploymentCombobox
					selectedDeploymentIds={props.selectedDeploymentIds ?? []}
					onSelectDeploymentIds={props.onSelectDeploymentIds ?? vi.fn()}
				/>
			</QueryClientProvider>,
		);
	};

	it("renders with 'All deployments' when no deployments are selected", () => {
		renderComponent({});

		expect(screen.getByText("All deployments")).toBeInTheDocument();
	});

	it("opens the combobox when clicked", async () => {
		const user = userEvent.setup();
		renderComponent({});

		const trigger = screen.getByRole("button", { name: "Select deployments" });
		await user.click(trigger);

		expect(
			screen.getByPlaceholderText("Search deployments..."),
		).toBeInTheDocument();
	});

	it("shows search input when combobox is opened", async () => {
		const user = userEvent.setup();
		renderComponent({});

		const trigger = screen.getByRole("button", { name: "Select deployments" });
		await user.click(trigger);

		await waitFor(() => {
			expect(
				screen.getByPlaceholderText("Search deployments..."),
			).toBeInTheDocument();
		});
	});
});
