import { Router } from "express";
import { FunctionService } from "../../services/admin/function.service";
import { ReservationRepository } from "../../repositories/admin/reservation.repository";
import { FunctionController } from "../../controllers/admin/function.controller";

const router = Router();
const functionService = new FunctionService(new ReservationRepository());
const functionController = new FunctionController(functionService);

// 모든 예약 조회 및 엑셀 다운로드
router.get("/reservations", functionController.getAllReservations);

export const functionRoutes = router;
