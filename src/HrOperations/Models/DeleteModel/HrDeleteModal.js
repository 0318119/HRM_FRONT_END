import React, { useState } from 'react'
import '../Asset/css/DeleteModel.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import { useSelector, useDispatch } from 'react-redux';
// import { DeleteApiData } from '../../../redux/slices/DelSlice';


const HrDeleteModal = (props) => {
    // ==============================================
    // const dispatch = useDispatch();
    // const getError = useSelector((state) => state.deleteData.error);
    // const apiStatus = useSelector((state) => state.deleteData.msg);
    // const getLoading = useSelector((state) => state.deleteData.status);
    // const closeStates = () => {
    //     if (props?.ShowDelModel == true) {
    //         props?.setShowDelModel(false)
    //     }
    // }
    return (
        <>
            <section className='HrdeleteSection'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="HrdelteModalBox">
                                {/* <span onClick={closeStates}>×</span> */}
                                <div className="HRinnerDelteModalBox">
                                    <ul className='p-0 mt-2 w-100'>
                                        {/* {apiStatus && (
                                            <li className={`alert alert-success` + " " + "mt-1"}>{`${apiStatus}`}</li>
                                        )}
                                        {getError && (
                                            <li className={`alert alert-warning` + " " + "mt-1"}>{`${getError}`}</li>
                                        )} */}
                                    </ul>
                                    <ErrorOutlineIcon />
                                    {/* <h3 className="title">{props?.warningMsg}</h3>  */}
                                    {/* <p className="description">{props?.description}</p> */}
                                    <button 
                                    // onClick={
                                    //     () => {
                                    //         dispatch(DeleteApiData({"url":props.API_DELETE_URL, "body":props.bodyOfdata}));
                                    //     }
                                    // } 
                                    // disabled={props?.btnEnaledAndDisabled} 
                                    >
                                        {/* {getLoading == "loading" ? getLoading : "continue"} */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default HrDeleteModal