// import React, { useEffect, useState } from 'react'
// import { connect } from "react-redux";
// import * as Red_New_Appointment_Report_Action from '../store/actions/HrOperations/New_Appointment_Report'
// import { FormInput, FormSelect } from "../components/basic/input/formInput";
// import { PrimaryButton, CancelButton } from "../components/basic/button";
// import { message } from 'antd'
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Table } from "antd";
// import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
// import * as yup from "yup";


// function New_Appointment_Report({
//   Red_New_Appointment_Report,
//   GetAllAppoint, 
//   PostAppointmentPayload
// }) {
//   const [isLoading, setLoading] = useState(false)
//   const empData = Red_New_Appointment_Report?.data?.[0]?.res?.data
//   const [isAppointmentData, setAppointmentData] = useState([])


//   const AppointmentSchema = yup.object().shape({
//     FromDate: yup.string().required("Please Select From Date"),
//     ToDate: yup.string().required("Please Select To Date"),
//   });
//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     defaultValues: {
//       FromDate: "",
//       ToDate: "",
//     },
//     mode: "onChange",
//     resolver: yupResolver(AppointmentSchema),
//   });

//   const submitForm = async (data) => {
//     setLoading(true)
//     try {
//       const isValid = await AppointmentSchema.validate(data);
//       if (isValid) {
//         confirm(data)
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     GetAllAppoint()
//   }, [])


// const [btnDownalod, setBtnDownalod] = useState(false)
// const confirm = async (data) => {
//   const isWaitFun = await PostAppointmentPayload(data);
//   console.log("isWaitFun:", isWaitFun);

//   if (isWaitFun?.success) {
//     const appointmentData = isWaitFun?.data?.[0];
//     console.log("appointmentData", appointmentData);
//     if (!appointmentData || appointmentData.length === 0) {
//       message.error("No Data Available");
//       setLoading(false);
//       setBtnDownalod(false);
//     } else {
//       setLoading(false);
//       setBtnDownalod(true);
//       message.success("Now, You can Download Pdf");
//       setAppointmentData(appointmentData);
//     }
//   } else {
//     message.error(isWaitFun?.message || isWaitFun?.messsage);
//     setLoading(false);
//     setBtnDownalod(false);
//   }
// }

//   const defaultOption = { value: "-1", label: "All Employees" };
//   const options = [
//     defaultOption,
//     ...(empData || []).map((item) => ({
//       value: item.EmpCode,
//       label: item.EmpName,
//     })),
//   ];

//   useEffect(() => {
//     const btnprint = document.getElementById('Print');
//     const gotoPrint = () => {
//       window.print()
//     }
//     btnprint.addEventListener('click', gotoPrint, false)
//     return () => {
//       btnprint.removeEventListener('click', gotoPrint, false)
//     }
//   }, [])

//   return (
//     <>

//       <div className="container maringClass">
//         <div className="row justify-content-center">
//           <div className="col-lg-8">
//             <form onSubmit={handleSubmit(submitForm)} className='paySlipBox'>
//               <h4 className="text-dark">Appointment</h4>
//               <div className=''>
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={"From Date"}
//                   name={'FromDate'}
//                   label={'From Date'}
//                   type="date"
//                 />
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={"To Date"}
//                   name={'ToDate'}
//                   label={'To Date'}
//                   type="date"
//                 />
//               </div>
//               <div className='paySlipBtnBox'>
//                 <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12 d-flex justify-content-end">
//             <PrimaryButton className={btnDownalod == true ? "d-block" : "d-none"} id="Print" title="Download" />
//           </div>
//         </div>
//         <div class="mt-5 row justify-content-center">
//           {isAppointmentData?.length > 0 && (

//             <PDFViewer height="750">
//               <Document >
//                 <Page size="A4">
//                   <View>
// <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold', margin: "20px 0" }}>
//   NEW APPOINTEES REPORT
// </Text>

//                     <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Employee Code</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Employee Name</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Designation</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>GG</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Date of Appointment</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Supervisor</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>CC</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Location</Text>
//                       <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Base City</Text>
//                     </View>
//                     {isAppointmentData.map((item, index) => (
//                       <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_code ? item?.Emp_code : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_name ? item?.Emp_name : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Desig ? item?.Desig : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.GG ? item?.GG : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Date_Appoint}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Supervisor ? item?.Supervisor : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.CC ? item?.CC : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Location ? item?.Location : null}</Text>
//                         <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Base_City ? item?.Base_City : null}</Text>
//                       </View>

//                     ))}
//                   </View>

//                 </Page>
//               </Document>
//             </PDFViewer>
//           )}

//         </div>
//       </div>

//     </>

//   )
// }

// function mapStateToProps({ Red_New_Appointment_Report }) {
//   return { Red_New_Appointment_Report };
// }
// export default connect(mapStateToProps, Red_New_Appointment_Report_Action)(New_Appointment_Report)


// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import * as Red_New_Appointment_Report_Action from '../store/actions/HrOperations/New_Appointment_Report';
// import { FormInput } from '../components/basic/input/formInput';
// import { PrimaryButton } from '../components/basic/button';
// import { message } from 'antd';
// import { useForm } from 'react-hook-form';
// import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
// import * as yup from 'yup';
// import { saveAs } from 'file-saver';
// import { yupResolver } from '@hookform/resolvers/yup';

// function New_Appointment_Report({
//   Red_New_Appointment_Report,
//   GetAllAppoint,
//   PostAppointmentPayload,
// }) {
//   const [isLoading, setLoading] = useState(false);
//   const [isAppointmentData, setAppointmentData] = useState([]);
//   const [isFormSubmitted, setFormSubmitted] = useState(false);

//   const AppointmentSchema = yup.object().shape({
//     FromDate: yup.string().required('Please Select From Date'),
//     ToDate: yup.string().required('Please Select To Date'),
//   });

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm({
//     defaultValues: {
//       FromDate: '',
//       ToDate: '',
//     },
//     mode: 'onChange',
//     resolver: yupResolver(AppointmentSchema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const isValid = await AppointmentSchema.validate(data);
//       if (isValid) {
//         const result = await PostAppointmentPayload(data);
//         if (result?.success) {
//           const appointmentData = result?.data?.[0];
//           if (!appointmentData || appointmentData.length === 0) {
//             message.error('No Data Available');
//           } else {
//             setAppointmentData(appointmentData);
//             setFormSubmitted(true);
//           }
//         } else {
//           message.error(result?.message || result?.messsage);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   const downloadPDF = () => {
//     // Generate PDF content and download logic here
//     // Example content:
//     const blob = new Blob([<Document>
//       <Page size="A4">
//         <View>
//           <Text>Sample PDF Content</Text>
//         </View>
//       </Page>
//     </Document>], { type: 'application/pdf' });
//     saveAs(blob, 'appointment_report.pdf');
//   };

//   useEffect(() => {
//     GetAllAppoint();
//   }, []);

//   return (
//     <>
//       <div className="container maringClass">
//         <div className="row justify-content-center">
//           <div className="col-lg-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
//               <h4 className="text-dark">Appointment</h4>
//               <div className="">
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={'From Date'}
//                   name={'FromDate'}
//                   label={'From Date'}
//                   type="date"
//                 />
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={'To Date'}
//                   name={'ToDate'}
//                   label={'To Date'}
//                   type="date"
//                 />
//               </div>
//               <div className="paySlipBtnBox">
//                 <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
//               </div>
//             </form>
//           </div>
//         </div>

//         {isFormSubmitted && (
//           <div className="row">
//             <div className="col-lg-12 d-flex justify-content-end">
//               <PrimaryButton onClick={downloadPDF} title="Download" disabled={isLoading} />
//             </div>
//           </div>
//         )}

//         {isFormSubmitted && (
//           <div className="mt-5 row justify-content-center">
//             <PDFViewer height="600">
//               <Document>
//                 {/* Your PDF content goes here */}
//                 <Page>
//                   <View>
//                     <Text>PDF Content Here</Text>
//                   </View>
//                 </Page>
//               </Document>
//             </PDFViewer>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// function mapStateToProps({ Red_New_Appointment_Report }) {
//   return { Red_New_Appointment_Report };
// }

// export default connect(mapStateToProps, Red_New_Appointment_Report_Action)(New_Appointment_Report);


// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import * as Red_New_Appointment_Report_Action from '../store/actions/HrOperations/New_Appointment_Report';
// import { FormInput } from '../components/basic/input/formInput';
// import { PrimaryButton } from '../components/basic/button';
// import { message } from 'antd';
// import { useForm } from 'react-hook-form';
// import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// function New_Appointment_Report({
//   Red_New_Appointment_Report,
//   GetAllAppoint,
//   PostAppointmentPayload,
// }) {
//   const [isLoading, setLoading] = useState(false);
//   const [isFormSubmitted, setFormSubmitted] = useState(false);
//   const [apiData, setApiData] = useState([]);
//   const [isAppointmentData, setAppointmentData] = useState([]);

//   const AppointmentSchema = yup.object().shape({
//     FromDate: yup.string().required('Please Select From Date'),
//     ToDate: yup.string().required('Please Select To Date'),
//   });

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm({
//     defaultValues: {
//       FromDate: '',
//       ToDate: '',
//     },
//     mode: 'onChange',
//     resolver: yupResolver(AppointmentSchema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const isValid = await AppointmentSchema.validate(data);
//       if (isValid) {
//         const result = await PostAppointmentPayload(data);
//         if (result?.success) {
//           setApiData(result?.data || []);
//           setFormSubmitted(true);
//         } else {
//           message.error(result?.message || result?.messsage);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   const downloadPDF = () => {
//     const blob = new Blob(
//       [
//         <Document>
//           {apiData.map((tableData, index) => (
//             <Page key={index} style={styles.page}>
//               <View style={styles.section}>
//                 <Text style={styles.heading}>Table {index + 1}</Text>
//                 <Text style={styles.reportTitle}>NEW APPOINTEES REPORT</Text>
//                 <View style={styles.table}>
//                   {/* Table headers */}
//                   {Object.keys(tableData).map((key, idx) => (
//                     <Text key={idx} style={styles.tableHeader}>
//                       {key}
//                     </Text>
//                   ))}
//                   {/* Table values */}
//                   {Object.values(tableData).map((value, idx) => (
//                     <Text key={idx} style={styles.tableRow}>
//                       {value}
//                     </Text>
//                   ))}
//                 </View>
//               </View>
//             </Page>
//           ))}
//         </Document>
//       ],
//       { type: 'application/pdf' }
//     );
//     saveAs(blob, 'multiple_tables_report.pdf');
//   };

//   useEffect(() => {
//     GetAllAppoint();
//   }, []);

//   const styles = {
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#fff',
//       padding: 20,
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1,
//     },
//     heading: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     reportTitle: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: 20,
//     },
//     table: {
//       display: 'table',
//       width: '100%',
//       borderCollapse: 'collapse',
//     },
//     tableHeader: {
//       backgroundColor: '#f2f2f2',
//       fontWeight: 'bold',
//       border: '1px solid #000',
//       padding: 5,
//       textAlign: 'center',
//     },
//     tableRow: {
//       border: '1px solid #000',
//       padding: 5,
//       textAlign: 'center',
//     },
//   };

//   return (
//     <>
//       <div className="container maringClass">
//         <div className="row justify-content-center">
//           <div className="col-lg-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
//               <h4 className="text-dark">Appointment</h4>
//               <div className="">
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={'From Date'}
//                   name={'FromDate'}
//                   label={'From Date'}
//                   type="date"
//                 />
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={'To Date'}
//                   name={'ToDate'}
//                   label={'To Date'}
//                   type="date"
//                 />
//               </div>
//               <div className="paySlipBtnBox">
//                 <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
//               </div>
//             </form>
//           </div>
//         </div>

//         {isFormSubmitted && (
//           <div className="row">
//             <div className="col-lg-12 d-flex justify-content-end">
//               <PrimaryButton onClick={downloadPDF} title="Download" disabled={isLoading} />
//             </div>
//           </div>
//         )}

//         {isFormSubmitted && (
//           <div className="mt-5 row justify-content-center">
//             <PDFViewer height="600">
//               <Document>
//                 {apiData.map((tableData, index) => (
//                   <Page key={index} style={styles.page}>
//                     <View style={styles.section}>
//                       <Text>Table {index + 1}</Text>
//                       <View style={styles.table}>
//                         {/* Table headers */}
//                         {Object.keys(tableData).map((key, idx) => (
//                           <Text key={idx} style={styles.tableHeader}>
//                             {key}
//                           </Text>
//                         ))}
//                         {/* Table values */}
//                         {Object.values(tableData).map((value, idx) => (
//                           <Text key={idx} style={styles.tableRow}>
//                             {value}
//                           </Text>
//                         ))}
//                       </View>
//                     </View>
//                   </Page>
//                 ))}
//               </Document>
//             </PDFViewer>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// function mapStateToProps({ Red_New_Appointment_Report }) {
//   return { Red_New_Appointment_Report };
// }

// export default connect(mapStateToProps, Red_New_Appointment_Report_Action)(New_Appointment_Report);


// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import * as Red_New_Appointment_Report_Action from '../store/actions/HrOperations/New_Appointment_Report';
// import { FormInput } from '../components/basic/input/formInput';
// import { PrimaryButton } from '../components/basic/button';
// import { message } from 'antd';
// import { useForm } from 'react-hook-form';
// import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// function New_Appointment_Report({
//   Red_New_Appointment_Report,
//   GetAllAppoint,
//   PostAppointmentPayload,
// }) {
//   const [isLoading, setLoading] = useState(false);
//   const [isFormSubmitted, setFormSubmitted] = useState(false);
//   const [apiData, setApiData] = useState([]);

//   const AppointmentSchema = yup.object().shape({
//     FromDate: yup.string().required('Please Select From Date'),
//     ToDate: yup.string().required('Please Select To Date'),
//   });

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     defaultValues: {
//       FromDate: '',
//       ToDate: '',
//     },
//     mode: 'onChange',
//     resolver: yupResolver(AppointmentSchema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const isValid = await AppointmentSchema.validate(data);
//       if (isValid) {
//         const result = await PostAppointmentPayload(data);
//         if (result?.success) {
//           setApiData(result?.data || []);
//           setFormSubmitted(true);
//         } else {
//           message.error(result?.message || result?.messsage);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   const downloadPDF = () => {
//     const blob = new Blob(
//       [
//         <Document>
//           {apiData.map((tableData, index) => (
//             <Page key={index} style={styles.page}>
//               <View style={styles.section}>
//                 <Text style={styles.heading}>Table {index + 1}</Text>
//                 <Text style={styles.reportTitle}>NEW APPOINTEES REPORT</Text>
//                 <View style={styles.table}>
//                   {/* Table content */}
//                   {Object.keys(tableData).map((key, idx) => (
//                     <View key={idx} style={styles.tableRow}>
//                       <Text style={styles.tableHeader}>{key}</Text>
//                       <Text style={styles.tableData}>{tableData[key]}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             </Page>
//           ))}
//         </Document>
//       ],
//       { type: 'application/pdf' }
//     );
//     saveAs(blob, 'multiple_tables_report.pdf');
//   };

//   useEffect(() => {
//     GetAllAppoint();
//   }, []);

//   const styles = {
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#fff',
//       padding: 20,
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1,
//     },
//     heading: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     reportTitle: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: 20,
//     },
//     table: {
//       display: 'flex',
//       flexDirection: 'column',
//       marginBottom: 10,
//     },
//     tableRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 5,
//     },
//     tableHeader: {
//       fontWeight: 'bold',
//     },
//     tableData: {},
//   };

//   return (
//     <>
//       <div className="container maringClass">
//         <div className="row justify-content-center">
//           <div className="col-lg-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
//               <h4 className="text-dark">Appointment</h4>
//               <div className="">
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={'From Date'}
//                   name={'FromDate'}
//                   label={'From Date'}
//                   type="date"
//                 />
//                 <FormInput
//                   errors={errors}
//                   control={control}
//                   placeholder={'To Date'}
//                   name={'ToDate'}
//                   label={'To Date'}
//                   type="date"
//                 />
//               </div>
//               <div className="paySlipBtnBox">
//                 <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
//               </div>
//             </form>
//           </div>
//         </div>

//         {isFormSubmitted && (
//           <div className="row">
//             <div className="col-lg-12 d-flex justify-content-end">
//               <PrimaryButton onClick={downloadPDF} title="Download" disabled={isLoading} />
//             </div>
//           </div>
//         )}

//         {isFormSubmitted && (
//           <div className="mt-5 row justify-content-center">
//             <PDFViewer height="600">
//               <Document>
//                 {apiData.map((tableData, index) => (
//                   <Page key={index} style={styles.page}>
//                     <View style={styles.section}>
//                       <Text>Table {index + 1}</Text>
//                       <View style={styles.table}>
//                         {/* Table content */}
//                         {Object.keys(tableData).map((key, idx) => (
//                           <View key={idx} style={styles.tableRow}>
//                             <Text style={styles.tableHeader}>{key}</Text>
//                             <Text style={styles.tableData}>{tableData[key]}</Text>
//                           </View>
//                         ))}
//                       </View>
//                     </View>
//                   </Page>
//                 ))}
//               </Document>
//             </PDFViewer>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// function mapStateToProps({ Red_New_Appointment_Report }) {
//   return { Red_New_Appointment_Report };
// }

// export default connect(mapStateToProps, Red_New_Appointment_Report_Action)(New_Appointment_Report);

