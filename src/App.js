import './App.css';
import React, { useState ,useEffect} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


function App() {
  const [fromDate, setFromDate] = useState(null); // from date sate
  const [toDate, setToDate] = useState(null); // to date state
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [branchLocations, setBranchLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");// selected country
  const [selectedState, setSelectedState] = useState("");// selected state
  const [selectedCity, setSelectedCity] = useState("");// selected city
  const [selectedBranches, setSelectedBranches] = useState("");// selected branch

  useEffect(() => {
    fetchCountries();
  }, []);

  //----------------------------------------------------------------Countries Data Fetching----------------------------------------------------------------

  const fetchCountries = async () => {
    try {
      // Simulating a response from your API
      const response = [{
        id: 1,
        label: 'India',
        value: '1',
      }];

      setCountries(response); // Set the response directly to state
      console.log(response);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
 //----------------------------------------------------------------States data Fetching----------------------------------------------------------------
 const fetchStates = async (countryId) => {
   console.log(countryId);
   try {
     const response = await fetch(
      `http://164.52.220.10:4040/api/branches/states?branch_country_id=${countryId}`
     );
     const data = await response.json();
     console.log("state",data);
     setStates(data);
   } catch (error) {
     console.error("Error fetching states:", error);
   }
 };

//---------------------------------------------------------------Cites data Fetching--------------------------------------------------------------------

const fetchCities = async (stateId) => {
  console.log(stateId);
  try {
    const response = await fetch(
      `http://164.52.220.10:4040/api/branches/cities?branch_state_id=${stateId}`
    );
    const data = await response.json();
    setCities(data);
    console.log("city",data);
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

//---------------------------------------------------------------Location data Fetching--------------------------------------------------------------------

const fetchBranchLocations = async (cityId) => {
  console.log(cityId);

  try {
    const response = await fetch(
      `http://164.52.220.10:4040/api/branches/location?branch_city_id=${cityId}`
    );
    const data = await response.json();
    setBranchLocations(data);
    console.log("branch",data);
  } catch (error) {
    console.error("Error fetching branch locations:", error);
  }
};

  
const handleCountryChange = (e) => {
  const countryId = e.target.value;
  setSelectedCountry(countryId);
  fetchStates(countryId);
  setSelectedState("");
  console.log(countryId);
  setCities([]);
};

//--------------------------------------------------------------- Get State Id --------------------------------------------------------------------------------
const handleStateChange = (e) => {
  const stateId = e.target.value;
  setSelectedState(stateId);
  fetchCities(stateId);
  console.log(stateId);
};
  //--------------------------------------------------------------- Get City Id --------------------------------------------------------------------------------
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    fetchBranchLocations(cityId);
    console.log(cityId);
  };

  //--------------------------------------------------------------- Get Location Id --------------------------------------------------------------------------------
  const handleLocationChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranches(branchId);
    console.log(branchId);
  };


    //from date setstate

  const handleFromDate = (date) => {
    setFromDate(date);
  };

    //to date setstate

  const handleToDate = (date) => {
    setToDate(date);
  }


      // ----------------- LOADING STATES  --------------------------//
      const [isLoading, setIsLoading] = useState(false);
      
      // ----------------- REVENUE BOX STATES  --------------------------//
      const [Billinvoicetotal, setBillinvoicetotal] = useState([]);
      const [Fbtotal, setFbtotal] = useState([]);
      const [Pstotal, setPstotal] = useState([]);
      const [Sestotal, setSestotal] = useState([]);
      const [Meqtotal, setMeqtotal] = useState([]);
      const [Medialcaretotal, setMedialcaretotal] = useState([]);
      const [Personalcaretotal, setPersonalcaretotal] = useState([]);

        // ----------------- CONSOLIDATED BILL BOX STATE  --------------------------//
      const [Cbtotal, setCbtotal] = useState([]);

        // ----------------- INVOICE PENDING BOX STATE  --------------------------//
      const [Ipendingtotal, setIpendingtotal] = useState([]);

        // ----------------- INVOICE RECIEPT BOX STATE  --------------------------//
      const [Ipaidtotal, setIpaidtotal] = useState([]);
      const [Ipartialtotal, setIpartialtotal] = useState([]);

        // ----------------- REVENUE TABLE STATES  --------------------------//
      const [Billinvoicedata, setBillinvoicedata] = useState([{}]);
      const [Fbdata, setFbdata] = useState([{}]);
      const [Psdata, setPsdata] = useState([{}]);
      const [Sesdata, setSesdata] = useState([{}]);
      const [Meqdata, setMeqdata] = useState([{}]);
      const [Ecdata, setEcdata] = useState([{}]);
      const [Pcdata, setPcdata] = useState([{}]);

       // ----------------- CONSOLIDATED BILL TABLE STATE  --------------------------//
      const [Cbdata, setCbdata] = useState([{}]);

       // ----------------- INVOICE PENDING TABLE STATE  --------------------------//
      const [Ipendingdata, setIpendingdata] = useState([{}]);

       // ----------------- INVOICE PENDING TABLE STATE  --------------------------//
      const [Ipaiddata, setIpaiddata] = useState([{}]);
      // const [Ipartialdata, setIpartialdata] = useState([{}]);

      // -----------------REVENUE PIE-CHART STATES --------------------------//
      const [chartBillinvoicebranchtotal, setChartbillinvoicebranchtotal] = useState([]);
      const [chartFbbranchtotal, setChartFbbranchtotal] = useState([]);
      const [chartPsbranchtotal, setChartPsbranchtotal] = useState([]);
      const [chartSesbranchtotal, setChartSesbranchtotal] = useState([]);
      const [chartMeqbranchtotal, setChartMeqbranchtotal] = useState([]);

       // ----------------- CONSOLIDATED BILL PIE-CHART STATE  --------------------------//
      const [chartCbbranchtotal, setChartCbbranchtotal] = useState([]);

       // ----------------- INVOICE PENDING PIE-CHART STATE  --------------------------//
      const [chartIpendingbranchtotal, setChartIpendingbranchtotal] = useState([]);

       // ----------------- INVOICE PENDING PIE-CHART STATE  --------------------------//
      const [chartIpaidbranchtotal, setChartIpaidbranchtotal] = useState([]);
      const [chartIpartialbranchtotal, setChartIpartialbranchtotal] = useState([]);

     // -----------------  DEFAULT OR FILTER DATA IMPORTANT STATE  --------------------------//
      const [filterApplied, setFilterApplied] = useState(false);

      // ----------------- TABLE VIEW TYPE STATE  --------------------------//
      const [selecttype, setselecttype] = useState('Revenue');

     // ----------------- DEFAULT OR REVENUE OR CONSOLIDATEDBILL ALL DATA VIEWING IMPORTANT STATE  --------------------------//
      const [firstbar, setfirstbar] = useState(1);
      // const [secondbar, setsecondbar] = useState(true);
      // const [thirdbar, setthirdbar] = useState(true);
     
      
      // ----------------- Default & Filter Operation Commonly Used API Response Function  --------------------------//
      const extractAndFlattenData = (apiResponse) => {
        return [].concat(...apiResponse.filter(item => item.data && item.data.length > 0).map(item => item.data));
      };
     // ----------------- Filter Data Fetching --------------------------// 

      const fetchDataBasedOnFilter = async () => {
        setfirstbar(1);
        setIsLoading(true);
        // Define your stateParam, cityParam, branchParam, from_Date, and to_Date here
        const stateParam = selectedState; // Replace with the actual selectedState
        const cityParam = selectedCity; // Replace with the actual selectedCity
        const branchParam = selectedBranches; // Replace with the actual selectedBranches
  
        const from_Date = fromDate ? new Date(fromDate) : new Date();
  
        // Convert fromDate to the required format
        const fromYear = from_Date.getFullYear();
        const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
        const fromDay = String(from_Date.getDate()).padStart(2, '0');
        const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;
  
        // Get the current date if toDate is not selected
        const to_Date = toDate ? new Date(toDate) : new Date();
  
        // Convert toDate to the required format
        const toYear = to_Date.getFullYear();
        const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
        const toDay = String(to_Date.getDate()).padStart(2, '0');
        const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;
  
        try {
          const apiEndpoints = [
            `bill_invoice?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}&status=Paid`,
            `fb?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
            `procedural_service?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
            `staff_extra_service?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
            `medical_equipemts?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
            `emergency_care?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
            `personal_care?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
            `consolidated_bill?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`

          ];
  
          const responses = await Promise.all(apiEndpoints.map(endpoint => axios.post(`http://localhost:8080/${endpoint}`)));
  
          const [chartbillInvoiceResponse, fbResponse, ProceduralServiceResponse, ExtraServiceResponse, Eqresponse, medicalcaresponse, personalresponse,ConsolidatedResponse] = responses.map(response => response.data);
  
          setBillinvoicetotal(chartbillInvoiceResponse[0]);
          setFbtotal(fbResponse[0]);
          setPstotal(ProceduralServiceResponse[0]);
          console.log("procedrural service :",ProceduralServiceResponse[0]);
          setSestotal(ExtraServiceResponse[0]);
          setMeqtotal(Eqresponse[0]);
          setMedialcaretotal(medicalcaresponse[0]);
          setPersonalcaretotal(personalresponse[0]);
          setCbtotal(ConsolidatedResponse[0]);
          setIpendingtotal(ConsolidatedResponse[0]);
          setIpaidtotal(ConsolidatedResponse[0]);
          setIpartialtotal(ConsolidatedResponse[0]);

  
          setBillinvoicedata(extractAndFlattenData(chartbillInvoiceResponse));
          setFbdata(extractAndFlattenData(fbResponse));
          setPsdata(extractAndFlattenData(ProceduralServiceResponse));
          setSesdata(extractAndFlattenData(ExtraServiceResponse));
          setMeqdata(extractAndFlattenData(Eqresponse));
          setEcdata(extractAndFlattenData(medicalcaresponse));
          setPcdata(extractAndFlattenData(personalresponse));
  
          const chartData1 = chartbillInvoiceResponse.slice(1).map(data => ({ branch_name: data.branch_name, total_total_amount: data.total_total_amount }));
          const chartData2 = fbResponse.slice(1).map(data => ({ branch_name: data.branch_name, total_fb_amount: data.total_fb_amount }));
          const chartData3 = ProceduralServiceResponse.slice(1).map(data => ({ branch_name: data.branch_name, total_procedure_service_amount: data.total_procedure_service_amount }));
          const chartData4 = ExtraServiceResponse.slice(1).map(data => ({ branch_name: data.branch_name, total_staff_extra_service_amount: data.total_staff_extra_service_amount }));
          const chartData5 = Eqresponse.slice(1).map(data => ({ branch_name: data.branch_name, total_medical_equipment_amount: data.total_medical_equipment_amount }));
  
          setChartbillinvoicebranchtotal(chartData1);
          setChartFbbranchtotal(chartData2);
          setChartPsbranchtotal(chartData3);
          setChartSesbranchtotal(chartData4);
          setChartMeqbranchtotal(chartData5);
          setselecttype('Revenue');
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setIsLoading(false);
          setfirstbar(2);
        }
      };

 // ----------------- Default Page Data Fetching --------------------------// 

      // const fetchDefaultData = async () => {
      //   const from_Date = new Date();

      //   // Convert fromDate to the required format
      //   const fromYear = from_Date.getFullYear();
      //   const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
      //   const fromDay = String(from_Date.getDate()).padStart(2, '0');
      //   const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;

      //   // Get the current date if toDate is not selected
      //   const to_Date = new Date();
      //   const test2 = new Date();

      //   console.log("next Date :",test2);

      //   // Convert toDate to the required format
      //   const toYear = to_Date.getFullYear();
      //   const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
      //   const toDay = String(to_Date.getDate()+1).padStart(2, '0');
      //   const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;
      //   setfirstbar(true);
      //   setIsLoading(true);

      //   try {
      //     const apiEndpoints = [
      //       `bill_invoice?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}&status=Paid`,
      //       `fb?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      //       `procedural_service?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      //       `staff_extra_service?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      //       `medical_equipemts?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      //       `emergency_care?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      //       `personal_care?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      //       `consolidated_bill?state=&city=&branch=&start=${formattedFrom_Date}&end=${formattedTo_Date}`

            
      //     ];

      //     const responses = await Promise.all(apiEndpoints.map(endpoint => axios.post(`http://localhost:8080/${endpoint}`)));

      //     const [chartbillInvoiceResponse, fbResponse, ProceduralServiceResponse, ExtraServiceResponse, Eqresponse,medicalcaresponse, personalresponse, ConsolidatedResponse] = responses.map(response => response.data);

      //     setBillinvoicetotal(chartbillInvoiceResponse[0]);
      //     setFbtotal(fbResponse[0]);
      //     setPstotal(ProceduralServiceResponse[0]);
      //     console.log("procedrural service :",ProceduralServiceResponse[0]);
      //     setSestotal(ExtraServiceResponse[0]);
      //     setMeqtotal(Eqresponse[0]);
      //     setMedialcaretotal(medicalcaresponse[0]);
      //     setPersonalcaretotal(personalresponse[0]);
      //     setCbtotal(ConsolidatedResponse[0]);
      //     setIpendingtotal(ConsolidatedResponse[0]);
      //     setIpaidtotal(ConsolidatedResponse[0]);
      //     setIpartialtotal(ConsolidatedResponse[0]);

  
      //     setBillinvoicedata(extractAndFlattenData(chartbillInvoiceResponse));
      //     setFbdata(extractAndFlattenData(fbResponse));
      //     setPsdata(extractAndFlattenData(ProceduralServiceResponse));
      //     setSesdata(extractAndFlattenData(ExtraServiceResponse));
      //     setMeqdata(extractAndFlattenData(Eqresponse));
      //     setEcdata(extractAndFlattenData(medicalcaresponse));
      //     setPcdata(extractAndFlattenData(personalresponse));

      //     const chartData1 = chartbillInvoiceResponse.slice(1).map(data => ({ branch: data.branch, total_total_amount: data.total_total_amount }));
      //     const chartData2 = fbResponse.slice(1).map(data => ({ branch: data.branch, total_fb_amount: data.total_fb_amount }));
      //     const chartData3 = ProceduralServiceResponse.slice(1).map(data => ({ branch: data.branch, total_procedure_service_amount: data.total_procedure_service_amount }));
      //     const chartData4 = ExtraServiceResponse.slice(1).map(data => ({ branch: data.branch, total_staff_extra_service_amount: data.total_staff_extra_service_amount }));
      //     const chartData5 = Eqresponse.slice(1).map(data => ({ branch: data.branch, total_medical_equipment_amount: data.total_medical_equipment_amount }));
  
      //     setChartbillinvoicebranchtotal(chartData1);
      //     setChartFbbranchtotal(chartData2);
      //     setChartPsbranchtotal(chartData3);
      //     setChartSesbranchtotal(chartData4);
      //     setChartMeqbranchtotal(chartData5);
      //     setselecttype('Revenue');
      //   } catch (error) {
      //     console.error('Error fetching data: ', error);
      //   } finally {
      //     setIsLoading(false);
      //     setfirstbar(false);
      //   }
      // };

       // ----------------- DEFAULT OR FILTER IF ELSE CONDITION--------------------------// 

      useEffect(() => {
        if (filterApplied) {
          fetchDataBasedOnFilter();
        } else {
          // fetchDefaultData();
        }
      }, [filterApplied]);

       // ----------------- FILTER BUTTON ONCLICK FUNCTION  --------------------------// 

      const handleFilterClick = () => {
        setFilterApplied(true);
        fetchDataBasedOnFilter(); // Add this line to fetch data immediately when the filter is applied.
      };


      // ----------------- Revenue Total  --------------------------//
    
      const totalAmount1 = Number(Billinvoicetotal.total_total_amount) || 0;
      const totalAmount2 = Number(Fbtotal.total_fb_amount) || 0;
      // const totalAmount3 = Number(Pstotal) || 0;
      const totalAmount3 = Number(Pstotal.total_procedure_service_amount) || 0;
      const totalAmount4 = Number(Sestotal.total_branch_staff_extra_amount) || 0;
      // const totalAmount5 = Number(Meqtotal) || 0;
      const totalAmount5 = Number(Meqtotal.total_medical_equipment_amount) || 0;
      // const totalAmount34 = Number(Medialcaretotal) || 0;
      const totalAmount34 = Number(Medialcaretotal.total_emergency_care_amount) || 0;
      const totalAmount35 = Number(Personalcaretotal.total_sum_personal_care) || 0;

      
      // Calculate the total sum
      const sum = totalAmount1 + totalAmount2 + totalAmount3 + totalAmount4 + totalAmount5 + totalAmount34 + totalAmount35;
      
      const RevenueGeneratedTotal = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(sum);
      
      console.log("RevenueGeneratedTotal", RevenueGeneratedTotal);
      
      console.log("billinvoicebranchtotal", totalAmount1);
      console.log("fbbranchtotal", totalAmount2);
      console.log("Psbranchtotal", totalAmount3);
      console.log("Esbranchtotal", totalAmount4);
      console.log("Eqbranchtotal", totalAmount5);
      console.log("emergency", totalAmount34);
      console.log("personal care", totalAmount35);
     // ----------------- Consolidated Bill Total--------------------------// 

      const totalAmount6 = Number(Cbtotal.total_branch_sum_all_statuses) || 0;

      const ConsolidatedTotal = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(totalAmount6);
      console.log("ConsolidatedTotal",ConsolidatedTotal);

     // ----------------- Invoice Pending Total--------------------------// 

      const totalAmount7 = Number(Ipendingtotal.total_branch_sum_pending) || 0;

      const InvoicePendingTotal = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(totalAmount7);
      console.log("InvoicePendingTotal",InvoicePendingTotal);

     // ----------------- Invoice Reaciept Total--------------------------// 

      const totalAmount8 = Number(Ipaidtotal.total_branch_sum_paid) || 0;
      const totalAmount9 = Number(Ipartialtotal.total_branch_sum_partial) || 0;
      const sum1= totalAmount8 + totalAmount9 ;
      const InvoiceRecieptTotal = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(sum1);
      console.log("InvoiceRecieptTotal",InvoiceRecieptTotal);


        //------------------------------------------------ OnClick ConsolidatedBill Data  ----------------------------------------------------------------

  const consolidatedBill = async () => {
    setfirstbar(3);

        // Define your stateParam, cityParam, branchParam, from_Date, and to_Date here
        const stateParam = selectedState; // Replace with the actual selectedState
        const cityParam = selectedCity; // Replace with the actual selectedCity
        const branchParam = selectedBranches; // Replace with the actual selectedBranches
  
        const from_Date = fromDate ? new Date(fromDate) : new Date();
  
        // Convert fromDate to the required format
        const fromYear = from_Date.getFullYear();
        const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
        const fromDay = String(from_Date.getDate()).padStart(2, '0');
        const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;
  
        // Get the current date if toDate is not selected
        const to_Date = toDate ? new Date(toDate) : new Date();
  
        // Convert toDate to the required format
        const toYear = to_Date.getFullYear();
        const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
        const toDay = String(to_Date.getDate()).padStart(2, '0');
        const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;
  
        try {
          const apiEndpoints = [
            `consolidated_bill?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`
          ];
  
          const responses = await Promise.all(apiEndpoints.map(endpoint => axios.post(`http://localhost:8080/${endpoint}`)));
  
          const [ ConsolidatedResponse] = responses.map(response => response.data);

          setCbtotal(ConsolidatedResponse[0]);
  
          setCbdata(extractAndFlattenData(ConsolidatedResponse));
  
          const chartData6 = ConsolidatedResponse.slice(1).map(data => ({ branch_name: data.branch_name, total_branch_sum_all_statuses: data.total_branch_sum_all_statuses }));
  
          setChartCbbranchtotal(chartData6);
          setselecttype('ConsolidatedBill');
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setIsLoading(false);
          setfirstbar(4);
        }
  }


   //------------------------------------------------ OnClick Invoice Pending Data  ----------------------------------------------------------------

   const invoicePending = async () => {
    setfirstbar(5);

    setIsLoading(true);
        // Define your stateParam, cityParam, branchParam, from_Date, and to_Date here
        const stateParam = selectedState; // Replace with the actual selectedState
        const cityParam = selectedCity; // Replace with the actual selectedCity
        const branchParam = selectedBranches; // Replace with the actual selectedBranches
  
        const from_Date = fromDate ? new Date(fromDate) : new Date();
  
        // Convert fromDate to the required format
        const fromYear = from_Date.getFullYear();
        const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
        const fromDay = String(from_Date.getDate()).padStart(2, '0');
        const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;
  
        // Get the current date if toDate is not selected
        const to_Date = toDate ? new Date(toDate) : new Date();
  
        // Convert toDate to the required format
        const toYear = to_Date.getFullYear();
        const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
        const toDay = String(to_Date.getDate()).padStart(2, '0');
        const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;
  
        try {
          const apiEndpoints = [
            `consolidated_bill?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`
          ];
  
          const responses = await Promise.all(apiEndpoints.map(endpoint => axios.post(`http://localhost:8080/${endpoint}`)));
  
          const [ IpendingResponse] = responses.map(response => response.data);

          setIpendingtotal(IpendingResponse[0]);
  
          const pendingextractAndFlattenData = (apiResponse) => {
            return [].concat(
              ...apiResponse
                .filter(item => item.data && item.data.length > 0)
                .map(item => ({
                  ...item,
                  data: item.data.filter(entry => entry.payment_status === 'Pending')
                }))
                .filter(item => item.data.length > 0)
                .map(item => item.data)
            );
          };
          setIpendingdata(pendingextractAndFlattenData(IpendingResponse));
  
          const chartData7 = IpendingResponse.slice(1).map(data => ({ branch_name: data.branch_name, total_branch_sum_pending: data.total_branch_sum_pending }));
  
          setChartIpendingbranchtotal(chartData7);
          setselecttype('InvoicePending');
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setIsLoading(false);
          setfirstbar(6);
        }
  }

   //------------------------------------------------ OnClick Invoice Pending Data  ----------------------------------------------------------------

   const invoiceReciept= async () => {
    setfirstbar(7);
    setIsLoading(true);
        // Define your stateParam, cityParam, branchParam, from_Date, and to_Date here
        const stateParam = selectedState; // Replace with the actual selectedState
        const cityParam = selectedCity; // Replace with the actual selectedCity
        const branchParam = selectedBranches; // Replace with the actual selectedBranches
  
        const from_Date = fromDate ? new Date(fromDate) : new Date();
  
        // Convert fromDate to the required format
        const fromYear = from_Date.getFullYear();
        const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
        const fromDay = String(from_Date.getDate()).padStart(2, '0');
        const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;
  
        // Get the current date if toDate is not selected
        const to_Date = toDate ? new Date(toDate) : new Date();
  
        // Convert toDate to the required format
        const toYear = to_Date.getFullYear();
        const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
        const toDay = String(to_Date.getDate()).padStart(2, '0');
        const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;
  
        try {
          const apiEndpoints = [
            `consolidated_bill?state=${stateParam}&city=${cityParam}&branch=${branchParam}&start=${formattedFrom_Date}&end=${formattedTo_Date}`
          ];
  
          const responses = await Promise.all(apiEndpoints.map(endpoint => axios.post(`http://localhost:8080/${endpoint}`)));
  
          const [ ConsolidatedResponse] = responses.map(response => response.data);

          setIpaidtotal(ConsolidatedResponse[0]);
          setIpartialtotal(ConsolidatedResponse[0]);
  
          
          const paidextractAndFlattenData = (apiResponse) => {
            const filteredData = apiResponse.filter(item => item.data && item.data.length > 0);
            const paidEntries = filteredData.flatMap(item => (
              item.data.filter(entry => entry.payment_status === 'Paid')
            ));
            return paidEntries;
          };
          
          setIpaiddata(paidextractAndFlattenData(ConsolidatedResponse));
          
          const chartData8 = ConsolidatedResponse.map(data => ({
            branch_name: data.branch_name,
            total_branch_sum_paid: data.total_branch_sum_paid
          }));
          
          const chartData9 = ConsolidatedResponse.map(data => ({
            branch_name: data.branch_name,
            total_branch_sum_partial: data.total_branch_sum_partial
          }));
          
          setChartIpaidbranchtotal(chartData8);
          setChartIpartialbranchtotal(chartData9);
          console.log("setChartIpaidbranchtotal(chartData8)",chartIpaidbranchtotal);
          console.log("setChartIpartialbranchtotal(chartData9)", chartIpartialbranchtotal);
          setselecttype('InvoiceReciept');
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setIsLoading(false);
          setfirstbar(8);
        }
  }




    // ----------------- PIE-CHART --------------------------//

  useEffect(() => {

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount);
    };

    const consolidateData = (data, keyExtractor) => {
      return data
        .filter(item => item.branch_name && item.branch_name !== 0) // Filter out undefined branch_name and 0 values
        .reduce((accumulator, item) => {
          const branchName = item.branch_name;
          console.log(`Consolidating data for branch: ${branchName}`);
          if (!accumulator[branchName]) {
            accumulator[branchName] = 0;
          }
          accumulator[branchName] += keyExtractor(item);
          return accumulator;
        }, {});
    };

    const combineDataSources1 = () => {
      const consolidatedData1 = consolidateData(chartBillinvoicebranchtotal, item => item.total_total_amount);
      const consolidatedData2 = consolidateData(chartFbbranchtotal, item => item.total_fb_amount);
      const consolidatedData3 = consolidateData(chartPsbranchtotal, item => item.total_procedure_service_amount);
      const consolidatedData4 = consolidateData(chartSesbranchtotal, item => item.total_staff_extra_service_amount);
      const consolidatedData5 = consolidateData(chartMeqbranchtotal, item => item.total_medical_equipment_amount);

      const combinedData = {};

      for (const branch_name in consolidatedData1) {
        if (consolidatedData1.hasOwnProperty(branch_name)) {
          combinedData[branch_name] = (
            (Number(consolidatedData1[branch_name]) || 0) +
            (Number(consolidatedData2[branch_name]) || 0) +
            (Number(consolidatedData3[branch_name]) || 0) +
            (Number(consolidatedData4[branch_name]) || 0) +
            (Number(consolidatedData5[branch_name]) || 0)
          );
        }
      }

      return combinedData;
    };

  const combineDataSources2 = () => {
    const consolidatedData1 = consolidateData(chartCbbranchtotal, item => item.total_branch_sum_all_statuses);

    const combinedData = {};

    for (const branch_name in consolidatedData1) {
      if (consolidatedData1.hasOwnProperty(branch_name)) {
        combinedData[branch_name] = (
          (Number(consolidatedData1[branch_name]) || 0)
        );
      }
    }

    return combinedData;
  };

  const combineDataSources3 = () => {
    const consolidatedData1 = consolidateData(chartIpendingbranchtotal, item => item.total_branch_sum_pending);

    const combinedData = {};

    for (const branch_name in consolidatedData1) {
      if (consolidatedData1.hasOwnProperty(branch_name)) {
        combinedData[branch_name] = (
          (Number(consolidatedData1[branch_name]) || 0)
        );
      }
    }

    return combinedData;
  };

  const combineDataSources4 = () => {
    const consolidatedData1 = consolidateData(chartIpaidbranchtotal, item => item.total_branch_sum_paid);
    const consolidatedData2 = consolidateData(chartIpartialbranchtotal, item => item.total_branch_sum_partial);


    const combinedData = {};

    for (const branch_name in consolidatedData1) {
      if (consolidatedData1.hasOwnProperty(branch_name)) {
        combinedData[branch_name] = (
          (Number(consolidatedData1[branch_name]) || 0) +
          (Number(consolidatedData2[branch_name]) || 0) 
        );
      }
    }

    return combinedData;
  };

  const combinedData1 = combineDataSources1();
  const combinedData2 = combineDataSources2();
  const combinedData3 = combineDataSources3();
  const combinedData4 = combineDataSources4();

  // Create data points from the combined data

  let dataPoints = [];

  // Modify the condition to check if dataPoints should be populated based on different bars
  if (firstbar === 2) {
    dataPoints = Object.entries(combinedData1)
      .filter(([branchName, sum]) => branchName && sum !== 0) // Filter out undefined branch_name and 0 values
      .map(([branchName, sum]) => ({
        name: branchName,
        y: sum,
        yValueFormatString: formatCurrency(sum)
      }));
  } else if (firstbar === 4) {
    dataPoints = Object.entries(combinedData2)
      .filter(([branchName, sum]) => branchName && sum !== 0) // Filter out undefined branch_name and 0 values
      .map(([branchName, sum]) => ({
        name: branchName,
        y: sum,
        yValueFormatString: formatCurrency(sum)
      }));
  } else if (firstbar === 6) {
    dataPoints = Object.entries(combinedData3)
      .filter(([branchName, sum]) => branchName && sum !== 0) // Filter out undefined branch_name and 0 values
      .map(([branchName, sum]) => ({
        name: branchName,
        y: sum,
        yValueFormatString: formatCurrency(sum)
      }));
  } else if (firstbar === 8) {
    dataPoints = Object.entries(combinedData4)
      .filter(([branchName, sum]) => branchName && sum !== 0) // Filter out undefined branch_name and 0 values
      .map(([branchName, sum]) => ({
        name: branchName,
        y: sum,
        yValueFormatString: formatCurrency(sum)
      }));
  }

  const branchid = {
    Perungudi : "1",
    Arumbakkam : "2",
    Neelankarai : "3",
    Pallavaram : "4",
    Kasavanahalli : "5",
    Hydrabad : "6",
    Kochi : "7",
    Coimbatore : "8",
    Maduravoyal : "9"
  }

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light",
      title: {
        text: "Branch Wise Pie-Chart",
        fontSize: 22,
        fontFamily: "sans",
        fontWeight: "bold",
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          let content = '';
          e.entries.forEach(function (entry) {
            content += entry.dataPoint.name + ": " + formatCurrency(entry.dataPoint.y) + "<br>";
          });
          return content;
        },
      },
      
      data: [{
        type: "pie",
        indexLabel: "{name}: {yValueFormatString}",
        startAngle: -180,
        dataPoints: dataPoints,
        click: (e) => {
          const dataPoint = e.dataPoint;
          const branchID = branchid[dataPoint.name]; // Get branch ID directly here
        
          if(firstbar === 2){
            handleDataPointClick(branchID); // Pass branchID to the function
           }
        }
      }],
    };

  const chart = new CanvasJS.Chart("chartContainer", options);
  chart.render();
}, [firstbar]);



const [Psservice, setPsservice] = useState([]);
const [Seservice, setSeservice] = useState([]);
const [Fbservice, setFbservice] = useState([]);
const [BIservice, setBIservice] = useState([]);

const [Psbranchdata, setPsbranchdata] = useState([{}]);
const [Sesbranchdata, setSesbranchdata] = useState([{}]);
const [Fbbranchdata, setFbbranchdata] = useState([{}]);
const [BIbranchdata, setBIbranchdata] = useState([{}]);


const handleDataPointClick = async (branchID) => {
  setIsLoading(true);


     console.log("branchID", branchID);
  const from_Date = fromDate ? new Date(fromDate) : new Date();

  // Convert fromDate to the required format
  const fromYear = from_Date.getFullYear();
  const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
  const fromDay = String(from_Date.getDate()).padStart(2, '0');
  const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;

  // Get the current date if toDate is not selected
  const to_Date = toDate ? new Date(toDate) : new Date();

  // Convert toDate to the required format
  const toYear = to_Date.getFullYear();
  const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
  const toDay = String(to_Date.getDate()).padStart(2, '0');
  const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;

  try {
    const apiEndpoints = [
      `procedural_service?branch=${branchID}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      `staff_extra_service?branch=${branchID}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      `fb?branch=${branchID}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
      `bill_invoice?branch=${branchID}&start=${formattedFrom_Date}&end=${formattedTo_Date}`,
    ];

    const responses = await Promise.all(apiEndpoints.map(endpoint => axios.post(`http://localhost:8080/${endpoint}`)));

    const [ProceduralServiceResponse,ExtraServiceResponse,fbResponse,billinvoiceResponse] = responses.map(response => response.data);

    const chartData7 = ProceduralServiceResponse.slice(1).map(data => ({ ps_service_type: data.service_type, total_procedure_service_amount: data.total_procedure_service_amount }));
    setPsservice(chartData7);
    console.log("procedrural service :",chartData7);

    const chartData8 = ExtraServiceResponse.slice(1).map(data => ({ ses_service_type: data.service_type, total_branch_staff_extra_amount: data.total_branch_staff_extra_amount }));
    setSeservice(chartData8);
    console.log("Staff Extra service :",chartData8);

    const chartData9 = fbResponse.slice(1).map(data => ({ fb_service_type: data.service_type, total_fb_amount: data.total_fb_amount }));
    setFbservice(chartData9);
    console.log("Fb :",chartData9);

    const chartData10 = billinvoiceResponse.slice(1).map(data => ({ bi_service_type: data.service_type, total_total_amount: data.total_total_amount }));
    setBIservice(chartData10);
    console.log("BillInvoice :",chartData10);




    const extractAndFlattenData1 = (apiResponse) => {
      return [].concat(...apiResponse.filter(item => item.data && item.data.length > 0).map(item => item.data));
    };
    setPsbranchdata(extractAndFlattenData1(ProceduralServiceResponse));
    setSesbranchdata(extractAndFlattenData1(ExtraServiceResponse));
    setFbbranchdata(extractAndFlattenData1(fbResponse));
    setBIbranchdata(extractAndFlattenData1(billinvoiceResponse));

   
    setselecttype('BranchData');
  } catch (error) {
    console.error('Error fetching data: ', error);
  }finally {
    setIsLoading(false);
  }

};


   // -----------------BAR-CHART --------------------------//
   const formatDataPoints = (service, typeKey, amountKey) => {
    return service.map(item => ({
      y: parseFloat(item[amountKey]) || 0,
      label: item[typeKey] || "",
    }));
  };
  
  // Format data points for each service
  const PsDataPoints = formatDataPoints(Psservice, 'ps_service_type', 'total_procedure_service_amount');
  const SesDataPoints = formatDataPoints(Seservice, 'ses_service_type', 'total_branch_staff_extra_amount');
  const FbDataPoints = formatDataPoints(Fbservice, 'fb_service_type', 'total_fb_amount');
  const BIDataPoints = formatDataPoints(BIservice, 'bi_service_type', 'total_total_amount');
  
  // Chart configuration
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Service Based Bar Chart",
    },
    axisX: {
      title: "Service Category",
      // reversed: true,
    },
    axisY: {
      title: "Amounts",
      includeZero: true,
      labelFormatter: function (e) {
        if (Math.abs(e.value) < 1000) {
          return CanvasJS.formatNumber(e.value);
        }
  
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log10(Math.abs(e.value)) / 3), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
      },
    },
    legend:{
      cursor: "pointer"  
    },
    data: [
      {
        type: "bar",
        showInLegend: true,
        name: "PS Service",
        indexLabel: "{label} : {y}",
        dataPoints: PsDataPoints,
        click: (e) => {
          console.log("Psbranchdata", e.dataPoint);
          setselecttype('PsBranchData');
        }
      },
      {
        type: "bar",
        showInLegend: true,
        name: "SE Service",
        indexLabel: "{label} : {y}",
        dataPoints: SesDataPoints,
        click: (e) => {
          console.log("Sesbranchdata", e.dataPoint);
          setselecttype('SesBranchData');
        }
      },
      {
        type: "bar",
        showInLegend: true,
        name: "FB Service",
        indexLabel: "{label} : {y}",
        dataPoints: FbDataPoints,
        click: (e) => {
          console.log("Fbbranchdata", e.dataPoint);
          setselecttype('FbBranchData');
        }
      },
      {
        type: "bar",
        showInLegend: true,
        name: "R/M Service",
        indexLabel: "{label} : {y}",
        dataPoints: BIDataPoints,
        click: (e) => {
          console.log("BIbranchdata", e.dataPoint);
          setselecttype('BIBranchData');
        }
      },
    ],
  };
// Assuming you have code to render the chart using CanvasJS library

  
  

  let tableContent;
          
    // ----------------- TABLE 1 STATES --------------------------// 

  const [currentPage1, setCurrentPage1] = useState(1); // pagination state
  const [rowsPerPage1, setRowsPerPage1] = useState(10); // row control state
  const [selectedRows1, setSelectedRows1] = useState([]);
  
     // ----------------- TABLE 1 SCOLUMN --------------------------// 
  const combinedColumns1 = [
    {
      name: 'Sno',
      cell: (row, rowIndex) => {
        const index = mergedData1.indexOf(row) + 1;
        return index;
      },
      sortable: true,
      width: '70px',
    },    
    {
      name: 'Branch Name',
      selector: 'branch_name',
      sortable: true,
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: 'last_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      cell: (row) => {
        if (row.invoice_date) {
          const originalDate = row.invoice_date; // Assuming invoice_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        } else if (row.schedule_date) {
          const originalDate = row.schedule_date; // Assuming schedule_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        }
        return ''; // Return empty string if neither invoice_date nor schedule_date exists
      },
    },    
    {
      name: 'Service Type',
      selector: 'rental_type',
      width:"150px",
      sortable: true,
      cell: (row) => {
        if (row.rental_type) {
          return <span>{row.rental_type}</span>;
        } else if (row.procedure_service_name) {
          return <span>{row.procedure_service_name}</span>;
        }else if (row.item_name) {
          return <span>{row.item_name}</span>;
        } 
        else if (row.service) {
          return <span>{row.service}</span>;
        }
        else if (row.care_taken) {
          return <span>{row.care_taken}</span>;
        }
        else {
          return null; // You might want to handle the case when neither rental_type nor procedure_service_name is defined.
        }
      },
    },      
    {
      name: 'Status',
      selector: 'payment_status',
      sortable: true,
      cell: (row) => {
      if (row.payment_status) {
          return   <span
          className={`${row.payment_status === 'Cancelled'
            ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-red-100'
            : row.payment_status === 'Paid'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
            : row.payment_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.payment_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other payment_status
            }`}
        >
          {row.payment_status}
        </span>
        } else if (row.invoice_status) {
          return  <span
          className={`${row.invoice_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.invoice_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other invoice_status
            }`}
        >
          {row.invoice_status}
        </span>
        }
      }
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      width:"250px",
      cell: (row) => {
        if (row.fb_amount) {
          return ` ${ new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.fb_amount)} (FB)`;
        }
        else if (row.procedure_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.procedure_service_amount)} (PS)`;
        }
        else if (row.extra_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.extra_service_amount)} (SES)`;
        }
        else if (row.medical_equipment_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.medical_equipment_amount)} (MEQ)`;
        }
        else if (row.total_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.total_amount)} (Bill Invoice)`;
        }
        else if (row.emergency_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.emergency_care_amount)} (EC)`;
        }
        else if (row.personal_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.personal_care_amount)} (PC)`;
        }
      },
    },
  ];
  
   // ----------------- TABLE 1 FIVE API MERGE DATA --------------------------// 

  const mergedData1 = [...Billinvoicedata, ...Psdata, ...Meqdata, ...Fbdata, ...Sesdata, ...Ecdata, ...Pcdata];

   // ----------------- TABLE 1 CSV EXPORT FUNCTION --------------------------// 

  const handleExportSelected1 = () => {
    const selectedDataToExport1 = selectedRows1.map((row, index) => {
      let amount = null;
  
      if (row.fb_amount) {
        amount = row.fb_amount;
      } else if (row.procedure_service_amount) {
        amount = row.procedure_service_amount;
      } else if (row.extra_service_amount) {
        amount = row.extra_service_amount;
      } else if (row.medical_equipment_amount) {
        amount = row.medical_equipment_amount;
      } else if (row.total_amount) {
        amount = row.total_amount;
      }
  
      if (amount !== null) {
        amount = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(amount);
      }
  
      return {
        Sno:  mergedData1.indexOf(row) + 1,
        Branch: row.branch_name,
        'Patient ID': row.patient_id,
        'First Name': row.first_name,
        'Last Name': row.last_name,
        'Invoice Date': row.invoice_date,
        Amount: amount,
      };
    });
  
    selectedDataToExport1.sort((a, b) => a.Sno - b.Sno);
  
    return (
      <CSVLink
        data={selectedDataToExport1}
        filename="RevenueData.csv"
        className="group [transform:translateZ(0)] px-3 py-2 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[5] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
          Export Selected as CSV
        </span>
      </CSVLink>
    );
  };

   // ----------------- TABLE 2 STATES --------------------------// 

  const [currentPage2, setCurrentPage2] = useState(1); // pagination state
  const [rowsPerPage2, setRowsPerPage2] = useState(10); // row control state
  const [selectedRows2, setSelectedRows2] = useState([]);

   // ----------------- TABLE 2 COLUMN --------------------------// 

  const combinedColumns2 = [
    {
      name: 'Sno',
      cell: (row, rowIndex) => {
        const index = mergedData2.indexOf(row) + 1;
        return index;
      },
      sortable: true,
      width: '70px',
    },    
    {
      name: 'Branch Name',
      selector: 'branch_name',
      sortable: true,
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: 'last_name',
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'created_at',
      sortable: true,
      cell: (row) => {
        const originalDate = row.created_at; // Assuming created_at is a string in the format 'YYYY-MM-DD HH:mm:ss'
        const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
        return formattedDate;
      },
    },
    
    {
      name: 'Payment Status',
      selector: 'payment_status',
      sortable: true,
      cell: (row) => (
        <span
          className={`${row.payment_status === 'Pending'
            ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.payment_status === 'Paid'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
              : row.payment_status === 'Partial' // Add this condition for 'Partial'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
                : 'text-black' // Default color for other payment_statuses
            }`}
        >
          {row.payment_status}
        </span>
      ),
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      cell: (row) => {
        const amount = row.total_amount; // Assuming total_amount is a number
        const formattedAmount = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0, // Specify the number of decimal places
        }).format(amount);
  
        return formattedAmount;
      },
    },
  ];
  
   // ----------------- TABLE 2 ONE API MERGE DATA --------------------------// 

  const mergedData2 = [...Cbdata];

   // ----------------- TABLE 2 CSV EXPORT FUNCTION --------------------------// 

  const handleExportSelected2 = () => {
    const selectedDataToExport2 = selectedRows2.map((row, index) => {
      let amount = null;
  
    if (row.total_amount) {
        amount = row.total_amount;
      }
  
      if (amount !== null) {
        amount = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(amount);
      }
  
      return {
        Sno:  mergedData2.indexOf(row) + 1,
        Branch: row.branch_name,
        'Patient ID': row.patient_id,
        'First Name': row.first_name,
        'Last Name': row.last_name,
        'Invoice Date': row.created_at,
        'Payment Status': row.payment_status,
        Amount: amount,
      };
    });
  
    selectedDataToExport2.sort((a, b) => a.Sno - b.Sno);
  
    return (
      <CSVLink
        data={selectedDataToExport2}
        filename="ConsolidatedBill.csv"
        className="group [transform:translateZ(0)] px-3 py-2 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[5] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
          Export Selected as CSV
        </span>
      </CSVLink>
    );
  };

     // ----------------- TABLE 3 STATES --------------------------// 

     const [currentPage3, setCurrentPage3] = useState(1); // pagination state
     const [rowsPerPage3, setRowsPerPage3] = useState(10); // row control state
     const [selectedRows3, setSelectedRows3] = useState([]);
   
      // ----------------- TABLE 3 COLUMN --------------------------// 
   
     const combinedColumns3 = [
       {
         name: 'Sno',
         cell: (row, rowIndex) => {
           const index = mergedData3.indexOf(row) + 1;
           return index;
         },
         sortable: true,
         width: '70px',
       },    
       {
        name: 'Branch Name',
        selector: 'branch_name',
        sortable: true,
      },
       {
         name: 'Patient ID',
         selector: 'patient_id',
         sortable: true,
       },
       {
        name: 'First Name',
        selector: 'first_name',
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: 'last_name',
        sortable: true,
      },
      {
        name: 'Invoice Date',
        selector: 'created_at',
        sortable: true,
        cell: (row) => {
          const originalDate = row.created_at; // Assuming created_at is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        },
      },
      
       {
         name: 'Payment Status',
         selector: 'payment_status',
         sortable: true,
         cell: (row) => (
           <span
             className={`${row.payment_status === 'Pending'
               ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
               : row.payment_status === 'Paid'
                 ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                 : row.payment_status === 'Partial' // Add this condition for 'Partial'
                   ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
                   : 'text-black' // Default color for other payment_statuses
               }`}
           >
             {row.payment_status}
           </span>
         ),
       },
       {
         name: 'Amount',
         selector: 'total_amount',
         sortable: true,
         cell: (row) => {
           const amount = row.total_amount; // Assuming total_amount is a number
           const formattedAmount = new Intl.NumberFormat('en-IN', {
             style: 'currency',
             currency: 'INR',
             minimumFractionDigits: 0, // Specify the number of decimal places
           }).format(amount);
     
           return formattedAmount;
         },
       },
     ];
     
      // ----------------- TABLE 3 ONE API MERGE DATA --------------------------// 
   
     const mergedData3 = [...Ipendingdata];
   
      // ----------------- TABLE 3 CSV EXPORT FUNCTION --------------------------// 
   
     const handleExportSelected3 = () => {
       const selectedDataToExport3 = selectedRows3.map((row, index) => {
         let amount = null;
     
       if (row.total_amount) {
           amount = row.total_amount;
         }
     
         if (amount !== null) {
           amount = new Intl.NumberFormat('en-IN', {
             style: 'currency',
             currency: 'INR',
             maximumFractionDigits: 0
           }).format(amount);
         }
     
         return {
           Sno:  mergedData3.indexOf(row) + 1,
           Branch: row.branch_name,
        'Patient ID': row.patient_id,
        'First Name': row.first_name,
        'Last Name': row.last_name,
        'Invoice Date': row.created_at,
        'Payment Status': row.payment_status,
        Amount: amount,
         };
       });
     
       selectedDataToExport3.sort((a, b) => a.Sno - b.Sno);
     
       return (
         <CSVLink
           data={selectedDataToExport3}
           filename="InvoicePending.csv"
           className="group [transform:translateZ(0)] px-3 py-2 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[5] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
         >
           <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
             Export Selected as CSV
           </span>
         </CSVLink>
       );
     };
     // ----------------- TABLE 4 STATES --------------------------// 

     const [currentPage4, setCurrentPage4] = useState(1); // pagination state
     const [rowsPerPage4, setRowsPerPage4] = useState(10); // row control state
     const [selectedRows4, setSelectedRows4] = useState([]);
   
      // ----------------- TABLE 4 COLUMN --------------------------// 
   
     const combinedColumns4 = [
       {
         name: 'Sno',
         cell: (row, rowIndex) => {
           const index = mergedData4.indexOf(row) + 1;
           return index;
         },
         sortable: true,
         width: '70px',
       },    
       {
        name: 'Branch Name',
        selector: 'branch_name',
        sortable: true,
      },
       {
         name: 'Patient ID',
         selector: 'patient_id',
         sortable: true,
       },
       {
        name: 'First Name',
        selector: 'first_name',
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: 'last_name',
        sortable: true,
      },
      {
        name: 'Invoice Date',
        selector: 'created_at',
        sortable: true,
        cell: (row) => {
          const originalDate = row.created_at; // Assuming created_at is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        },
      },
      
       {
         name: 'Payment Status',
         selector: 'payment_status',
         sortable: true,
         cell: (row) => (
           <span
             className={`${row.payment_status === 'Pending'
               ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
               : row.payment_status === 'Paid'
                 ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                 : row.payment_status === 'Partial' // Add this condition for 'Partial'
                   ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
                   : 'text-black' // Default color for other payment_statuses
               }`}
           >
             {row.payment_status}
           </span>
         ),
       },
       {
         name: 'Amount',
         selector: 'total_amount',
         sortable: true,
         cell: (row) => {
           const amount = row.total_amount; // Assuming total_amount is a number
           const formattedAmount = new Intl.NumberFormat('en-IN', {
             style: 'currency',
             currency: 'INR',
             minimumFractionDigits: 0, // Specify the number of decimal places
           }).format(amount);
     
           return formattedAmount;
         },
       },
     ];
     
      // ----------------- TABLE 4 ONE API MERGE DATA --------------------------// 
   
     const mergedData4 = [...Ipaiddata];
   
      // ----------------- TABLE 4 CSV EXPORT FUNCTION --------------------------// 
   
     const handleExportSelected4 = () => {
       const selectedDataToExport4 = selectedRows4.map((row, index) => {
         let amount = null;
     
       if (row.total_amount) {
           amount = row.total_amount;
         }
     
         if (amount !== null) {
           amount = new Intl.NumberFormat('en-IN', {
             style: 'currency',
             currency: 'INR',
             maximumFractionDigits: 0
           }).format(amount);
         }
     
         return {
           Sno:  mergedData4.indexOf(row) + 1,
           Branch: row.branch_name,
           'Patient ID': row.patient_id,
           'First Name': row.first_name,
           'Last Name': row.last_name,
           'Invoice Date': row.created_at,
           'Payment Status': row.payment_status,
           Amount: amount,
         };
       });
     
       selectedDataToExport4.sort((a, b) => a.Sno - b.Sno);
     
       return (
         <CSVLink
           data={selectedDataToExport4}
           filename="InvoiceReciept.csv"
           className="group [transform:translateZ(0)] px-3 py-2 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[5] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
         >
           <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
             Export Selected as CSV
           </span>
         </CSVLink>
       );
     };


       // ----------------- TABLE 5 STATES --------------------------// 

  const [currentPage5, setCurrentPage5] = useState(1); // pagination state
  const [rowsPerPage5, setRowsPerPage5] = useState(10); // row control state
  const [selectedRows5, setSelectedRows5] = useState([]);
  
     // ----------------- TABLE 5 SCOLUMN --------------------------// 
  const combinedColumns5 = [
    {
      name: 'Sno',
      cell: (row, rowIndex) => {
        const index = mergedData5.indexOf(row) + 1;
        return index;
      },
      sortable: true,
      width: '70px',
    },    
    {
      name: 'Branch Name',
      selector: 'branch_name',
      sortable: true,
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: 'last_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      cell: (row) => {
        if (row.invoice_date) {
          const originalDate = row.invoice_date; // Assuming invoice_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        } else if (row.schedule_date) {
          const originalDate = row.schedule_date; // Assuming schedule_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        }
        return ''; // Return empty string if neither invoice_date nor schedule_date exists
      },
    },    
    {
      name: 'Service Type',
      selector: 'rental_type',
      width:"150px",
      sortable: true,
      cell: (row) => {
        if (row.rental_type) {
          return <span>{row.rental_type}</span>;
        } else if (row.procedure_service_name) {
          return <span>{row.procedure_service_name}</span>;
        }else if (row.item_name) {
          return <span>{row.item_name}</span>;
        } 
        else if (row.service) {
          return <span>{row.service}</span>;
        }
        else if (row.care_taken) {
          return <span>{row.care_taken}</span>;
        }
        else {
          return null; // You might want to handle the case when neither rental_type nor procedure_service_name is defined.
        }
      },
    },      
    {
      name: 'Status',
      selector: 'payment_status',
      sortable: true,
      cell: (row) => {
      if (row.payment_status) {
          return   <span
          className={`${row.payment_status === 'Cancelled'
            ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-red-100'
            : row.payment_status === 'Paid'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
            : row.payment_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.payment_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other payment_status
            }`}
        >
          {row.payment_status}
        </span>
        } else if (row.invoice_status) {
          return  <span
          className={`${row.invoice_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.invoice_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other invoice_status
            }`}
        >
          {row.invoice_status}
        </span>
        }
      }
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      width:"250px",
      cell: (row) => {
        if (row.fb_amount) {
          return ` ${ new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.fb_amount)} (FB)`;
        }
        else if (row.procedure_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.procedure_service_amount)} (PS)`;
        }
        else if (row.extra_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.extra_service_amount)} (SES)`;
        }
        else if (row.medical_equipment_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.medical_equipment_amount)} (MEQ)`;
        }
        else if (row.total_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.total_amount)} (Bill Invoice)`;
        }
        else if (row.emergency_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.emergency_care_amount)} (EC)`;
        }
        else if (row.personal_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.personal_care_amount)} (PC)`;
        }
      },
    },
  ];
  
   // ----------------- TABLE 5 FIVE API MERGE DATA --------------------------// 

  const mergedData5 = [...Psbranchdata, ...Sesbranchdata, ...Fbbranchdata, ...BIbranchdata];

       // ----------------- TABLE 6 STATES --------------------------// 

  const [currentPage6, setCurrentPage6] = useState(1); // pagination state
  const [rowsPerPage6, setRowsPerPage6] = useState(10); // row control state
  const [selectedRows6, setSelectedRows6] = useState([]);
  
     // ----------------- TABLE 5 SCOLUMN --------------------------// 
  const combinedColumns6 = [
    {
      name: 'Sno',
      cell: (row, rowIndex) => {
        const index = mergedData6.indexOf(row) + 1;
        return index;
      },
      sortable: true,
      width: '70px',
    },    
    {
      name: 'Branch Name',
      selector: 'branch_name',
      sortable: true,
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: 'last_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      cell: (row) => {
        if (row.invoice_date) {
          const originalDate = row.invoice_date; // Assuming invoice_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        } else if (row.schedule_date) {
          const originalDate = row.schedule_date; // Assuming schedule_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        }
        return ''; // Return empty string if neither invoice_date nor schedule_date exists
      },
    },    
    {
      name: 'Service Type',
      selector: 'rental_type',
      width:"150px",
      sortable: true,
      cell: (row) => {
        if (row.rental_type) {
          return <span>{row.rental_type}</span>;
        } else if (row.procedure_service_name) {
          return <span>{row.procedure_service_name}</span>;
        }else if (row.item_name) {
          return <span>{row.item_name}</span>;
        } 
        else if (row.service) {
          return <span>{row.service}</span>;
        }
        else if (row.care_taken) {
          return <span>{row.care_taken}</span>;
        }
        else {
          return null; // You might want to handle the case when neither rental_type nor procedure_service_name is defined.
        }
      },
    },      
    {
      name: 'Status',
      selector: 'payment_status',
      sortable: true,
      cell: (row) => {
      if (row.payment_status) {
          return   <span
          className={`${row.payment_status === 'Cancelled'
            ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-red-100'
            : row.payment_status === 'Paid'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
            : row.payment_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.payment_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other payment_status
            }`}
        >
          {row.payment_status}
        </span>
        } else if (row.invoice_status) {
          return  <span
          className={`${row.invoice_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.invoice_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other invoice_status
            }`}
        >
          {row.invoice_status}
        </span>
        }
      }
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      width:"250px",
      cell: (row) => {
        if (row.fb_amount) {
          return ` ${ new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.fb_amount)} (FB)`;
        }
        else if (row.procedure_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.procedure_service_amount)} (PS)`;
        }
        else if (row.extra_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.extra_service_amount)} (SES)`;
        }
        else if (row.medical_equipment_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.medical_equipment_amount)} (MEQ)`;
        }
        else if (row.total_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.total_amount)} (Bill Invoice)`;
        }
        else if (row.emergency_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.emergency_care_amount)} (EC)`;
        }
        else if (row.personal_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.personal_care_amount)} (PC)`;
        }
      },
    },
  ];
  
   // ----------------- TABLE 6 FIVE API MERGE DATA --------------------------// 

  const mergedData6 = [...Psbranchdata];

       // ----------------- TABLE 7 STATES --------------------------// 

  const [currentPage7, setCurrentPage7] = useState(1); // pagination state
  const [rowsPerPage7, setRowsPerPage7] = useState(10); // row control state
  const [selectedRows7, setSelectedRows7] = useState([]);
  
     // ----------------- TABLE 7 SCOLUMN --------------------------// 
  const combinedColumns7 = [
    {
      name: 'Sno',
      cell: (row, rowIndex) => {
        const index = mergedData7.indexOf(row) + 1;
        return index;
      },
      sortable: true,
      width: '70px',
    },    
    {
      name: 'Branch Name',
      selector: 'branch_name',
      sortable: true,
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: 'last_name',
      width:"150px",
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      cell: (row) => {
        if (row.invoice_date) {
          const originalDate = row.invoice_date; // Assuming invoice_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        } else if (row.schedule_date) {
          const originalDate = row.schedule_date; // Assuming schedule_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
          const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
          return formattedDate;
        }
        return ''; // Return empty string if neither invoice_date nor schedule_date exists
      },
    },    
    {
      name: 'Service Type',
      selector: 'rental_type',
      width:"150px",
      sortable: true,
      cell: (row) => {
        if (row.rental_type) {
          return <span>{row.rental_type}</span>;
        } else if (row.procedure_service_name) {
          return <span>{row.procedure_service_name}</span>;
        }else if (row.item_name) {
          return <span>{row.item_name}</span>;
        } 
        else if (row.service) {
          return <span>{row.service}</span>;
        }
        else if (row.care_taken) {
          return <span>{row.care_taken}</span>;
        }
        else {
          return null; // You might want to handle the case when neither rental_type nor procedure_service_name is defined.
        }
      },
    },      
    {
      name: 'Status',
      selector: 'payment_status',
      sortable: true,
      cell: (row) => {
      if (row.payment_status) {
          return   <span
          className={`${row.payment_status === 'Cancelled'
            ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-red-100'
            : row.payment_status === 'Paid'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
            : row.payment_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.payment_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other payment_status
            }`}
        >
          {row.payment_status}
        </span>
        } else if (row.invoice_status) {
          return  <span
          className={`${row.invoice_status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
            : row.invoice_status === 'Billed'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                : 'text-black' // Default color for other invoice_status
            }`}
        >
          {row.invoice_status}
        </span>
        }
      }
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      width:"250px",
      cell: (row) => {
        if (row.fb_amount) {
          return ` ${ new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.fb_amount)} (FB)`;
        }
        else if (row.procedure_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.procedure_service_amount)} (PS)`;
        }
        else if (row.extra_service_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.extra_service_amount)} (SES)`;
        }
        else if (row.medical_equipment_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.medical_equipment_amount)} (MEQ)`;
        }
        else if (row.total_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.total_amount)} (Bill Invoice)`;
        }
        else if (row.emergency_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.emergency_care_amount)} (EC)`;
        }
        else if (row.personal_care_amount) {
          return ` ${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(row.personal_care_amount)} (PC)`;
        }
      },
    },
  ];
  
   // ----------------- TABLE 7 FIVE API MERGE DATA --------------------------// 

  const mergedData7 = [...Sesbranchdata];

    // ----------------- TABLE 8 STATES --------------------------// 

    const [currentPage8, setCurrentPage8] = useState(1); // pagination state
    const [rowsPerPage8, setRowsPerPage8] = useState(10); // row control state
    const [selectedRows8, setSelectedRows8] = useState([]);
    
       // ----------------- TABLE 8 SCOLUMN --------------------------// 
    const combinedColumns8 = [
      {
        name: 'Sno',
        cell: (row, rowIndex) => {
          const index = mergedData8.indexOf(row) + 1;
          return index;
        },
        sortable: true,
        width: '70px',
      },    
      {
        name: 'Branch Name',
        selector: 'branch_name',
        sortable: true,
      },
      {
        name: 'Patient ID',
        selector: 'patient_id',
        sortable: true,
      },
      {
        name: 'First Name',
        selector: 'first_name',
        width:"150px",
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: 'last_name',
        width:"150px",
        sortable: true,
      },
      {
        name: 'Invoice Date',
        selector: 'invoice_date',
        sortable: true,
        cell: (row) => {
          if (row.invoice_date) {
            const originalDate = row.invoice_date; // Assuming invoice_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
            const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
            return formattedDate;
          } else if (row.schedule_date) {
            const originalDate = row.schedule_date; // Assuming schedule_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
            const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
            return formattedDate;
          }
          return ''; // Return empty string if neither invoice_date nor schedule_date exists
        },
      },    
      {
        name: 'Service Type',
        selector: 'rental_type',
        width:"150px",
        sortable: true,
        cell: (row) => {
          if (row.rental_type) {
            return <span>{row.rental_type}</span>;
          } else if (row.procedure_service_name) {
            return <span>{row.procedure_service_name}</span>;
          }else if (row.item_name) {
            return <span>{row.item_name}</span>;
          } 
          else if (row.service) {
            return <span>{row.service}</span>;
          }
          else if (row.care_taken) {
            return <span>{row.care_taken}</span>;
          }
          else {
            return null; // You might want to handle the case when neither rental_type nor procedure_service_name is defined.
          }
        },
      },      
      {
        name: 'Status',
        selector: 'payment_status',
        sortable: true,
        cell: (row) => {
        if (row.payment_status) {
            return   <span
            className={`${row.payment_status === 'Cancelled'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-red-100'
              : row.payment_status === 'Paid'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
              : row.payment_status === 'Pending'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.payment_status === 'Billed'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                  : 'text-black' // Default color for other payment_status
              }`}
          >
            {row.payment_status}
          </span>
          } else if (row.invoice_status) {
            return  <span
            className={`${row.invoice_status === 'Pending'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.invoice_status === 'Billed'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                  : 'text-black' // Default color for other invoice_status
              }`}
          >
            {row.invoice_status}
          </span>
          }
        }
      },
      {
        name: 'Amount',
        selector: 'total_amount',
        sortable: true,
        width:"250px",
        cell: (row) => {
          if (row.fb_amount) {
            return ` ${ new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.fb_amount)} (FB)`;
          }
          else if (row.procedure_service_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.procedure_service_amount)} (PS)`;
          }
          else if (row.extra_service_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.extra_service_amount)} (SES)`;
          }
          else if (row.medical_equipment_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.medical_equipment_amount)} (MEQ)`;
          }
          else if (row.total_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.total_amount)} (Bill Invoice)`;
          }
          else if (row.emergency_care_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.emergency_care_amount)} (EC)`;
          }
          else if (row.personal_care_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.personal_care_amount)} (PC)`;
          }
        },
      },
    ];
    
     // ----------------- TABLE 8 FIVE API MERGE DATA --------------------------// 
  
    const mergedData8 = [...Fbbranchdata];

    // ----------------- TABLE 9 STATES --------------------------// 

    const [currentPage9, setCurrentPage9] = useState(1); // pagination state
    const [rowsPerPage9, setRowsPerPage9] = useState(10); // row control state
    const [selectedRows9, setSelectedRows9] = useState([]);
    
       // ----------------- TABLE 9 SCOLUMN --------------------------// 
    const combinedColumns9 = [
      {
        name: 'Sno',
        cell: (row, rowIndex) => {
          const index = mergedData9.indexOf(row) + 1;
          return index;
        },
        sortable: true,
        width: '70px',
      },    
      {
        name: 'Branch Name',
        selector: 'branch_name',
        sortable: true,
      },
      {
        name: 'Patient ID',
        selector: 'patient_id',
        sortable: true,
      },
      {
        name: 'First Name',
        selector: 'first_name',
        width:"150px",
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: 'last_name',
        width:"150px",
        sortable: true,
      },
      {
        name: 'Invoice Date',
        selector: 'invoice_date',
        sortable: true,
        cell: (row) => {
          if (row.invoice_date) {
            const originalDate = row.invoice_date; // Assuming invoice_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
            const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
            return formattedDate;
          } else if (row.schedule_date) {
            const originalDate = row.schedule_date; // Assuming schedule_date is a string in the format 'YYYY-MM-DD HH:mm:ss'
            const formattedDate = new Date(originalDate).toLocaleDateString('en-IN');
            return formattedDate;
          }
          return ''; // Return empty string if neither invoice_date nor schedule_date exists
        },
      },    
      {
        name: 'Service Type',
        selector: 'rental_type',
        width:"150px",
        sortable: true,
        cell: (row) => {
          if (row.rental_type) {
            return <span>{row.rental_type}</span>;
          } else if (row.procedure_service_name) {
            return <span>{row.procedure_service_name}</span>;
          }else if (row.item_name) {
            return <span>{row.item_name}</span>;
          } 
          else if (row.service) {
            return <span>{row.service}</span>;
          }
          else if (row.care_taken) {
            return <span>{row.care_taken}</span>;
          }
          else {
            return null; // You might want to handle the case when neither rental_type nor procedure_service_name is defined.
          }
        },
      },      
      {
        name: 'Status',
        selector: 'payment_status',
        sortable: true,
        cell: (row) => {
        if (row.payment_status) {
            return   <span
            className={`${row.payment_status === 'Cancelled'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-red-100'
              : row.payment_status === 'Paid'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
              : row.payment_status === 'Pending'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.payment_status === 'Billed'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                  : 'text-black' // Default color for other payment_status
              }`}
          >
            {row.payment_status}
          </span>
          } else if (row.invoice_status) {
            return  <span
            className={`${row.invoice_status === 'Pending'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.invoice_status === 'Billed'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'
                  : 'text-black' // Default color for other invoice_status
              }`}
          >
            {row.invoice_status}
          </span>
          }
        }
      },
      {
        name: 'Amount',
        selector: 'total_amount',
        sortable: true,
        width:"250px",
        cell: (row) => {
          if (row.fb_amount) {
            return ` ${ new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.fb_amount)} (FB)`;
          }
          else if (row.procedure_service_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.procedure_service_amount)} (PS)`;
          }
          else if (row.extra_service_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.extra_service_amount)} (SES)`;
          }
          else if (row.medical_equipment_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.medical_equipment_amount)} (MEQ)`;
          }
          else if (row.total_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.total_amount)} (Bill Invoice)`;
          }
          else if (row.emergency_care_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.emergency_care_amount)} (EC)`;
          }
          else if (row.personal_care_amount) {
            return ` ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
        }).format(row.personal_care_amount)} (PC)`;
          }
        },
      },
    ];
    
     // ----------------- TABLE 9 FIVE API MERGE DATA --------------------------// 
  
    const mergedData9 = [...BIbranchdata];

  // ----------------- table header and body color --------------------------// 
    const tableCustomStyles = {
      headRow: {
        style: {
          color: '#ffff',
          backgroundColor: '#003f5c'
        },
      },
  
      rows: {
        style: {
          color: "STRIPEDCOLOR",
          backgroundColor: '#f8fafc'
        },
        stripedStyle: {
          color: "NORMALCOLOR",
          backgraoundColor: '#ffff'
        }
      }
    }

     // ----------------- TABELS--------------------------// 
     function generateDataTable(columns, data, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, selectedRows, setSelectedRows) {
      return isLoading ? (
        <div className="loading-animation">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100, 250, 500]}
          paginationTotalRows={data.length}
          paginationDefaultPage={currentPage}
          selectableRows
          onSelectedRowsChange={(selectedRows) => {
            setSelectedRows(selectedRows.selectedRows);
          }}
          onTableUpdate={({ page, rowsPerPage }) => {
            setCurrentPage(page);
            setRowsPerPage(rowsPerPage);
          }}
          striped
          customStyles={tableCustomStyles}
        />
      );
    }
    
    // Usage:
    if (selecttype === 'Revenue') {
      tableContent = generateDataTable(combinedColumns1, mergedData1, currentPage1, setCurrentPage1, rowsPerPage1, setRowsPerPage1, selectedRows1, setSelectedRows1);
    } else if (selecttype === 'ConsolidatedBill') {
      tableContent = generateDataTable(combinedColumns2, mergedData2, currentPage2, setCurrentPage2, rowsPerPage2, setRowsPerPage2, selectedRows2, setSelectedRows2);
    } else if (selecttype === 'InvoicePending') {
      tableContent = generateDataTable(combinedColumns3, mergedData3, currentPage3, setCurrentPage3, rowsPerPage3, setRowsPerPage3, selectedRows3, setSelectedRows3);
    } else if (selecttype === 'InvoiceReciept') {
      tableContent = generateDataTable(combinedColumns4, mergedData4, currentPage4, setCurrentPage4, rowsPerPage4, setRowsPerPage4, selectedRows4, setSelectedRows4);
    }else if (selecttype === 'BranchData') {
      tableContent = generateDataTable(combinedColumns5, mergedData5, currentPage5, setCurrentPage5, rowsPerPage5, setRowsPerPage5, selectedRows5, setSelectedRows5);
    }else if (selecttype === 'PsBranchData') {
      tableContent = generateDataTable(combinedColumns6, mergedData6, currentPage6, setCurrentPage6, rowsPerPage6, setRowsPerPage6, selectedRows6, setSelectedRows6);
    }else if (selecttype === 'SesBranchData') {
      tableContent = generateDataTable(combinedColumns7, mergedData7, currentPage7, setCurrentPage7, rowsPerPage7, setRowsPerPage7, selectedRows7, setSelectedRows7);
    }else if (selecttype === 'FbBranchData') {
      tableContent = generateDataTable(combinedColumns8, mergedData8, currentPage8, setCurrentPage8, rowsPerPage8, setRowsPerPage8, selectedRows8, setSelectedRows8);
    }else if (selecttype === 'BIBranchData') {
      tableContent = generateDataTable(combinedColumns9, mergedData9, currentPage9, setCurrentPage9, rowsPerPage9, setRowsPerPage9, selectedRows9, setSelectedRows9);
    }
   
    


  return (
    <div className="App bg-[#F3F4F6] ">
      <div className="mx-auto container-fluid  border-solid border-1 border-white-500">
        <div className=' px-0 bg-[#F3F4F6] border-solid border-1 border-white-500 md:px-16'>
          <div className='bg-sky-800'>
            {/* header */}
    <nav className="relative top-0 left-0 w-full z-10 bg-white lg:flex-row lg:flex-nowrap lg:justify-start flex items-center py-1 px-4 lg:bg-transparent">
<div className="w-full mx-aut0 items-center flex justify-between lg:flex-nowrap flex-wrap lg:px-6 px-4">
<img
          className="w-5/12 bg-white rounded-md xl:w-1/12 2xl:h-5/6 desktop:w-1/12 md:w-2/12 lg:w-2/12 mt-[5px] ml-[10px] shadow-md"
          src="https://www.athulyahomecare.com/lp/ophthalmology/Assest/logo.png"
          alt="logo"
        />
<div className="items-center w-full lg:flex lg:w-auto flex-grow duration-300 transition-all ease-in-out lg:h-auto-important hidden">
<h1 className="text-white text-center text-2xl flex-grow mr-[5px] md:mr-[150px]">Athulya Assisted Living Reports</h1>
<form className="flex flex-row flex-wrap items-center ml-auto mr-3 mt-3">
<div className="mb-3 pt-0"><input placeholder="Search here" type="text" className="border-transparent shadow px-3 py-2 text-sm  w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "/></div>
</form>
<div className="items-center flex"><span className="w-12 h-12 text-sm text-white bg-blueGray-300 inline-flex items-center justify-center rounded-full"><img alt="..." className="w-full rounded-full align-middle border-none shadow-lg" src="https://demos.creative-tim.com/notus-pro-react/static/media/team-1-800x800.fa5a7ac2.jpg"/></span></div>

</div>
</div>
</nav>
{/* close header */}
</div>
          <main className="  pt-10 bg-[#F3F4F6] border-0 border-white-500">
     <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-5 border-solid border-1 border-white-500 px-4 md:px-6 mx-auto w-full">
     <div className="">
      {/* country*/}
      <select
  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
  id="country"
  value={selectedCountry}
  onChange={handleCountryChange}
>
  <option value="">Select Country</option>
  {countries.map((country) => (
    <option
      value={country.value} // Use the 'value' field from your response
      key={country.id}       // Use the 'id' field from your response as the key
    >
      {country.label}       {/* Display the 'label' field from your response */}
    </option>
  ))}
</select>
        </div>
     <div className="">
      {/* STATE */}
          <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option
                      value={state.branch_state_id}
                      key={state.branch_state_id}
                    >
                      {state.branch_state}
                    </option>
                  ))}
                </select>
        </div>
     <div className="">
      {/* CITY*/}
          <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  id="city"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option
                      value={city.branch_city_id}
                      key={city.branch_city_id}
                    >
                      {city.branch_city}
                    </option>
                  ))}
                </select>
        </div>
     <div className="">
      {/* branch */}
             <select
                  value={selectedBranches}
                  onChange={handleLocationChange}
                  id="branchLocation"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select Branch Location</option>
                  {branchLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.branch_name}
                    </option>
                  ))}
                </select>
        </div>
        <div className=" ">
          {/* from date*/}
          <DatePicker
            selected={fromDate}
            onChange={handleFromDate}
            className="border border-gray-300 h-9 rounded-md px-2 outline-none w-full"
            placeholderText="From Date"
          />
        </div>
        <div className="">
          {/* to date */}
          <DatePicker
            selected={toDate}
            onChange={handleToDate}
            className="border border-gray-300 h-9 rounded-md px-2 outline-none w-full"
            placeholderText="To Date"
          />
        </div>
        <div className="rounded bg-white h-10 shadow-sm border-solid border-1 border-white-500">
          {/* filter button*/}
          <button
            onClick={handleFilterClick} // Call the filter function when the button is clicked
            className="hover:bg-cyan-900 text-white font-semibold hover:text-white h-full w-full bg-cyan-700 border bg-cyan-700 hover:border-transparent rounded"
          >
            Filter
          </button>
        </div>
              </div>
              <div className="relative pt-16 pb-16 bg-lightBlue-500">
          <div className="px-4 md:px-6 mx-auto w-full">
             <div>
                <div className="flex flex-wrap">
                   <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                         <div onClick={fetchDataBasedOnFilter} className="flex-auto p-4 hover:cursor-pointer">
                            <div className="flex flex-wrap">
                               <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                               <h5 className="text-blueGray-400 uppercase font-bold text-xs">Revenue Generated</h5>
                               <span className="block text-2xl font-bold">
                          {isLoading ? (
      // Loading animation or placeholder
      <div className="loading-animation text-center">Loading...</div>
    ) :(RevenueGeneratedTotal)}
                        </span>

                               </div>
                               <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg></div>
                               </div>
                            </div>
                            <p className="text-sm text-blueGray-500 mt-4"><span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 3.48%</span><span className="whitespace-nowrap">Since last month</span></p>
                         </div>
                      </div>
                   </div>
                   <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                         <div onClick={consolidatedBill} class="flex-auto p-4 hover:cursor-pointer">
                            <div class="flex flex-wrap">
                               <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 class="text-blueGray-400 uppercase font-bold text-xs">Invoice Generated</h5>

                                    <span class="block text-2xl font-bold"> {isLoading ? (
                                    // Loading animation or placeholder
                                    <div className="loading-animation text-center">Loading...</div>
                                  ) :(ConsolidatedTotal)}</span>
                               </div>
                               <div class="relative w-auto pl-4 flex-initial">
                                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"> <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg></div>
                               </div>
                            </div>
                            <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p>
                         </div>
                      </div>
             </div>
             <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                      
                         <div  onClick={invoicePending} class="flex-auto p-4 hover:cursor-pointer">
                            <div class="flex flex-wrap">
                               <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 class="text-blueGray-400 uppercase font-bold text-xs">Invoice  Remaining</h5>
                                  <span class="block text-2xl font-bold"> {isLoading ? (
                                    // Loading animation or placeholder
                                    <div className="loading-animation text-center">Loading...</div>
                                  ) :(InvoicePendingTotal)}</span>
                               </div>
                               <div class="relative w-auto pl-4 flex-initial">
                                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                              <g clip-path="url(#clip0_15_784)">
                              <rect width="24" height="24" />
                              <path d="M13.8284 13.8284L20.8995 20.8995M20.8995 20.8995L20.7816 15.1248M20.8995 20.8995L15.1248 20.7816" stroke="currentColor"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M9.89948 13.8284L2.82841 20.8995M2.82841 20.8995L8.60312 20.7816M2.82841 20.8995L2.94626 15.1248" stroke="currentColor"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M13.8284 9.8995L20.8995 2.82843M20.8995 2.82843L15.1248 2.94629M20.8995 2.82843L20.7816 8.60314" stroke="currentColor"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M9.89947 9.89951L2.8284 2.82844M2.8284 2.82844L2.94626 8.60315M2.8284 2.82844L8.60311 2.94629" stroke="currentColor"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              <defs>
                              <clipPath id="clip0_15_784">
                              <rect width="24" height="24" />
                              </clipPath>
                              </defs>
                              </svg></div>
                               </div>
                            </div>
                            <p class="text-sm text-blueGray-500 mt-4"><span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i> 12%</span><span class="whitespace-nowrap">Since last month</span></p>
                         </div>
                      </div>
                   </div>
             <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                         <div onClick={invoiceReciept} class="flex-auto p-4 hover:cursor-pointer">
                            <div class="flex flex-wrap">
                               <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 class="text-blueGray-400 uppercase font-bold text-xs">Receipt Generated</h5>
                                  <span class="block text-2xl font-bold"> {isLoading ? (
                                    // Loading animation or placeholder
                                    <div className="loading-animation text-center">Loading...</div>
                                  ) :(InvoiceRecieptTotal)}</span>
                               </div>
                               <div class="relative w-auto pl-4 flex-initial">
                                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg></div>
                               </div>
                            </div>
                            <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since yesterday</span></p>
                         </div>
                      </div>
                   </div>
                   
                </div>
             </div>
          </div>
       </div>
       <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div >
          <div id="chartContainer">
            {/* Your first chart component here */}
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div>
          {/* Your second chart component here */}
          <CanvasJSChart options={options} />
        </div>
      </div>
    </div>

    <div className='w-50'>
  {selectedRows1.length > 0 && handleExportSelected1()}
  {selectedRows2.length > 0 && handleExportSelected2()}
  {selectedRows3.length > 0 && handleExportSelected3()}
  {selectedRows4.length > 0 && handleExportSelected4()}
</div>
    <div className="grid mt-8 mb-20 bg-white border-solid shadow-sm col-1 border-1 border-white-500">

<div className="relative overflow-x-auto bg-white border-2 border-solid rounded shadow-md sm:rounded-lg">

  {tableContent}
</div>
</div>
          </main>
        </div>
      </div>

    </div>
  );
}

export default App;
