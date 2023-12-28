import React, { useEffect, useState } from "react";
import Style from './closingPayrollmonth.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Skeleton } from "antd";
import { Button } from '../../../../components/basic/button/index'
import * as hrRelease_Action from "../../../../store/actions/payroll/closingPayrollmonth/index";
import { connect } from "react-redux";
import Flags from "../../../component/flags";


const ClosingPayrollMonth = ({ ChangeFlag }) => {
    const [loadingClick, setLoadingClick] = useState(false)

    var m_names = ['January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    var d = new Date();
    var currentMonth = m_names[d.getMonth()];
    var currentYear = d.getFullYear();


    const ChangeFlagBtn = async () => {
        setLoadingClick(true)
        const InfoData = await ChangeFlag({currentYear:currentYear, currentMonth:d.getMonth() })
        setLoadingClick(false)
    }



    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isSearch={false} title={'Release HR Entry'} total={'0'} />
            </div>
            <div className={Style.TableBody}>
                <Flags color={'Green'} Title={`Do You want to close ${currentMonth}/${currentYear} Message`} />
                <div className="py-4">
                    <Button onClick={ChangeFlagBtn} loading={loadingClick} title={'Close'} />
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ hrRelease }) {
    return { hrRelease };
}
export default connect(mapStateToProps, hrRelease_Action)(ClosingPayrollMonth);