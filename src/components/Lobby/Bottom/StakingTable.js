import React from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columns = [
  {accessorKey: 'Day'},
  {accessorKey: 'Available AVC'},
  {accessorKey: 'Total Deposits'},
  {accessorKey: 'Your Deposits'},
  {accessorKey: 'AVC per 1 BNB'},
  {accessorKey: 'You Receive'},
  {accessorKey: 'Action'},
];

const tabelData = [];

const StakingTable = () => {
  const table = useReactTable({
    tabelData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div
      className="box-body nm-stak-23 mt-4"
      style={{
        boxShadow: "0 3px 20px #0000000f;display: inline-block",
        height: "auto",
      }}
    >
      <div
        className="p-5"
        style={{
          position: "relative",
          // padding: "0px",
          height: "fit-content",
          padding: "5px 3px",
        }}
      >
        <div
          className="card-header"
          style={{
            padding: "1px 0 8px 0px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
            borderBottom: "1px solid #eaedf1",
            backgroundColor: "#e1e0e6de",
            borderTopRightRadius: "6px",
            borderTopLeftRadius: "6px",
            marginLeft: "2px",
            marginRight: "2px",
          }}
        >
          <h4
            className="card-title"
            style={{
              fontSize: "18px",
              color: "#67656e7a",
              fontFamily: "sans-serif",
              paddingLeft: "14px",
              paddingTop: "8px",
            }}
          >
            Your stakes
          </h4>
          <div
            className=" relative"
            // onclick="hideFinished()"
            style={{
              paddingRight: "50px",
              top: "5px",
            }}
          >
            {" "}
            <div
              className="toggle button inline-block bg-theme-1 text-white"
              style={{
                backgroundColor: "#d6d5d8",
                color: "#919191b5",
                userSelect: "none",
                borderRadius: '0.375rem',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '3px 14px'
              }}
            >
              Hide finished stakes
            </div>
          </div>
          <div
            // onclick="refreshClick()"
            style={{
              height: "43px",
              position: "absolute",
              width: "43px",
              right: "0px",
              top: "0px",
              backgroundColor: "#c2c2c26b",
              borderTopRightRadius: "6px",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-refresh-cw mx-auto"
              style={{
                marginTop: "10px",
                color: "#8b8b8b",
              }}
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
        </div>
        <div>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody> */}
        </table>
        </div>
        <div className="card-body" style={{ overflow: "auto" }}>
          <div
            className="loading-tx-1"
            style={{
              textAlign: "center",
              padding: "15px",
              fontSize: "20px",
              fontFamily: "sans-serif",
              color: "#362f2f38",
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingTable;
