import bcrypt from "bcryptjs";

const hashed = await bcrypt.hash("vivensaa_admin", 10);
console.log(hashed);
