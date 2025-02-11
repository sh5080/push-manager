import { Section } from "@push-manager/web/app/common/components/dataDisplay/section.component";

interface CouponListProps {
  title: string;
  headers: string[];
  children: React.ReactNode;
}

export function CouponList({ title, headers, children }: CouponListProps) {
  return (
    <Section title={title}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </Section>
  );
}
