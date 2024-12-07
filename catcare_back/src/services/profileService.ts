import prisma from "../client";

interface onboardingProfile {
	userId: number;
	jobDesc: string;
	price: number;
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
			},
		});

		if (!user) {
			throw new Error("user not found");
		}

		return user;
	}

	async onboardingProfile_catsitter(body: onboardingProfile) {
		const { userId, jobDesc, price } = body;
		//Verifica se o usuário já realizou o onboarding
		const userType = await this.prisma.user.findFirst({
			where: { id: body.userId, type: "SITTER" },
		});
		if (userType) {
			throw new Error("User already onboarded");
		}
		const onboarding = await this.prisma.catSitter.create({
			data: {
				userId,
				jobDesc,
				price,
			},
		});
		//Atualiza o tipo do usuário para SITTER após o onboarding
		const userUpdate = await this.prisma.user.update({
			where: { id: userId },
			data: {
				type: "SITTER",
			},
		});

		return onboarding && userUpdate;
	}
}

export default new ProfileService();
