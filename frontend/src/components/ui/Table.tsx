import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

const Table = <T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick, 
  className 
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-bg-surface/50 border-b border-border-dim">

          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className={`px-4 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider ${column.className}`}
              >

                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-dim">

          {data.length > 0 ? (
            data.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors duration-200 ${onRowClick ? 'cursor-pointer hover:bg-bg-surface/50' : ''}`}

              >
                {columns.map((column, index) => (
                  <td key={index} className={`px-4 py-4 text-sm text-text-primary ${column.className}`}>

                    {typeof column.accessor === 'function' 
                      ? column.accessor(item) 
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
