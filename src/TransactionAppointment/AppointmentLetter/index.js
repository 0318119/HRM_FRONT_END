import React from 'react'
import {Table} from 'antd'

const index = (DataR) => {

  console.log(DataR, 'DataR')
  const columns = [{
    title: 'S. No',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Salary And Other Cash benefits',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Per Month (in Rupee)',
    dataIndex: 'address',
    key: 'address',
  }];

  return (
    <div className="container p-5 border">
      <div className="row">
        <div className="col-12 p-1">
          <h4 className='text-center text-dark'>APPOINTMENT LETTER</h4>
        </div>
      </div>
      <div className="row d-flex flex-row p-1">
        <div className="col-4 lh-3">
          <div>Name :</div>
          <div>Contact :</div>
          <div>Address Line :</div>
          <div>Address Line2 :</div>
        </div>
        <div className="col-4">
          {/* <div>Name :</div> */}
        </div>
        <div className="col-4">
          <div>Date :</div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>We are pleased to offer you the position of Assistant Product Manager - FMI in the cadre of Not Found at Summit Bank Limited-(SMBL). The position will be based in Not Found.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table  columns={columns} />
        </div>
         <div className="col-12">
             Note : All applicable taxes will be deducted at source
             <ul>
               <p>In addition to the above, you are entitled to the following:</p>
                  <li>Cash reimbursement equivalent to 100 liters of petrol per month</li>
                  <li>Gratuity, PF, Hospitalization, Group Insurance, Loan entitlement, Leave entitlement based on Bankâ€™s approved salary and benefit policy.</li>
                  <li>And all other benefits as per Bankâ€™s approved policy.</li>
             </ul>
         </div>
         <div className="col-12">
          <p>Your service will be on probation for a period of three months and is liable to termination without assigning any reason and without any notice during the period of probation. Your service will be confirmed after successful completion of the probation period, subject to the following:</p>
          <p>(i) Satisfactory references from your present and previous employers.</p>
          <p>After confirmation, termination of this contract will require either party, i.e., you or the Bank, to serve 60 calendar days advance notice or, in lieu of the notice period, two months Gross Salary will be paid.</p>
          <p>You will perform any and all functions assigned to you from time to time, and you can be transferred to any location/city at Bankâ€™s discretion.</p>
          You will be required to sign Bankâ€™s Standard Declaration of Secrecy and Fidelity Form along with any other form/undertaking which the Bank may consider necessary, and will abide by all the terms and conditions of the Bankâ€™s HR Policy and Rules & Regulations.
          <p>You shall stand retired on attaining the superannuation age of (60) years.</p>
          <p>In agreement with the terms and conditions herein, you are requested to sign both the pages (1 & 2) of this appointment offer and return a copy to Human Resource Division, Summit Bank Limited.</p>
          <p>The proposed date of your assuming the responsibility is 2023-07-26 08:51:35 or earlier.</p>
          <p>We are confident that you will play a positive role towards the growth and expansion of Summit Bank Limited-SMBL and look forward to a long and mutually rewarding professional relationship.</p>
         </div>

      </div>
      <div className="row  d-flex flex-row">
        <div className="col-4">
          <p>Sincerely: _____________</p>
          <p>Syed Mustafa Zaidi</p>
          <p>Head Of Human Resource Division</p>
        </div>
        <div className="col-4"></div>
        <div className="col-4">
          <p>Accepted:__________</p>
          <p>Ali Ghani</p>
        </div>
      </div>
    </div>
  )
}

export default index