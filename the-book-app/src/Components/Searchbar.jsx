import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import useThrottle from './usethrottle'
import { getProducts } from '../Redux/action'

const Searchbar = () => {
  const param=useParams()
  const dispatch=useDispatch()
  const data=useSelector((store)=>store)
  const [query, setquery] = useState("");
  
  const [searchParams, setSearchParams] = useSearchParams({});
  const throttletext=useThrottle(query,2000)
  const page=searchParams.get("page")
  const handleChange = (e) => {
    setSearchParams({page: 1,title: e.target.value});
    setquery(e.target.value);
  };
  
  useEffect(()=>{
    if(query?.length>0){
      getProducts(dispatch,query,page)
    }
  },[throttletext])
  useEffect(()=>{
    if(query?.length>0){
      getProducts(dispatch,query,page)
    }
  },[page])



   
  return (
    <nav className="container my-2">
        <h3 className='text-center'>Book App</h3>
  <form className="d-flex " role="search">
  <input className="form-control w-75 mx-auto" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={query}/>
  
</form>
<div className='d-flex mx-auto dropup-center'>
<button type="button" className="btn btn-outline-info m-auto my-3" data-bs-toggle="dropdown" aria-expanded="false">Add To A Book List </button>
<div class="dropdown-menu w-75">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </div>
</div>


</nav>
  )
}

export default Searchbar
