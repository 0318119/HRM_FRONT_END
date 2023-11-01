import React from "react";
import Style from './secondaryHeader.module.css'
import Input from "../../../components/basic/input";


const SecondaryHeader = ({ title, total, searchParam, onSearchClick, isSearch }) => {
    const AllSearch = (e) => {
        searchParam(e)
    }
    return (
        <>
            <div className={Style.SecondaryHeaderMain}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <h2>{title}</h2>
                        {isSearch &&
                            <p>{`Total ${total}`}</p>
                        }
                    </div>
                    {isSearch &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input onChange={AllSearch} placeholder={'Search Here..'} />
                            <button onClick={onSearchClick}>Search</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SecondaryHeader;