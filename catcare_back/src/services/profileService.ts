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

interface onboardingProfile {
	userId: number;
	jobDesc: string;
	price: number;
	attendancePlaces: Address[];
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
				address: true,
			},
		});

		if (!user) {
			throw new Error("user not found");
		}

		return user;
	}

	async onboardingProfileCatsitter(body: onboardingProfile) {
		const { userId, jobDesc, price, attendancePlaces } = body;

		const userType = await this.prisma.user.findFirst({
			where: { id: body.userId, type: "SITTER" },
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
		const onboarding = await this.prisma.catSitter.create({
			data: {
				userId,
				jobDesc,
				price,
			},
		});

		attendancePlaces.forEach(async (address) => {
			await this.prisma.address.create({
				data: {
					catSitterId: onboarding.userId,
					street: address.street,
					city: address.city,
					state: address.state,
					zipCode: address.zipCode,
					country: address.country,
					complement: address.complement,
					number: address.number,
				},
			});
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

	async getAllCatSitters() {
		const catSitters = await this.prisma.catSitter.findMany({
			include: {
				user: {
				  select: {
					name: true,
					email: true,
					address: true,
					overallRating: true,
				  },
				},
			},
		});
		
		
		return catSitters.map(catSitter => ({
			name: catSitter.user.name,
			email: catSitter.user.email,
			address: catSitter.user.address,
			overallRating: catSitter.user.overallRating,
			jobDesc: catSitter.jobDesc,
			price: catSitter.price,
		}));
	}
}

export default new ProfileService();
