import React, { useEffect, useRef, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image, PDFViewer } from '@react-pdf/renderer';
import PSPDFKit from 'pspdfkit';
import * as SalarOnHolds_Action from "../../../../store/actions/payroll/salaryOnHold/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, PrimaryButton } from '../../../../components/basic/button';
import { FormSelect } from '../../../../components/basic/input/formInput';
import Header from '../../../../components/Includes/Header';
import '../../../assest/css/paySlip.css'
import { DateTime } from "luxon";

const SalaryOnHold = ({ GetSalaryOnHold }) => {
    const [loading, setLoading] = useState(false)
    const [blobStore, setBobStore] = useState()
    const [companyLogo, setComapnyLogo] = useState()
    const [isDownload, setIsdownload] = useState(false)
    const [PdfLoader, setPdfLoader] = useState(false)
    const [pdfPassowrd, setPdfPassowrd] = useState()
    const [monthCurrent, setMonthCurrent] = useState()
    const [YearCurrent, setYearCurrent] = useState()
    const [isPdfData, setPdfData] = useState([])
    const borderColor = 'black'

    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        // const currentDate = new Date();
        // const currentMonth = currentDate.getMonth() + 1;
        // const currentYear = currentDate.getFullYear();
        // setMonthCurrent(currentMonth);
        // setYearCurrent(currentYear);
    }
    const styles = StyleSheet.create({
        TopHeader: {
            flexDirection: 'row',
            paddingHorizontal: 10
        },
        TableHeaderContainer: {
            width: '60%',
            paddingVertical: '20px',
            textAlign: 'center',
        },
        HeadingTop: {
            fontSize: 23,
            color: "black",
            fontWeight: 900,
        },
    });
    const submitForm = async (data) => {
        setLoading(true)
        const DataFromApi = await GetSalaryOnHold()
        setPdfData(DataFromApi)
    }

    const blobProvider = async () => {
        const MyDoc = (
            <Document>
                <Page>
                    <View style={styles.TopHeader}>
                        <View style={styles.TableHeaderContainer}>
                            <Text style={styles.HeadingTop}>Monthly Tax Liability Report</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        );
        const blobData = await pdf(MyDoc).toBlob();
        setBobStore(blobData)
        setTimeout(() => {
            setIsdownload(true)
            dataRender()
            setLoading(false)
        }, 2000)
    }

    const dataRender = () => {
        setPdfLoader(true)
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            const container = document.createElement('div');
            container.style.display = 'none';
            document.body.appendChild(container);
            PSPDFKit.load({
                container,
                document: dataUrl,
                baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            })
                .then((instance) => {
                    instance.exportPDF({
                        permissions: {
                            userPassword: pdfPassowrd,
                            ownerPassword: pdfPassowrd,
                            documentPermissions: []
                        }
                    }).then((buffer) => {
                        const blob = new Blob([buffer], { type: "application/pdf" });
                        const fileName = "document.pdf";
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        } else {
                            const objectUrl = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = objectUrl;
                            a.style = "display: none";
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            URL.revokeObjectURL(objectUrl);
                            document.body.removeChild(a);
                        }
                        setPdfLoader(false)
                    });
                })
                .catch((error) => {
                    console.error('Error loading PSPDFKit', error);
                    setPdfLoader(false)
                });
        };
        reader.readAsDataURL(blobStore);
        return () => {
            PSPDFKit.unload('#pdf-container');
        };
    };

    useEffect(() => {
        if (isPdfData.length > 0 && pdfPassowrd) {
            blobProvider()
        }
    }, [isPdfData, pdfPassowrd])

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container maringClass">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h4 className="text-dark">Salary on hold report</h4>
                        <div className="paySlipBtnBox">
                            <Button loading={PdfLoader} onClick={submitForm} type={'submit'} title="Download Pdf" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ SalaryOnHold }) {
    return { SalaryOnHold };
}
export default connect(mapStateToProps, SalarOnHolds_Action)(SalaryOnHold);
