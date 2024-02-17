import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { useState, useEffect } from 'react';
import axios from 'axios';
import edit from '../assets/edit_icon.png'
import './style.css'
createTheme('solarized',{
    background: {
        default: '#e1f4fa',
    },
    
})
const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    
    id: '',
    shipifyNumber: '',
    date: '',
    status: '',
    customer: '',
    email: '',
    country: '',
    shipping: '',
    source: '',
    orderType: '',
  });

  const getOrders = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v2/all')
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const customStyles = {
    rows: {
        style: {
          backgroundColor: 'white',
        },
      },

      headCells: {
        style: {
          backgroundColor: 'white',
          color: 'black',  
      marginTop: '10px',
      
    
        },
        
      },
      

  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "SHIPIFY #",
      selector: (row) => row.capital,
    },
    {
      name: "DATE",
      selector: (row) => row.numericCode,
    },
    {
      name: "STATUS",
      selector: (row) => row.subregion,
    },
    {
        name: "CUSTOMER",
        selector: (row) => row.area,
    },
    {
        name: "EMAIL",
        selector: (row) => row.cioc,
    },
    {
        name: "COUNTRY",
        selector: (row) => row.alpha2Code,
    },
    {
        name: "SHIPPING",
        selector: (row) => row.region,
    },
    {
        name: "SOURCE",
        selector: (row) => row.demonym,
    },
    {
        name: "ORDER TYPE",
        selector: (row) => <img width={50} height={50} src={row.flag}/>,
    },
    {
        name: "Action",
        cell: row => <button className="btn btn-primary" onClick={() => {}}> Edit</button>
    }
  ]



  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const result = orders.filter(order => {
        return order.name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredOrders(result)
  }, [search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateOrder = () => {
    
    console.log('New order data:', newOrderData);

    setShowCreateModal(false);
    setNewOrderData({
      id: '',
      shipifyNumber: '',
      date: '',
      status: '',
      customer: '',
      email: '',
      country: '',
      shipping: '',
      source: '',
      orderType: '',
    });
  };
  

  return (
    <div className="custom-data-table">

        <DataTable 
            title="Orders" 
            columns={
                columns
            } 
            data={filteredOrders} 
            pagination
            paginationPosition="top"
            fixedHeader
            fixedHeaderScrollHeight='500px'
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions={
                <button className="custom-button" onClick={() => setShowCreateModal(true)}>CREATE NEW</button>
            }
            subHeader
            subHeaderComponent = {
                    
                    <div className="big-div">
                        <div className="small-div">
                            <h6>What are you looking for?</h6>
                            <input 
                                type='text' 
                                placeholder='Search for category, name, company, etc...' 
                                className=' form-control' 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}               
                            ></input>
                        </div>

                        <div className="small-div">
                            <h6>Category</h6>
                            <select name="category" id="category" className=' form-control'>
                                <option value="all">All</option>
                                
                            </select>                                                   
                        </div>

                        <div className="small-div">
                            <h6>Status</h6>
                            <select name="category" id="category" className=' form-control'>
                                <option value="all">All</option>
                                
                            </select> 
                        </div>

                        <div className="small-div">
                            
                            <h6>Search</h6>
                            <button className="custom-button">SEARCH</button>
                        </div>
                    </div>

                    
                
            }
            subHeaderAlign='left'
            theme="solarized"
            customStyles={customStyles}
            
        />
        {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreateModal(false)}>
              &times;
            </span>
            <h2>Create New Order</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              
              <label>ID:</label>
              <input type="text" name="id" value={newOrderData.id} onChange={handleInputChange} />
              
              <button type="submit" onClick={handleCreateOrder}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTable