import React, { useEffect, useState } from "react";
import Style from './hrRelease.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Skeleton } from "antd";
import { Button } from '../../../../components/basic/button/index'
import * as hrRelease_Action from "../../../../store/actions/payroll/hrRelease/index";
import { connect } from "react-redux";
import Flags from "../../../component/flags";


const HrRelease = ({ ChangeFlag, getHrInfo }) => {
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
                <SecondaryHeader isSearch={false} title={'Release HR Entry'} total={'0'} />
            </div>
            <div className={Style.TableBody}>
                {loading ?
                    <Skeleton active /> :
                    <>
                        {flag?.HR_Entry_Stop_Flag == 'N' ?
                            <Flags color={'Green'} Title={'Do You realy want to Stop HR Entry?'} />
                            :
                            <Flags color={'Danger'} Title={'HR Entry is already Stop Message'} />
                        }
                    </>
                }
                <div className="py-4">
                    <Button onClick={ChangeFlagBtn} loading={loadingClick} title={'Stop'} />
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ hrRelease }) {
    return { hrRelease };
}
export default connect(mapStateToProps, hrRelease_Action)(HrRelease);