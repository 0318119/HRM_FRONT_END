<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React from 'react';
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
import Header from '../../../../components/Includes/Header';
import SecondaryHeader from '../../../component/secondaryHeader';
import Input from '../../../../components/basic/input';
import Style from './rdlc.module.css'

<<<<<<< HEAD
const RdlcReport = () => {

=======

const RdlcReport = () => {
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader title={"Due for Confimation Report"} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input placeholder={"Jul 01, 2023"} label={'From Date'} />
                    <Input placeholder={"Oct 25, 2024"} label={'To Date'} />
                </div>
            </div>
            <div>
                
            </div>
        </>
    )
}

export default RdlcReport;