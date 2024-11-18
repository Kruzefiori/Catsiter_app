import authService from "../authService";

describe("AuthService", () => {
  it("should create user", async () => {
    const user = {
      email: "test@test.com",
      name: "test12345678",
      password: "test12345678",
    };

    await expect(
      authService.signUp(user.email, user.name, user.password)
    ).resolves.not.toThrow();
  });
});
