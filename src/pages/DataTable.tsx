import React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "category", headerName: "Category", width: 130 },
  {
    field: "price",
    headerName: "Price",
    width: 130,
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    width: 90,
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setRows(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
}


export async function getServerSideProps() {
    const response = await axios.get('http://your-api-url-here/products');
    const products = response.data;
  
    return { props: { products } };
  }