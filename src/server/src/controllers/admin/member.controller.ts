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
      const originPath = path.join(__dirname, "../../../public/distinct.xlsx");
      const updatedPath = path.join(
        __dirname,
        "../../../public/distinct-2.xlsx"
      );

      // 작업할 파일 결정 (updated 파일이 있으면 그것을 사용, 없으면 origin 사용)
      let workingFilePath = originPath;
      let startFromScratch = true;

      // 엑셀 파일 읽기
      const workbook = XLSX.readFile(workingFilePath);
      const sheetName = "distinct";
      const worksheet = workbook.Sheets[sheetName];
      const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 처리해야 할 memNo 목록 생성
      const pendingMemNos = [];

      // 헤더 행 제외하고 데이터 행 처리
      for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const memNo = data[rowIndex][0]?.toString();
        if (memNo) {
          pendingMemNos.push({
            memNo,
            rowIndex,
            eventId: data[rowIndex][1],
            eventData: data[rowIndex][2],
            createdAt: data[rowIndex][3],
          });
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

      // 엑셀 헤더 설정
      const headers = [
        "memNo",
        "eventId",
        "eventData",
        "createdAt",
        "bestshopNm",
      ];
      const excelData = [headers];

      // members를 배치로 나누기
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
        batchMembers.forEach((member) => {
          if (member) {
            memberInfoMap.set(member.memNo, member);
          }
        });

        // 현재 배치의 데이터를 엑셀 데이터에 추가
        batches[i].forEach((item) => {
          const memberInfo = memberInfoMap.get(item.memNo);
          excelData.push([
            item.memNo,
            item.eventId,
            item.eventData,
            item.createdAt,
            memberInfo?.bestshopNm || "",
          ]);
        });

        // 배치 사이에 잠시 대기
        if (i < batches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      // 새로운 워크시트 생성
      const newWorksheet = XLSX.utils.aoa_to_sheet(excelData);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Members");

      XLSX.writeFile(newWorkbook, updatedPath);

      res.success({
        message: "Excel file created successfully",
        filePath: updatedPath,
        totalProcessed: pendingMemNos.length,
      });
    } catch (error) {
      next(error);
    }
  };
}
