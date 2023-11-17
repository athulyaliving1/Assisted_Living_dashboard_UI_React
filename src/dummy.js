import './App.css';
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

function App() {
  const apiUrl = 'https://650bca9a47af3fd22f668048.mockapi.io/revenue';

  const [csvData, setCsvData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRevenueData(data);
        const csvDataToExport = data.map((item) => ({
          "Sno": item.id,
          "Branch": item.branch_name,
          "Patient ID": item.patient_id,
          "Patient Name": item.patient_name,
          "Invoice No": item.invoice_no,
          "Invoice Date": item.invoice_date,
          "Amount": item.amount,
          "Status": item.status,
          "Service Type": item.service_type,
        }));
        setCsvData(csvDataToExport);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const columns = [
    {
      name: 'Sno',
      cell: (row) => {
        const index = revenueData.indexOf(row);
        return (currentPage - 1) * rowsPerPage + index + 1;
      },
      sortable: true,
      width: '70px',
    },
    {
      name: 'Branch',
      selector: 'branch_name',
      sortable: true,
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'Patient Name',
      selector: 'patient_name',
      sortable: true,
    },
    {
      name: 'Invoice No',
      selector: 'invoice_no',
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },
    {
      name: 'Service Type',
      selector: 'service_type',
      sortable: true,
    },
  ];

  const handleExportSelected = () => {
    const selectedDataToExport = selectedRows.map((row) => ({
      "Sno": row.id,
      "Branch": row.branch_name,
      "Patient ID": row.patient_id,
      "Patient Name": row.patient_name,
      "Invoice No": row.invoice_no,
      "Invoice Date": row.invoice_date,
      "Amount": row.amount,
      "Status": row.status,
      "Service Type": row.service_type,
    }));
  
    // Sort the selected data by 'Sno' before exporting
    selectedDataToExport.sort((a, b) => a.Sno - b.Sno);
  
    // Create a CSVLink component with the sorted data
    return (
      <CSVLink
        data={selectedDataToExport}
        filename={"table_value.csv"}
        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#ed4880] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
          Export Selected as CSV
        </span>
      </CSVLink>
    );
  };

  return (
    <div className="App bg-[#F3F4F6] ">
       
      <div class="mx-auto container-fluid  border-solid border-1 border-white-500 h-full">
        <div className=' px-0 bg-[#F3F4F6] border-solid border-1 border-white-500 md:px-16'>
          <div className='bg-cyan-900'>
    <nav class="relative top-0 left-0 w-full z-10 bg-white lg:flex-row lg:flex-nowrap lg:justify-start flex items-center py-1 px-4 lg:bg-transparent">
<div class="w-full mx-aut0 items-center flex justify-between lg:flex-nowrap flex-wrap lg:px-6 px-4">
<img
          class="w-5/12 bg-white rounded-md xl:w-1/12 2xl:h-5/6 desktop:w-1/12 md:w-2/12 lg:w-2/12 mt-[5px] ml-[10px] shadow-md"
          src="https://www.athulyahomecare.com/lp/ophthalmology/Assest/logo.png"
          alt="logo"
        />
<div class="items-center w-full lg:flex lg:w-auto flex-grow duration-300 transition-all ease-in-out lg:h-auto-important hidden">
<h1 class="text-white text-center text-2xl flex-grow mr-[5px] md:mr-[150px]">Athulya Assisted Living Reports</h1>
<form class="flex flex-row flex-wrap items-center ml-auto mr-3 mt-3">
<div class="mb-3 pt-0"><input placeholder="Search here" type="text" class="border-transparent shadow px-3 py-2 text-sm  w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "/></div>
</form>
<div class="items-center flex"><span class="w-12 h-12 text-sm text-white bg-blueGray-300 inline-flex items-center justify-center rounded-full"><img alt="..." class="w-full rounded-full align-middle border-none shadow-lg" src="https://demos.creative-tim.com/notus-pro-react/static/media/team-1-800x800.fa5a7ac2.jpg"/></span></div>


</div>
</div>
</nav>
</div>      
   <main className="pt-10 bg-[#F3F4F6] border-0 border-white-500">
   <div className="mt-4">
   {selectedRows.length > 0 && handleExportSelected()}
      </div>
        <div className="grid col-1 bg-white shadow-sm border-solid border-1 border-white-500 mt-4 mb-20">
          
          <div className="rounded relative overflow-x-auto shadow-md sm:rounded-lg bg-white border-solid border-2">
          <DataTable
              columns={columns}
              data={revenueData}
              pagination
              paginationPerPage={rowsPerPage}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              paginationTotalRows={revenueData.length}
              paginationComponentOptions={{
                rowsPerPageText: "Rows per page:",
                rangeSeparatorText: "of",
                noRowsPerPage: false,
                selectAllRowsItem: true,
                selectAllRowsItemText: "All",
              }}
              selectableRows
              onSelectedRowsChange={(selectedRows) => {
                setSelectedRows(selectedRows.selectedRows);
              }}
              onTableUpdate={({ page, rowsPerPage }) => {
                setCurrentPage(page);
                setRowsPerPage(rowsPerPage);
              }}
            />
          </div>
        </div>
      </main>

        </div>
      </div>

    </div>
  );
}

export default App;
