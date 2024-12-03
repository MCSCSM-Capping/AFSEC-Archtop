import { useState, useEffect } from 'react';
import { scannerData } from 'data/scannerData';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import DataGridFooter from 'components/common/DataGridFooter';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridApi,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  useGridApiRef,
} from '@mui/x-data-grid';

interface OrdersStatusTableProps {
  searchText: string;
}

// table functionality/editing. Also grabs json info from scannerData.ts
const CVETable = ({ searchText }: OrdersStatusTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
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
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // table definition and outline
  const columns: GridColDef[] = [
    // ID
    {
     field: 'id',
     headerName: 'ID',
     minWidth: 80,
     flex: 1,
     resizable: false,
    },
    // Scanner
    {
      field: 'scanner',
      headerName: 'Scanner',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan source
    {
      field: 'scan_source',
      headerName: 'Scan Source',
      flex: 1,
      minWidth: 180,
      resizable: false,
    },
    // Date CVE was found
    {
      field: 'scan_date',
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
    },
    // Scan protocol
    {
      field: 'protocol',
      headerName: 'Protocol',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan service
    {
      field: 'service',
      headerName: 'Service',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan product
    {
      field: 'product',
      headerName: 'Product',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan CVE ID
    {
      field: 'cve',
      headerName: 'CVE ID',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan title
    {
      field: 'title',
      headerName: 'CVE Description',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    // Scan information
    {
      field: 'scan_info',
      headerName: 'Other Information',
      headerAlign: 'left',
      align: 'right',
      sortable: false,
      minWidth: 120,
      flex: 4,
      resizable: false,
    },
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

  // stack overflow code:https://stackoverflow.com/questions/75213694/how-to-auto-increment-row-id-when-inserting-new-row-in-mui-data-grid
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
