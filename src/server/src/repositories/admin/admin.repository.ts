import { drizzle } from "../../configs/db.config";
import { admin } from "../../db/schema";
import { eq } from "drizzle-orm";

export class AdminRepository {
  async findByEmail(email: string) {
    const result = await drizzle
      .select()
      .from(admin)
      .where(eq(admin.email, email));
    return result.length > 0 ? result[0] : null;
  }
}
