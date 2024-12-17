"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export function ExcelUploader() {
  const [identifiers, setIdentifiers] = useState<string[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      // 식별자 컬럼 추출 (예: 'identifier' 컬럼)
      const extractedIdentifiers = json.map((row: any) => row.identifier);
      setIdentifiers(extractedIdentifiers);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="mb-8 p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">대상자 엑셀 업로드</h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {identifiers.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            업로드된 대상자 수: {identifiers.length}명
          </p>
        </div>
      )}
    </div>
  );
}
