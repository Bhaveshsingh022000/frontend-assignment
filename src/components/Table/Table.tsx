import React, { useMemo } from "react";
import styles from "./Table.module.css";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

export type TableProps = {
  headers: string[];
  data: (string | number)[][];
  itemsPerPage: number;
  isLoading?: boolean;
};

const Table: React.FC<TableProps> = ({
  headers,
  data,
  itemsPerPage,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, data, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [itemsPerPage, data]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={styles.headerCell}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className={styles.loader}>
              <Spinner />
            </tr>
          ) : null}
          {isLoading ? null : (
            <>
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.tableRow}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={styles.tableCell}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className={styles.tablePaginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
