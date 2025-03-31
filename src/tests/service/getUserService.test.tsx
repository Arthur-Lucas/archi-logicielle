// import { describe, it, expect } from "@jest/globals";
import { getUserService } from "../../services/getUserService";

describe("getUserService", () => {
  it("should return a valid user object", async () => {
    const userId = "123";
    const user = await getUserService(userId);

    expect(user).toHaveProperty("id", userId);
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("age");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.age).toBe("number");
  });
});
