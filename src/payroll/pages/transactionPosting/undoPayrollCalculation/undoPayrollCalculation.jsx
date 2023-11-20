import React, {useState } from "react";
import Style from './undoPayrollCalculation.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Button } from '../../../../components/basic/button/index'
import * as undoPayrollCalculation_Action from "../../../../store/actions/payroll/undoPayrollCalculation/index";
import { connect } from "react-redux";
import { message } from "antd";


const UndoPayrollCalculation_Component = ({ ChangeFlag}) => {
    const [loadingClick, setLoadingClick] = useState(false)
    
    const ChangeFlagBtn = async () => {
        setLoadingClick(true)
        const InfoData = await ChangeFlag()
        if(InfoData.success == "success"){
            message.success('Undo payroll Calculation succeed')
        }
        setLoadingClick(false)
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isSearch={false} title={'Undo payroll Calculation'} total={'0'} />
            </div>
            <div className={Style.TableBody}>
                <p>Please not that this program will UNDO payroll process.</p>
                <div className="py-4">
                    <Button onClick={ChangeFlagBtn} loading={loadingClick} title={'Submit'} />
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ undoPayrollCalculation }) {
    return { undoPayrollCalculation };
}
export default connect(mapStateToProps, undoPayrollCalculation_Action)(UndoPayrollCalculation_Component);