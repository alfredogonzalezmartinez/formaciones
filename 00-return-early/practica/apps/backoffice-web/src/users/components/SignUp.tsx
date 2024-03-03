"use client";

import { Alert } from "@/libs/components/Alert";
import { useId } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "../actions/signUp";

export function SignUp() {
	const [state, formAction] = useFormState(signUp, null);

	const id = `sign-up-${useId()}`;

	if (state?.success) resetSignUp(id);

	return (
		<form
			id={id}
			action={formAction}
			className="bg-gray-300 text-black rounded-md p-8 border border-gray-600 max-w-sm mx-auto flex flex-col gap-2 sm:w-[450px]"
		>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="name"
					id="name"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					maxLength={255}
				/>
				<label
					htmlFor="name"
					className="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Name
				</label>
			</div>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="username"
					id="username"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					minLength={5}
					maxLength={32}
				/>
				<label
					htmlFor="username"
					className="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Username
				</label>
			</div>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="emailAddress"
					id="emailAddress"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					maxLength={255}
				/>
				<label
					htmlFor="emailAddress"
					className="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Email address
				</label>
			</div>

			<SignUpButton />

			{state && (
				<Alert class="mt-5" type={state.success ? "success" : "danger"}>
					<span className="font-medium">{state.message}</span>
				</Alert>
			)}
		</form>
	);
}

function SignUpButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
			type="submit"
			aria-disabled={pending}
			disabled={pending}
		>
			Sign Up
		</button>
	);
}

function resetSignUp(id: string) {
	const form = window.document.getElementById(id) as HTMLFormElement;
	form.reset();
}
