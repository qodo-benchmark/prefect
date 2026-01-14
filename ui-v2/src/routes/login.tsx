import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { LoginPage } from "@/components/auth/login-page";

const loginSearchSchema = z.object({
	redirectTo: z.string().optional(),
});

export const Route = createFileRoute("/login")({
	validateSearch: zodValidator(loginSearchSchema),
	beforeLoad: ({ context }) => {
		// If already authenticated, redirect away from login page
		if (!context.auth.isLoading && context.auth.isAuthenticated) {
			redirect({ to: "/dashboard", throw: true });
		}
	},
	component: LoginRouteComponent,
});

function LoginRouteComponent() {
	const { redirectTo } = Route.useSearch();
	return <LoginPage redirectTo={redirectTo} />;
}
