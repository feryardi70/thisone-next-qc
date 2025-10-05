import { compareSync } from "bcrypt-ts";

function checkPass(password: string, dbpassword: string): boolean {
  const match = compareSync(password, dbpassword);

  return match;
}

export default checkPass;