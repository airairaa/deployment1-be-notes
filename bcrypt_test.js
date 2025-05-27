import bcrypt from "bcryptjs";

async function testBcrypt() {
  const password = "password123";
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log("Hash:", hash);

  const match = await bcrypt.compare("password123", hash);
  console.log("Match (should be true):", match);

  const wrongMatch = await bcrypt.compare("wrongpassword", hash);
  console.log("Wrong match (should be false):", wrongMatch);
}

testBcrypt();
