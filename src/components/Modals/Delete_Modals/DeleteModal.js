import React from 'react'
import '../assets/css/deleteModal.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const DeleteModal = (props) => {

    const closeStates = () => {
        if(props?.showDeleteModal == true){
            props?.setshowDeleteModal(false)
        }else if(props?.showDeleteModal2 == true){
            props?.setshowDeleteModal2(false)
        }
    }
    return (
        <>
        <section className='deleteSection'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                       <div className="delteModalBox">
                        <span onClick={closeStates}>×</span>
                        <div className="innerDelteModalBox">
                        <ul className='p-0 mt-2 w-100'>
                            {props?.formErr && (
                                <li className={`alert alert-${props?.formErr.type}` + " " + "mt-1"}>{`${props?.formErr.message}`}</li>
                            )}
                        </ul>
                            <ErrorOutlineIcon/>
                            <h3 className="title">{props?.warningMsg}</h3>
                            <p className="description">{props?.descriptionOne}<br/> {props?.descriptionTwo}.</p>
                            <button onClick={props?.deleteSaveEdu || props?.deleteSaveExper || props?.deleteSaveChild || props?.deleteSaveMarriages} disabled={props?.btnEnaledAndDisabled} >
                                {props?.loading ? "Loading..." : "continue"}
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


                                            {/* <h3 className="title">{props.warningMsg}</h3> */}
export default DeleteModal