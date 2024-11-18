import { useState, useEffect } from 'react';
import { format } from 'date-fns';
//imports the function in needed to set the table
import { scannerData } from 'data/scannerData';
// import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// import StatusChip from 'components/chips/StatusChip';
import IconifyIcon from 'components/base/IconifyIcon';
import DataGridFooter from 'components/common/DataGridFooter';

import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridApi,
  GridColDef,
  GridActionsCellItem,
  // GridRenderEditCellParams,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  useGridApiRef,
} from '@mui/x-data-grid';

interface OrdersStatusTableProps {
  searchText: string;
}

const CVETable = ({ searchText }: OrdersStatusTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  //this is where the data gets sent to the scannerData file and then the rest of this files sets it all up for the dashbaord table
  const [rows, setRows] = useState(scannerData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    //these are filters for it to delete
    // looks for a row id
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    //these are filters for it to delete
    // looks for a row id
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    //these are filters for it to delete
    //looks for a row id
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Data and some formatting for the scanner table
  const columns: GridColDef[] = [
    // Scanner
    {
      field: 'id',
      headerName: 'IP Address',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan source
    {
      field: 'scanSource',
      headerName: 'Scan Source',
      flex: 1,
      minWidth: 180,
      resizable: false,
    },
    // Date CVE was found
    {
      field: 'date',
      type: 'date',
      headerName: 'Date',
      editable: true,
      minWidth: 100,
      flex: 1,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon icon="mdi:calendar" color="neutral.main" fontSize="body1.fontSize" />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Date
          </Typography>
        </Stack>
      ),
      renderCell: (params) => format(new Date(params.value), 'MMM dd, yyyy'),
    },
    // Scan information found
    {
      field: 'scanInfo',
      headerName: 'Scan Info',
      headerAlign: 'left',
      align: 'right',
      sortable: false,
      minWidth: 120,
      flex: 4,
      resizable: false,
    },
    // Status of the CVE
    /* 
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 120,
      flex: 1,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.875}>
          <IconifyIcon
            icon="carbon:checkbox-checked-filled"
            color="neutral.main"
            fontSize="body1.fontSize"
          />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Status
          </Typography>
        </Stack>
      ),
      renderCell: (params) => {
        return (
          <Stack direction="column" alignSelf="center" justifyContent="center" sx={{ height: 1 }}>
            <StatusChip status={params.value} />
          </Stack>
        );
      },
      renderEditCell: (params: GridRenderEditCellParams) => {
        const handleChange = (event: SelectChangeEvent<string>) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: event.target.value,
          });
        };
        return (
          <Select value={params.value} onChange={handleChange} fullWidth>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
          </Select>
        );
      },
      editable: true,
    },
    {
      field: 'country',
      headerName: 'Country',
      sortable: false,
      flex: 1,
      minWidth: 120,
      resizable: false,
      editable: true,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon
            icon="healthicons:geo-location"
            color="neutral.main"
            fontSize="h5.fontSize"
          />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Country
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      headerAlign: 'right',
      align: 'right',
      sortable: false,
      minWidth: 120,
      flex: 1,
      resizable: false,
    },
    */
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      minWidth: 120,
      flex: 1,
      cellClassName: 'actions',
      resizable: false,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  color="primary.main"
                  icon="mdi:content-save"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Save"
              onClick={handleSaveClick(id)}
              size="small"
            />,
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  color="text.secondary"
                  icon="iconamoon:sign-times-duotone"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Cancel"
              onClick={handleCancelClick(id)}
              size="small"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <IconifyIcon
                icon="fluent:edit-32-filled"
                color="text.secondary"
                sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
              />
            }
            label="Edit"
            onClick={handleEditClick(id)}
            size="small"
          />,
          <GridActionsCellItem
            icon={
              <IconifyIcon
                icon="mingcute:delete-3-fill"
                color="text.secondary"
                sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
            size="small"
          />,
        ];
      },
    },
  ];


  //data grid for the table just like in stack
  //this the bottom half
  //maybe we move the function out of scannerData and add it all to here to makle ot work like in stack?
  return (
    <DataGrid
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      rowHeight={80}
      editMode="row"
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 6,
          },
        },
      }}
      checkboxSelection
      pageSizeOptions={[6]}
      disableColumnMenu
      disableVirtualization
      disableRowSelectionOnClick
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        pagination: DataGridFooter,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  );
};

export default CVETable;
