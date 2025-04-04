import { NextFunction, Request, Response } from "express";
import {
  GetMemberDto,
  GetMemberListDto,
  validateDto,
} from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";
import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";

export class MemberController {
  constructor(private readonly memberService: IMemberService) {}

  getMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetMemberDto, req.query);
      const members = await this.memberService.getMember(dto);

      res.success(members);
    } catch (error) {
      next(error);
    }
  };

  getMemberList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetMemberListDto, req.query);
      const members = await this.memberService.getMemberList(dto);

      const membersArray = members.map((member) => [
        member.memNo,
        member.createdAt,
      ]);
      // 엑셀 파일 생성할 경우
      // const workbook = XLSX.utils.book_new();
      // const worksheet = XLSX.utils.aoa_to_sheet(membersArray);
      // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // XLSX.writeFile(
      //   workbook,
      //   path.join(__dirname, "../../../public/members.xlsx")
      // );
      res.success(membersArray.length);
    } catch (error) {
      next(error);
    }
  };

  getMembersAccountInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const originPath = path.join(__dirname, "../../../public/origin.xlsx");
      const updatedPath = path.join(__dirname, "../../../public/updated.xlsx");

      // 작업할 파일 결정 (updated 파일이 있으면 그것을 사용, 없으면 origin 사용)
      let workingFilePath = originPath;
      let startFromScratch = true;

      if (fs.existsSync(updatedPath)) {
        workingFilePath = updatedPath;
        startFromScratch = false;
        console.log("기존 updated.xlsx 파일을 찾았습니다. 이어서 작업합니다.");
      }

      // 엑셀 파일 읽기
      const workbook = XLSX.readFile(workingFilePath);
      const sheetName = "Sheet2";
      const worksheet = workbook.Sheets[sheetName];
      const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 처리해야 할 memNo 목록 생성
      const pendingMemNos = [];

      // 헤더 행 제외하고 데이터 행 처리
      for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const memNo = data[rowIndex][0]?.toString();
        const bestshopNm = data[rowIndex][2];
        const address1 = data[rowIndex][5];
        const address2 = data[rowIndex][6];

        // bestshopNm 또는 address2가 비어있는 경우에만 처리 대상에 추가
        if (memNo && (!bestshopNm || !address1 || !address2)) {
          pendingMemNos.push({ memNo, rowIndex });
        }
      }

      console.log(`총 ${pendingMemNos.length}개의 항목을 처리해야 합니다.`);

      if (pendingMemNos.length === 0) {
        return res.success({
          message: "모든 데이터가 이미 처리되었습니다.",
          filePath: updatedPath,
        });
      }

      // 배치 크기 설정
      const batchSize = 100;
      const batches = [];

      // pendingMemNos를 배치로 나누기
      for (let i = 0; i < pendingMemNos.length; i += batchSize) {
        batches.push(pendingMemNos.slice(i, i + batchSize));
      }

      // 각 배치 처리
      for (let i = 0; i < batches.length; i++) {
        console.log(`처리 중: 배치 ${i + 1}/${batches.length}`);

        const batchMemNos = batches[i].map((item) => item.memNo);
        const batchMembers = await this.memberService.getMembersAccountInfo(
          batchMemNos
        );

        // 결과를 Map에 저장
        const memberInfoMap = new Map();
        batchMembers.forEach((member, index) => {
          if (member) {
            memberInfoMap.set(batchMemNos[index], member);
          }
        });

        // 현재 배치의 데이터 업데이트
        batches[i].forEach(({ memNo, rowIndex }) => {
          if (memberInfoMap.has(memNo)) {
            const memberInfo = memberInfoMap.get(memNo);
            // C열(2)에 bestshopNm 업데이트
            data[rowIndex][2] = memberInfo.bestshopNm || "";
            // F열(5)에 address1 업데이트
            data[rowIndex][5] = memberInfo.address1 || "";
            // G열(6)에 address2 업데이트
            data[rowIndex][6] = memberInfo.address2 || "";
          }
        });

        // 현재 상태를 파일로 저장
        const newWorksheet = XLSX.utils.aoa_to_sheet(data);
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          newWorkbook,
          newWorksheet,
          "UpdatedSheet2"
        );
        XLSX.writeFile(newWorkbook, updatedPath);

        console.log(`배치 ${i + 1} 처리 완료 및 파일 저장 완료`);

        // 배치 사이에 잠시 대기
        if (i < batches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      res.success({
        message: "Excel file updated successfully",
        filePath: updatedPath,
        totalProcessed: pendingMemNos.length,
      });
    } catch (error) {
      next(error);
    }
  };
}
