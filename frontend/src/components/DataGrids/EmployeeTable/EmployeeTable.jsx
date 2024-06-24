import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "empId", headerName: "ID", width: 300 },
  {
    field: "empName",
    headerName: "Name",
    width: 150,
  },
  {
    field: "empEmail",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "empDob",
    headerName: "DOB",
    width: 110,
  },
  {
    field: "empPhone",
    headerName: "Contact No",
    width: 110,
  },
  {
    field: "empPan",
    headerName: "Pan No",
    width: 150,
  },
  {
    field: "empBaseSalary",
    headerName: "Base Salary",
    width: 150,
  },
  {
    field: "empType",
    headerName: "Employee Type",
    width: 150,
  },
  {
    field: "empPermission",
    headerName: "App Permission",
    width: 150,
  },
];

const EmployeeTable = ({ isLoading, empData }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={isLoading}
          rows={empData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableMultipleRowSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.empId}
        />
      </Box>
    </div>
  );
};

export default EmployeeTable;
