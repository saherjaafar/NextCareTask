import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import differenceBy from "lodash/differenceBy";
// import { tableDataItems } from ""
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

function AdmissionsTable({ data, setData, loader }) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    //setSelectedRows(state.selectedRows);
  }, []);

  const columns = [
    {
      name: "Admission Date",
      selector: (row) => [row.StrDate],
      sortable: true,
    },
    {
      name: "Card Number",
      selector: (row) => [row.CardNumber],
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => [row.Insured],
      sortable: true,
    },
    {
      name: "Hospital",
      selector: (row) => [row.Hospital],
      sortable: true,
    },
    {
      name: "Medical Case",
      selector: (row) => [row.MedicalCase],
      sortable: true,
    },
    {
      name: "Estimated Cost",
      selector: (row) => [row.EstimatedCost],
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => [row.Status],
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => [
        <div className="button-list" key={row.Id}>
          <OverlayTrigger placement={"top"} overlay={<Tooltip>Edit</Tooltip>}>
            <i
              className="ti ti-pencil-alt btn"
              onClick={() => {
                navigate("/Admission/" + row.Id);
              }}
            ></i>
          </OverlayTrigger>
        </div>,
      ],
      sortable: true,
    },
  ];

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.FullName
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "AdminId"));
      }
      console.log("selectedRows", selectedRows);
    };

    return (
      <>
        <Button key="delete" onClick={handleDelete} icon="true">
          Delete
        </Button>
        <Button
          className="datatable-btn-space"
          key="publish"
          variant="danger"
          onClick={handleDelete}
          icon="true"
        >
          Publish
        </Button>
      </>
    );
  }, [data, selectedRows, toggleCleared]);
  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {loader == true ? (
        <div className="text-center">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <DataTableExtensions {...tableDatas}>
          <DataTable
            title
            columns={columns}
            data={data}
            //selectableRows
            contextActions={contextActions}
            //onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            pagination
          />
        </DataTableExtensions>
      )}
    </>
  );
}

export default AdmissionsTable;
