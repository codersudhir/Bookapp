import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import useThrottle from './usethrottle'
import { getProducts } from '../Redux/action'
import axios from 'axios'

const Searchbar = () => {
  const param=useParams()
  const dispatch=useDispatch()
  const data=useSelector((store)=>store)
  const [query, setquery] = useState("");
  const [add,setadd]=useState({author:"",
  country:	"",
  language:"",
  link:	"",
  pages	:"1",
  title	:"",
  year:""})
  const [searchParams, setSearchParams] = useSearchParams({});
  const throttletext=useThrottle(query,2000)
  const page=searchParams.get("page")

  const handleChange = (e) => {
    setSearchParams({page: 1,title: e.target.value});
    setquery(e.target.value);
  };

const HandleAddBook=async()=>{
 let response=await axios.post("http://68.178.162.203:8080/application-test-v1.1/books",add)
 if(response.status==200){
  alert("Book added successfully")
  window.location.href = '/';
 }
}


  
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
<button type="button" className="btn btn-outline-info m-auto my-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add To A Book List </button>
{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add To A Book the List </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
<div className='d-flex gap-2'>
<div class="w-50">
    <label for="exampleInputEmail1" class="form-label">Title</label>
    <input type="text" class="form-control" onChange={(e)=>setadd({...add,title:e.target.value})} />
  
  </div>
  <div class="w-50">
    <label for="exampleInputPassword1" class="form-label">Auther</label>
    <input type="text" class="form-control" onChange={(e)=>setadd({...add,author:e.target.value})} />
  </div>
</div>
<div className='d-flex gap-2'>
<div class="w-50">
    <label for="exampleInputEmail1" class="form-label">Country</label>
    <input type="text" class="form-control" onChange={(e)=>setadd({...add,country:e.target.value})} />
  
  </div>
  <div class="w-50">
    <label for="exampleInputPassword1" class="form-label">Language</label>
    <input type="text" class="form-control" onChange={(e)=>setadd({...add,language:e.target.value})} />
  </div>
</div>
<div className='d-flex gap-2'>
<div class="w-50">
    <label for="exampleInputPassword1" class="form-label">Link</label>
    <input type="text" class="form-control" onChange={(e)=>setadd({...add,link:e.target.value})} />
  </div>
  <div class="w-50">
    <label for="exampleInputEmail1" class="form-label">Pages</label>
    <input type="number" class="form-control" onChange={(e)=>setadd({...add,pages:e.target.value})} />
  
  </div>
</div>
 
  <div >
    <label for="exampleInputPassword1" class="form-label">Year</label>
    <input type="number" class="form-control" onChange={(e)=>setadd({...add,year:e.target.value})} />
  </div>

</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={HandleAddBook}>Add Book</button>
        
      </div>
    </div>
  </div>
</div>
</div>


</nav>
  )
}

export default Searchbar
