import React, { useEffect } from 'react'
import Header from '../../../components/Includes/Header'
import PSPDFKit from 'pspdfkit';


function PaySlip() {
    // PSPDFKit.load({
    //     container: "#pspdfkit",
    //     document: "file:///C:/Users/HP/Downloads/document.pdf",
    //     licenseKey: "YOUR_LICENSE_KEY"
    //   }).then((instance) => {
    //     instance.exportPDF({
    //       permissions: {
    //         userPassword: "u$erp@ssw0rd",
    //         ownerPassword: "ownerp@ssw0rd",
    //         documentPermissions: []
    //       }
    //     });
    //   });
    return (
        <>
            <div>
                <Header />
            </div>
            <div id="pspdfkit" style={{ width: '100%', height: '500px' }}></div>
            {/* <div className="maringClass">
                <div className="row">
                    <div className="col-lg-12">
                        <div className='paySlipBox'>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default PaySlip
