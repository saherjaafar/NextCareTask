import React, { useState } from 'react';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
export function Orderdatatable() {
    const columns = [
        {
            name: "ID",
            selector: row => [row.ID],
            sortable: true,
            cell: row => <div className="font-weight-bold">
                {row.ID}
            </div>,

        },

        {
            name: "INVOICE",
            selector: row => [row.Invoice],
            cell: row =>
                <div className="font-weight-bold">
                    {row.Invoice}
                </div>,
            sortable: true
        },
        {
            name: "NAME",
            selector: row => [row.Name],
            sortable: true,
            cell: row =>
                <div>
                    {row.Name}
                </div>
        },
        {
            name: "DATE",
            selector: row => [row.Date],
            sortable: true,
            cell: row =>
                <div>
                    {row.Date}
                </div>
        },
        {
            name: "TOTAL",
            selector: row => [row.Total],
            cell: row =>
                <div className="d-flex my-auto">

                    <span className="my-auto">{row.Total}</span>
                </div>,

            sortable: false,

        },
        {
            name: "WAREHOUSE",
            selector: row => [row.Warhouse],
            sortable: true,
            cell: row =>
                <div className="font-weight-semibold">
                    {row.Warhouse}
                </div>

        },
        {
            name: "STATUS",
            selector: row => [row.Status],
            sortable: true,
            cell: row =>
                <div>
                    <span className={`status bg-${row.Statusinfo}`}></span>
                    {row.Status}
                </div>
        },

        {
            name: "ACTIONS",
            selector: row => [row.ACTIONS],
            sortable: true,
            cell: row =>
                <div className="button-list" >

                    <OverlayTrigger
                        placement={row.Placement}
                        overlay={<Tooltip>File</Tooltip>}
                    >
                        <i className="ti ti-files btn"></i>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement={row.Placement}
                        overlay={<Tooltip> Edit</Tooltip>}
                    >
                        <i className="ti ti-pencil btn"></i>
                    </OverlayTrigger>

                </div>
        },
        {
            name: "DELETE",
            selector: row => [row.ACTIONS],
            sortable: true,
            cell: row =>
                <div className="button-list text-center" onClick={() => { click(row.ID) }}>
                    <OverlayTrigger
                        placement={row.Placement}
                        overlay={<Tooltip>  Delete</Tooltip>}
                    >
                        <i className="ti ti-trash"></i>
                    </OverlayTrigger>
                </div>
        },
    ];
    let data1 = [
        {

            ID: "#W83549801",
            Invoice: "2",
            Name: "Anna sthesia",
            Date: "08/11/2020",
            Total: "$1,000",
            Warhouse: "Boston",
            Status: "pending",
            Statusinfo: "warning",
            Placement: "top"
        },
        {
            ID: "#W83549802",
            Invoice: "5",
            Name: "Barb Dwyer",
            Date: "15/11/2020",
            Total: "$4,577",
            Warhouse: "Washington Dc",
            Status: "Delivered",
            Statusinfo: "success",
        },
        {
            ID: "#W83549803",
            Invoice: "3",
            Name: "Wilma Mumduya",
            Date: "17/11/2020",
            Total: "$4,500",
            Warhouse: "San Francisco",
            Status: "Delivered",
            Statusinfo: "success",
        },
        {
            ID: "#W83549804",
            Invoice: "4",
            Name: "Zack Lee",
            Date: "18/11/2020",
            Total: "$3,266",
            Warhouse: "Las Vegas",
            Status: " Refunded",
            Statusinfo: "info",
        },
        {
            ID: "#W83549805",
            Invoice: "5",
            Name: "Tom Foolery",
            Date: "20/11/2020",
            Total: "$1,30,000",
            Warhouse: "Los Angel",
            Status: "Cancelled",
            Statusinfo: "danger",
        },
        {
            ID: "#W83549806",
            Invoice: "6",
            Name: "Pat Agonia",
            Date: "22/11/2020",
            Total: "$2,535",
            Warhouse: "Chicago",
            Status: "Delivered",
            Statusinfo: "success",
        },
        {
            ID: "#W83549807",
            Invoice: "6",
            Name: "Mary Christmas",
            Date: "26/11/2020",
            Total: "$1,526",
            Warhouse: "Los Angels",
            Status: "Cancelled",
            Statusinfo: "danger",
        },
        {
            ID: "#W83549808",
            Invoice: "5",
            Name: "Ella Vator",
            Date: "29/11/2020",
            Total: "$1,500",
            Warhouse: "Chicago",
            Status: "pending",
            Statusinfo: "warning",
        },
        {
            ID: "#W83549809",
            Invoice: "8",
            Name: "Sharon Needles",
            Date: "01/12/2020",
            Total: "$2,30,000",
            Warhouse: "Uk",
            Status: "Delivered",
            Statusinfo: "success",
        },
        {
            ID: "#W835498010",
            Invoice: "7",
            Name: "Anne Fibbiyon",
            Date: "04/12/2020",
            Total: "$33,990",
            Warhouse: "Chicago",
            Status: " Refunded",
            Statusinfo: "info",
        },
        {
            ID: "#W835498011",
            Invoice: "1",
            Name: "Frank Senbeans",
            Date: "09/12/2020",
            Total: "$12,999",
            Warhouse: "Chicago",
            Status: "Cancelled",
            Statusinfo: "danger",
        },
        {
            ID: "#W835498012",
            Invoice: "12",
            Name: "Chris P. Bacon",
            Date: "12/12/2020",
            Total: "$15,993",
            Warhouse: "Brazil",
            Status: "Delivered",
            Statusinfo: "success",
        },
    ]

    let [data, setData] = useState(data1)

    var click = (id) => {
        let i = data.filter((e, index) => {
            return e.ID !== id
        })
        data1 = i
        setData(i)
    }
    const tableData = {
        columns,
        data,
    };

    return (

        <DataTableExtensions {...tableData} >
            <DataTable
                columns={columns}
                defaultSortAsc={false}
                // striped={true}
                pagination

            />
        </DataTableExtensions>

    );
}