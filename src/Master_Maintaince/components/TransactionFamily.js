import React from 'react'
import '../assets/css/TransactionFamily.css'
import { Link } from 'react-router-dom'
import { Table } from 'antd';


const TransactionFamily = () => {
    const columns = [
        {
            title: 'Code',
            dataIndex: 'name',
            width: 400,
        },
        {
            title: 'Name',
            dataIndex: 'age',
            width: 400,
        },
        {
            title: 'Edit',
            dataIndex: 'address',
            width: 400,
            render: (text) => <Link to="/TransactionFamilyForm">{text}</Link>
        },
    ];
    const data = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `Edit `,
        });
    }
  return (
      <div className="container-fluid">
          <div className="container-fluid  TransactionFamilyContainer">
              <div className="row w-100 mx-0">
                  <span className="TransactionFamily_listHeader">
                      Transaction Family
                      <button>Waiting For Process</button>
                  </span>
              </div>
              <div className="row px-3 mt-2 py-1">
                  <div className="col-lg-5 d-flex">
                      <input type="text" className="form-control TransactionFamily_listSearch" name="" id="" />
                      <button className="btn btn-dark mx-1">Search</button>
                  </div>
              </div>
              <div className="row  p-3">
                  <Table
                      columns={columns}
                      dataSource={data}
                      pagination={{
                          pageSize: 50,
                      }}
                      scroll={{
                          y: 240,
                      }}
                  />
                  {/* <table class="table table-striped">
                      <thead>
                          <tr>
                              <th scope="col">Code</th>
                              <th scope="col">Name</th>

                              <th scope="col">Edit</th>

                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td><button className="editBtnTable">Edit</button></td>

                          </tr>

                          <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td><button className="editBtnTable">Edit</button></td>

                          </tr>

                          <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>
                                  <Link to="">
                                <button className="editBtnTable">Edit</button>
                                </Link>
                                </td>

                          </tr>
                      </tbody>
                  </table> */}
              </div>
          </div>
      </div>
  )
}

export default TransactionFamily