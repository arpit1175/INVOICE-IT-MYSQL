import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './potable.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Addpo from './Addpo';
import { Link } from 'react-router-dom';

const Potable = () => {

  const [podata, setpodata] = useState([]);
  console.log(podata)


  const getdata = async (e) => {

    const res = await fetch("http://localhost:8002/getallpo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error")
    } else {

      setpodata(data);
      console.log("get data")
    }

  }

  useEffect(() => {
    getdata();
  }, []);

  const deletepo = async (id) => {

    const res2 = await fetch(`http://localhost:8002/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },

    }
    )

    const deletepo = await res2.json()
    console.log(deletepo)
    if (res2.status === 404 || !deletepo) {
      console.log("error")
    } else {
      console.log("deleted")
      getdata();
    }


  };
  const [searchvalue, setsearchvalue] = useState("")

  const search = (e) => {
    e.preventDefault();
    const serachdata = document.getElementById('search').value
    console.log(serachdata)
    setsearchvalue(serachdata);

    searchdata();

  }
  console.log(searchvalue)

  const searchdata = async (e) => {

    const res = await fetch(`http://localhost:8002/search/${searchvalue}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error")
    } else {

      setpodata(data);
      console.log("get data")
    }

  }

  return (
    <>
      <Addpo />
      <div className='mt-5 cont '>
        <form class="d-flex search mb-5" role="search">
          <input class="form-control me-2" placeholder="Search order by PO Number" aria-label="Search" id='search' />
          <button class="btn btn-outline-success" type="submit" onClick={search}>Search</button>
        </form>
        <div className='container'>

          <Table >
            <thead>
              <tr className='table-dark'>
                <th>Order#</th>
                <th>Order Date</th>
                <th>PO #</th>
                <th>Customer</th>
                <th>Item ID</th>
                <th>Status</th>
                <th>Created By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {
                podata.map((ele, order) => {
                  return <>

                    <tr>
                      <td>{ele.order}</td>
                      <td>{ele.date}</td>
                      <td>{ele.po}</td>
                      <td>{ele.name}</td>
                      <td>{ele.id}</td>
                      <td>{ele.status}</td>
                      <td>{ele.createdby}</td>
                      <td className='d-flex justify-content-between '>

                        <Link to={`view/${ele.id}`}>
                          <RemoveRedEyeIcon className='icons' />
                        </Link>
                        <Link to={`edit/${ele.id}`}>
                          <CreateIcon className='icons' />
                        </Link>


                        <DeleteIcon className='icons' onClick={() => deletepo(ele.id)} />

                      </td>
                    </tr>
                  </>
                })
              }


            </tbody>
          </Table>
        </div>

      </div>
      

    </>
  )
}

export default Potable