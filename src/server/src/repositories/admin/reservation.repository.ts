import { drizzle } from "../../configs/db.config";
import { reservationContent } from "../../db/migrations/schema";
import { eq } from "drizzle-orm";

export class ReservationRepository {
  async getAllReservations() {
    const result = await drizzle.query.reservation.findMany({
      with: {
        timeSlot: {
          with: {
            content: {
              with: {
                host: true,
                space: true,
              },
            },
          },
        },
        hists: true,
        member: true,
      },
    });

    return result;
  }

  async updateContactInfo(id: string, contactInfo: string) {
    const result = await drizzle
      .update(reservationContent)
      .set({ contactInfo })
      .where(eq(reservationContent.id, id));
    return result;
  }
}
