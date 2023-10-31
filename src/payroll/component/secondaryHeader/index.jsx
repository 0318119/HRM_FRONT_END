import React from "react";
import Style from './secondaryHeader.module.css'
import Input from "../../../components/basic/input";


const SecondaryHeader = ({ title,total }) => {
    return (
        <>
            <div className={Style.SecondaryHeaderMain}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                    <div style={{display:'flex',alignItems:'end'}}>
                        <h2>{title}</h2>
                        <p>{`Total ${total}`}</p>
                    </div>
                    <Input placeholder={'Search Here..'}/>
                </div>
            </div>
        </>
    )
}

export default SecondaryHeader;