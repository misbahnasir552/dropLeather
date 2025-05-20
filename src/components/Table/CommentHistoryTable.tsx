'use client';

import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';

function CommentHistoryTable({ data }: any) {
  const tableHeadings: string[] = ['Comment Date', 'Comment By', 'Comments'];

  return (
    <div>
      <table className="flex w-full flex-col">
        <thead>
          <tr className="flex w-full items-center justify-between rounded-lg bg-screen-grey px-6">
            {tableHeadings.map((heading, i, arr) => (
              <th
                key={i}
                className={`${
                  i === arr.length - 1 ? 'w-full' : 'w-1/6'
                } py-[17px] text-start`}
              >
                <H7>{heading}</H7>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, i: any) => (
            <tr
              key={i}
              className="flex w-full items-center justify-between border-b border-border-light px-6"
            >
              <td className={`w-1/6 py-[18px] text-start`}>
                <B3 textColor="text-secondary-base">{item.commentDate}</B3>
              </td>
              <td className={`w-1/6 py-[18px] text-start`}>
                <B3 textColor="text-secondary-base">{item.commentBy}</B3>
              </td>
              <td className={`w-full py-[18px] text-start`}>
                <B3 textColor="text-secondary-base">{item.comments}</B3>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentHistoryTable;
