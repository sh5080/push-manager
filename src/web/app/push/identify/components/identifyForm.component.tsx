import React, { useState } from "react";

interface IdentifyFormProps {
  onSubmit: (formData: {
    name: string;
    identify: string;
    teamId: string;
    appId: string;
  }) => void;
  initialData?: {
    name: string;
    identify: string;
    teamId: string;
    appId: string;
  };
  submitText: string;
  onCancel: () => void;
}

export function IdentifyForm({
  onSubmit,
  initialData,
  submitText,
  onCancel,
}: IdentifyFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    identify: initialData?.identify || "",
    teamId: initialData?.teamId || "1",
    appId: initialData?.appId || "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">이름</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          식별자
        </label>
        <input
          type="text"
          value={formData.identify}
          onChange={(e) =>
            setFormData({ ...formData, identify: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">앱</label>
        <select
          value={formData.appId}
          onChange={(e) => setFormData({ ...formData, appId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="1">테스트</option>
          <option value="2">운영</option>
          <option value="3">둘 다 동일 식별자</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">팀</label>
        <select
          value={formData.teamId}
          onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="1">FREED</option>
          <option value="2">LG</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
