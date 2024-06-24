import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const LeaveTable = ({ leaveData, isLoading, updateLeaveStatus }) => {
  const columns = [
    { field: "leaveId", headerName: "ID", width: 300 },
    {
      field: "leaveApplyDate",
      headerName: "Applied On",
      width: 150,
    },
    {
      field: "leaveType",
      headerName: "Type",
      width: 150,
      editable: true,
    },
    {
      field: "leaveStartDate",
      headerName: "Leave From",
      width: 150,
    },
    {
      field: "leaveEndDate",
      headerName: "Leave To",
      width: 150,
    },
    {
      field: "leaveReason",
      headerName: "Reason",
      width: 150,
    },
    {
      field: "leaveStatus",
      headerName: "Status", // Pending, Approved, Rejected
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div className="flex gap-5 items-center h-full">
          <Button
            variant="contained"
            color="success"
            onClick={() => updateLeaveStatus(params.row, "approved")}
            size="small"
          >
            approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateLeaveStatus(params.row, "rejected")}
            size="small"
          >
            reject
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full overflow-x-auto">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={isLoading}
          rows={leaveData}
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
          getRowId={(row) => row.leaveId}
        />
      </Box>
    </div>
  );
};

export default LeaveTable;
