import { SignUp } from "@/users/components/SignUp";

export default function Home() {
	return (
		<main className="bg-gray-900 text-white flex min-h-screen flex-col items-center justify-center">
			<SignUp />
		</main>
	);
}
