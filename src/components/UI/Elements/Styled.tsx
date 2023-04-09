import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';

DataGrid

export const StyledDataGrid = styled(DataGrid)(() => ({
    "& ::-webkit-scrollbar": {
      width: "6px"
    },
    "& ::-webkit-scrollbar-track": {
      backgroundColor: "#f5f5f5"
    },
    "& ::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "#f5f5f5"
    }
  }));


export const StyledDialog = styled(Dialog)(() => ({
  "& ::-webkit-scrollbar": {
    width: "6px"
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#f5f5f5"
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
    backgroundColor: "#f5f5f5"
  }
}));