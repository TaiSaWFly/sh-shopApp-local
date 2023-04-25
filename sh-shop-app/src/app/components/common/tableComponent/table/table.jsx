import React from "react";
import TableBody from "../TableBody/TableBody";
import TableFooter from "../TableFooter/TableFooter";
import TableHeader from "../TableHeader/TableHeader";

const Table = ({ columns, dataBody, dataFooter, children }) => {
  return (
    <table>
      {children || (
        <>
          <TableHeader {...{ columns }} />
          <TableBody {...{ columns, dataBody }} />
          {dataFooter && <TableFooter {...{ columns, dataFooter }} />}
        </>
      )}
    </table>
  );
};

export default Table;
