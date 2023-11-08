import React, { useEffect, useState } from "react";
import Style from './undoPayrollCalculation.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Skeleton } from "antd";
import { Button } from '../../../../components/basic/button/index'
import * as undoPayrollCalculation_Action from "../../../../store/actions/payroll/undoPayrollCalculation/index";
import { connect } from "react-redux";
import Flags from "../../../component/flags";


const undoPayrollCalculation_Component = ({ ChangeFlag, getHrInfo }) => {
    const [flag, setFlag] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingClick, setLoadingClick] = useState(false)
    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        setLoading(true)
        const InfoData = await getHrInfo()
        setFlag(InfoData[0])
        setLoading(false)
    }

    const ChangeFlagBtn = async () => {
        setLoadingClick(true)
        const InfoData = await ChangeFlag(flag?.HR_Entry_Stop_Flag == "Y" ? "N" : "Y")
        if (InfoData.success == "success") {
            DataLoader()
        }
        setLoadingClick(false)
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isSearch={false} title={'Stop HR Entry'} total={'0'} />
            </div>
            <div className={Style.TableBody}>
                <div className="py-4">
                    <Button onClick={ChangeFlagBtn} loading={loadingClick} title={'Stop'} />
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ undoPayrollCalculation }) {
    return { undoPayrollCalculation };
}
export default connect(mapStateToProps, undoPayrollCalculation_Action)(undoPayrollCalculation_Component);