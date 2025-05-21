import { drizzle } from "../../configs/db.config";
import {
  member,
  reservation,
  reservationTimeSlot,
} from "../../db/migrations/schema";
import { eq } from "drizzle-orm";

export class ReservationRepository {
  async getAllReservations() {
    const result = await drizzle
      .select()
      .from(reservation)
      .leftJoin(
        reservationTimeSlot,
        eq(reservation.timeSlotId, reservationTimeSlot.id)
      )
      .leftJoin(member, eq(reservation.memberId, member.id));
    return result;
  }
}
