import { email, is, maxLength, minLength, string, uuid } from "valibot";
import prisma from "../../../prisma/client";

class UserSignUpper {
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
		if (is(string([uuid()]), id)) {
			if (is(string([maxLength(255)]), name)) {
				if (is(string([minLength(5), maxLength(32)]), username)) {
					if (is(string([email(), maxLength(255)]), emailAddress)) {
						try {
							const userById = prisma.user.findUnique({
								where: { id },
							});

							if (!userById) {
								const userByUsername = prisma.user.findUnique({
									where: { username },
								});

								if (!userByUsername) {
									const userByEmail = prisma.user.findUnique({
										where: { emailAddress },
									});

									if (!userByEmail) {
										await prisma.user.create({
											data: {
												id,
												name,
												username,
												emailAddress,
												createdAt: new Date(),
											},
										});
									} else {
										throw new Error(
											`User with email ${emailAddress} already exists`,
										);
									}
								} else {
									throw new Error(
										`User with username ${username} already exists`,
									);
								}
							} else {
								throw new Error(`User with id ${id} already exists`);
							}
						} catch (error) {
							// biome-ignore lint/complexity/noUselessCatch: <explanation>
							throw error;
						} finally {
							prisma.$disconnect();
						}
					} else {
						throw new Error("Email invalid");
					}
				}
			} else {
				throw new Error("Name invalid");
			}
		} else {
			throw new Error("ID should be a valid UUID");
		}
	}
}
