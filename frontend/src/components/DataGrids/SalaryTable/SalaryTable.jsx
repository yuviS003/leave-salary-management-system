import { Box } from "@mui/material";
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
    width: 150,
    editable: true,
  },
  {
    field: "shortLeaveCount",
    headerName: "Total Short Leaves",
    width: 150,
  },
  {
    field: "longLeaveCount",
    headerName: "Total Long Leaves",
    width: 150,
  },
  {
    field: "totalLeaveCount",
    headerName: "Total Leaves",
    width: 150,
  },
  {
    field: "empBaseSalary",
    headerName: "Base Salary",
    width: 150,
  },
  {
    field: "empShortLeaveDeduction",
    headerName: "Short-Leave Deductions",
    width: 150,
  },
  {
    field: "empLongLeaveDeduction",
    headerName: "Long-Leave Deductions",
    width: 150,
  },
  {
    field: "empTdsDeduction",
    headerName: "TDS Deductions",
    width: 150,
  },
  {
    field: "empBonus",
    headerName: "Bonus",
    width: 150,
  },
  {
    field: "empTotalSalary",
    headerName: "Total Salary",
    width: 150,
  },
];

const SalaryTable = ({ isLoading, salaryData }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={isLoading}
          rows={salaryData.salaryData}
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

export default SalaryTable;
