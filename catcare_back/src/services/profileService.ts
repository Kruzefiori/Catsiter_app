import prisma from "../client";

interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	complement?: string;
	number?: number;
}

interface SitterOnboardingProfile {
	userId: number;
	jobDesc: string;
	price: number;
	address: Address;
	attendancePlaces: string[];
}

interface OwnerOnboardingProfile {
	userId: number;
	address: Address;
}

class ProfileService {
	prisma = prisma;

	async getProfile(userId: number) {
		const user = await this.prisma.user.findFirst({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				name: true,
				address: {
					select: {
						street: true,
						city: true,
						state: true,
						zipCode: true,
						country: true,
						complement: true,
						number: true,
					},
				},
				type: true,
				onboardingDone: true,
				catSitter: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!user) {
			throw new Error("user not found");
		}

		const parsedUser = {
			id: user.id,
			email: user.email,
			name: user.name,
			address: {
				street: user.address?.street,
				city: user.address?.city,
				state: user.address?.state,
				zipCode: user.address?.zipCode,
				country: user.address?.country,
				complement: user.address?.complement,
				number: user.address?.number,
			},
			type: user.type,
			onboardingDone: user.onboardingDone,
			catSitterId: user.catSitter?.[0]?.id || null,
		};

		return parsedUser;
	}

	async onboardingProfileCatsitter(body: SitterOnboardingProfile) {
		const { userId, jobDesc, price, attendancePlaces, address } = body;

		const userType = await this.prisma.user.findFirst({
			where: { id: body.userId, type: "SITTER" },
		});
		if (userType) {
			await this.prisma.user.update({
				where: { id: userId },
				data: {
					onboardingDone: true,
					address: {
						create: {
							street: address.street,
							city: address.city,
							state: address.state,
							zipCode: address.zipCode,
							country: address.country,
							complement: address.complement,
							number: address.number,
						},
					},
				},
			});
			throw new Error("User already onboarded");
		}
		const onboarding = await this.prisma.catSitter.create({
			data: {
				userId: userId,
				jobDesc,
				price,
				attendancePlaces,
			},
		});

		const userUpdate = await this.prisma.user.update({
			where: { id: userId },
			data: {
				type: "SITTER",
				onboardingDone: true,
			},
		});

		return onboarding && userUpdate;
	}

	async onboardingProfileOwner(body: OwnerOnboardingProfile) {
		const { userId, address } = body;

		const userType = await this.prisma.user.findFirst({
			where: { id: body.userId, type: "OWNER" },
		});
		if (userType) {
			await this.prisma.user.update({
				where: { id: userId },
				data: {
					onboardingDone: true,
				},
			});
			throw new Error("User already onboarded");
		}
		const userUpdate = await this.prisma.user.update({
			where: { id: userId },
			data: {
				type: "OWNER",
				address: {
					create: {
						street: address.street,
						city: address.city,
						state: address.state,
						zipCode: address.zipCode,
						country: address.country,
						complement: address.complement,
						number: address.number,
					},
				},
				onboardingDone: true,
			},
		});

		return userUpdate;
	}

	async getAllCatSitters() {
		const catSitters = await this.prisma.catSitter.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						address: true,
						overallRating: true,
					},
				},
				requestsReceived: {
					select: {
						id: true,
						endDate: true,
						startDate: true,
						generalNotes: true,
						status: true,
						visits: {
							select: {
								id: true,
								durationInMinutes: true,
								status: true,
								visitDate: true,
								visitNotes: true,
							},
						},
					},
				},
			},
		});

		return catSitters.map((catSitter) => ({
			id: catSitter.id,
			name: catSitter.user.name,
			email: catSitter.user.email,
			address: catSitter.user.address,
			overallRating: catSitter.user.overallRating,
			jobDesc: catSitter.jobDesc,
			price: catSitter.price,
			requestsReceived: catSitter.requestsReceived,
		}));
	}
}

export default new ProfileService();
