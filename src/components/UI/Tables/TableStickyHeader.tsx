import * as React from 'react';
import {
  GridActionsCellItem,
  GridColDef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { StyledDataGrid } from '../Elements/Styled';
import EditForm from '../Modals/EditForm';
import PreviewForm from '../Modals/DetailForm';
import ConfirmForm from '../Modals/ConfirmForm';
import { ruRU } from "@mui/x-data-grid";
import { useFetching } from '../../../hooks/useFetching';
import useDebounce from '../../../hooks/useDebounce';
import LinearProgress from '@mui/material/LinearProgress';
import TypeSearch from '../Input/SearchInput';
import { FormControl, InputAdornment, TextField, createStyles, makeStyles } from '@mui/material';
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

type RowParams = {
  id?: number;
  row: {
    id: number;
    status: number;
  }
};

type Props = {
  headers: any[];
  service: any;
  // Form: any;
};


export default function Table(Props: Props) {
  // 👇 Add this state to handle the modals
  // const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [previewModalOpen, setPreviewModalOpen] = React.useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  // 👇 Add this state to handle the search input and debounce it
  const [search, setSearch] = React.useState<string>('');
  const [showClearIcon, setShowClearIcon] = React.useState("none");
  const debouncedSearch = useDebounce(search, 500);
  // 👇 Add this state to handle the selected row id and the data array
  const [selectedRow, setSelectedRow] = React.useState<RowParams>({row: {id: 0, status: 0}});
  const [data, setData] = React.useState<any[]>([]);

  // 👇 Add this state to handle the total number of rows
  const {isLoading, errors, fetching: getAll} = useFetching(async (search: string) => {
    await getData(search);
  });

  const getData = async (search: string) => {
    const response = await Props.service.getAll(search);
    setData(response.data.data)
  }

  // 👇 Add this effect to fetch the data on mount and when the limit or search changes
  React.useEffect(() => {
      getAll(search);
  }, [debouncedSearch]);


  // 👇 Add this effect to update the counter column when the data changes
  React.useEffect(() => {
    if (data.length > 0) {
      let counter = 1;
      data.forEach((row) => {
        row.counter = counter;
        counter++;
      });
    }
  }, [data]);

  // 👇 Add this function to handle the delete action on the row click event handler below 👇
  const deleteRow = React.useCallback((rowParams: RowParams) => () => {
      // @ts-ignore
      setSelectedRow(rowParams);
      setConfirmModalOpen(true);      
    }, []
    );
    
  // 👇 Add this function to handle the preview action on the row click event handler below 👇
  const previewRow = React.useCallback((rowParams: RowParams) => () => {
    // @ts-ignore
    setSelectedRow(rowParams.row);
    setPreviewModalOpen(true);
  }, []);
  
  // 👇 Add this function to handle the edit action on the row click event handler below 👇
  const editRow = React.useCallback((rowParams: RowParams) => () => {
    // @ts-ignore
    setSelectedRow(rowParams.row);
    setEditModalOpen(true); 
  }, []);
  
  const handleClick = (): void => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
    setSearch("");
    setShowClearIcon("none");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearch(event.target.value);
    setTimeout(() => {
      getData(search)
    }, 300);
  };
  
  // 👇 Add this function to handle the row click event 👇
  const columns: GridColDef[] = [
    { field: 'counter', headerName: '№', width: 10 },
    // map over the headers and return the columns
    ...Props.headers.map((header) => ({
      field: header.field,
      headerName: header.name,
      width: 150,
    })),
    
    {field: 'status', headerName: 'Статус', type: 'boolean', width: 150},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Подробнее"
          title='Подробнее'
          // @ts-ignore
          onClick={previewRow(params)}
        />,
        <GridActionsCellItem
        icon={<EditIcon />} 
        label="Редактировать"
        // @ts-ignore
        onClick={editRow(params)}
        showInMenu
        />,
        <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Удалить"
        // @ts-ignore
        onClick={deleteRow(params.id)}
        showInMenu
        />,  
      ],
    },
  ];
  
  // 👇 Return the table with the modals 👇
  return (
    <>
      <FormControl style={{
        margin: "0",
        marginBottom: "1rem"
      }}>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleChange}
          value={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <ClearIcon />
              </InputAdornment>
            )
          }}
        />
      </FormControl>
      <div className='table-wrapper'>
          {/* 👇 Edit Modal */}
          {/* <Props.Form
            allCategories={data}
          /> */}

          {/* 👇 Preview Modal */}
          <PreviewForm 
              open={previewModalOpen}
              dataId={selectedRow.id}
              service={Props.service}
              handleClose={() => {
              console.log('close');
              setPreviewModalOpen(false);
          }}/>

          {/* 👇 Confirm Modal */}
          <ConfirmForm
            open={confirmModalOpen}
            dataId={selectedRow}
            handleClose={() => {
              console.log('close');
              setConfirmModalOpen(false);
            }}
            service={Props.service}
            confirm={getData}
          />

        {/* 👇 Table  */}
        <StyledDataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection
          className='table-container'
          rows={data}
          columns={columns}
          slots={{
            loadingOverlay: LinearProgress,
          }}
          onRowSelectionModelChange={(e) => {
            console.log(e);

          }}
          pageSizeOptions={[10,20,30,50, 100]}
          loading={data.length === 0}
          
        />
      </div>
    </>
  ) 

}