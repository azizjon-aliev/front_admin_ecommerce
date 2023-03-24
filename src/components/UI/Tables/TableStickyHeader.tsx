import { useState } from 'react';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import { TableHead } from '@mui/material';

import EditForm from '../Modals/EditForm.jsx';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}
interface Header {
  id: string;
  name: string;
}

interface Data {
  data: Array<any>;
  id: number;
  name?: string;
  title?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
}

interface ExamplePageProps {
  headers: Array<Header>;
  data: Array<Data>;
  service: any;
}

function TablePaginationActions(props: TablePaginationActionsProps,
  ) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}



export default function ExamplePage(props: ExamplePageProps) {
  const { headers, data } = props;
  // Define a state variable to control whether the EditForm component should be displayed
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(0);

  // Define event handlers to show/hide the EditForm component
  const handleOpen = () => setShowEditForm(true);
  const handleClose = () => setShowEditForm(false);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className="table-wrapper">
   <TableContainer component={Paper} className='table-container'>

      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead className="table-header">
            <TableRow className='table-header'>
              {headers.map((header) => (
                <TableCell component={'th'} key={header.id} >
                  {header.name}
                </TableCell>
              ))}
              <TableCell
                key="actions"
                className='table-actions'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
        <TableBody>

         {data ? 
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow 
              key={row?.id} 
              className='table-row'>
              <TableCell scope="row">
                {row?.name || row?.title || (row?.first_name ?? "-") + " " + (row?.last_name ?? "-")}
              </TableCell>
              <TableCell
                key="actions">
                <IconButton>
                  <EditIcon 
                    onClick={() => {
                      setSelectedDataId(row?.id);
                      handleOpen();
                    }
                    }
                  />  
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <PreviewIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) 
          :
          <TableRow>
            <TableCell>
              No data
            </TableCell>
          </TableRow>
          }

          {showEditForm && (
              <EditForm
                show={showEditForm}
                handleClose={handleClose}
                dataId={selectedDataId}
                service={props.service}
              />
          )}

          </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1}]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Box>
  );
}
