"use server";

import { UserSignUpper } from "../../../../../src/backoffice/users/UserSignUpper";

type SignUpState = {
	success: boolean;
	message: string;
};

const userSignUpper = new UserSignUpper();

export async function signUp(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	_: any,
	formData: FormData,
): Promise<SignUpState> {
	try {
		await userSignUpper.signUp({
			id: crypto.randomUUID(),
			name: formData.get("name") as string,
			username: formData.get("username") as string,
			emailAddress: formData.get("emailAddress") as string,
		});

		return {
			success: true,
			message: "User registered",
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";

		return {
			success: false,
			message: message,
		};
	}
}
