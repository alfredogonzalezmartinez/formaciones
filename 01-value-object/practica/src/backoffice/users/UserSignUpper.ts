import { email, is, maxLength, minLength, string, uuid } from "valibot";
import prisma from "../../../prisma/client";

export class UserSignUpper {
	async signUp({
		id,
		name,
		username,
		emailAddress,
	}: {
		id: string;
		name: string;
		username: string;
		emailAddress: string;
	}): Promise<void> {
		this.#ensureArgumentsAreValid(id, name, username, emailAddress);

		try {
			await this.#ensureUserNotExistWith(id, username, emailAddress);

			await prisma.user.create({
				data: {
					id,
					name,
					username,
					emailAddress,
					createdAt: new Date(),
				},
			});
		} finally {
			prisma.$disconnect();
		}
	}

	async #ensureUserNotExistWith(
		id: string,
		username: string,
		emailAddress: string,
	): Promise<void> {
		const validations = [
			this.#ensureUserNotExistWithId(id),
			this.#ensureUserNotExistWithUsername(username),
			this.#ensureUserNotExistWithEmailAddress(emailAddress),
		];

		await Promise.all(validations);
	}

	async #ensureUserNotExistWithEmailAddress(
		emailAddress: string,
	): Promise<void> {
		const userByEmail = await prisma.user.findUnique({
			where: { emailAddress },
		});

		if (userByEmail) {
			throw new Error(`User with email ${emailAddress} already exists`);
		}
	}

	async #ensureUserNotExistWithUsername(username: string): Promise<void> {
		const userByUsername = await prisma.user.findUnique({
			where: { username },
		});

		if (userByUsername) {
			throw new Error(`User with username ${username} already exists`);
		}
	}

	async #ensureUserNotExistWithId(id: string) {
		const userById = await prisma.user.findUnique({
			where: { id },
		});

		if (userById) {
			throw new Error(`User with id ${id} already exists`);
		}
	}

	#ensureArgumentsAreValid(
		id: string,
		name: string,
		username: string,
		emailAddress: string,
	): void {
		this.#ensureIdIsValid(id);
		this.#ensureNameIsValid(name);
		this.#ensureUsernameIsValid(username);
		this.#ensureEmailAddressIsValid(emailAddress);
	}

	#ensureEmailAddressIsValid(emailAddress: string): void {
		if (!is(string([email(), maxLength(255)]), emailAddress)) {
			throw new Error("Email invalid");
		}
	}

	#ensureUsernameIsValid(username: string): void {
		if (!is(string([minLength(5), maxLength(32)]), username)) {
			throw new Error("Username should have a length between 5 and 32");
		}
	}

	#ensureNameIsValid(name: string): void {
		if (!is(string([minLength(1), maxLength(255)]), name)) {
			throw new Error("Name invalid");
		}
	}

	#ensureIdIsValid(id: string): void {
		if (!is(string([uuid()]), id)) {
			throw new Error("ID should be a valid UUID");
		}
	}
}
