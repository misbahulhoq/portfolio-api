import envVars from "../config/env";
import { User } from "../modules/user/user.model";

export async function seedAdmin() {
  const userExists = await User.findOne({ email: envVars.ADMIN_EMAIL });
  if (userExists) {
    console.log("Admin user exists.");
    return;
  } else {
    await User.create({
      email: envVars.ADMIN_EMAIL,
      password: envVars.ADMIN_PASS,
    });
  }
}
