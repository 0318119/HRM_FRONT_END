import React from "react";
import Style from './secondaryHeader.module.css'
import Input from "../../../components/basic/input";


const SecondaryHeader = ({ title, total, searchParam, onSearchClick, isSearch, isAddNew, addNewFunction, isTable }) => {
    const AllSearch = (e) => {
        searchParam(e.target.value)
    }
    return (
        <>
            <div className={Style.SecondaryHeaderMain}>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-4" style={{ display: 'flex', alignItems: 'center'}}>
                            <h4>{title}</h4>
                            {isSearch &&
                                <p>{`${total}`}</p>
                            }
                        </div>
                        <div className="col-md-4">
                            {isSearch &&
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent : "end"}}>
                                    <Input onChange={AllSearch} placeholder={'Search Here..'} />
                                    <button onClick={onSearchClick}>Search</button>
                                </div>
                            }
                        </div>
                        {isAddNew &&
                            <div className="col-md-4">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent : "end"}}>
                                    <button onClick={() => {
                                        isTable(false)
                                        addNewFunction(true)
                                    }}>Add New</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <h4>{title}</h4>
                        {isSearch &&
                            <p>{`${total}`}</p>
                        }
                    </div>
                    {isSearch &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input onChange={AllSearch} placeholder={'Search Here..'} />
                            <button onClick={onSearchClick}>Search</button>
                        </div>
                    }
                    {isAddNew &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button onClick={() => {
                                isTable(false)
                                addNewFunction(true)
                            }}>Add New</button>
                        </div>
                    }
                </div> */}
            </div>
        </>
    )
}

export default SecondaryHeader;