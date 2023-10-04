import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./../styles/loder.css"
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const Results = () => {
  const data=useSelector((store)=>store)
  const [searchParams, setSearchParams] = useSearchParams({});
  const page=searchParams.get("page")
  const title=searchParams.get("title")
  const [updatevalue,setupdatevalue]=useState("")
  const [postId,setPostId]=useState("")
  const [sorteddata,setsorteddata]=useState([])

  const HandleEdititem=async(id)=>{
    const res = await axios.put(`http://68.178.162.203:8080/application-test-v1.1/books/${id}`, {
      title: updatevalue,
    });
    if (res?.status==200) {
      alert("posts updated successfully")
      // toast('🦄 Wow so easy!', {
      //   position: "top-right",
      //   autoClose: 111,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   });
        
    }
      }
const HandleAscending=async()=>{
  const sortedNumbersAsc = data?.bookReducer?.products.sort((a, b) => a.year - b.year);
setsorteddata(sortedNumbersAsc);
}

const HandleDeacending=async()=>{
  const sortedNumbersdsc = data?.bookReducer?.products.sort((a, b) => b.year - a.year);
setsorteddata(sortedNumbersdsc);
}


  const Pagination = ({ pageCount }) => {
   
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <Link className='text-decoration-none' to={`/?page=${i}&title=${title}`} ><span
          // onClick={() => router.push(`/dashboard/gallery/?page=${i}`)}
          style={{
            backgroundColor: page == i ? "#0195F7" : "white",
            borderRadius: "50%",
            cursor: "pointer",
            color:page == i ? "white" : "black"
          }}
          className="px-3 py-2"
          key={i}
        >
          {i}
        </span></Link>
      );
    }

    return (
      <div style={{ position: "", bottom: "0" }} className="w-100">
        <div className="d-flex flex-row gap-5 justify-content-center py-5 text-white">
          {pages}
        </div>
      </div>
    );
  };


  return (
    <>
    <div className='d-flex justify-content-center gap-2 my-3'>
    <button type="button" class="btn btn-primary" onClick={HandleAscending}>Ascending</button>
<button type="button" class="btn btn-secondary" onClick={HandleDeacending}>Decending</button>

  </div>
    
    {data?.bookReducer?.isLoading &&<div className="loader mx-auto"></div>}
     <ul class="list-group w-75 mx-auto">

    { data?.bookReducer?.products?.map((item,index)=>{
 
  return  <li class="list-group-item d-flex justify-content-between " key={index}>{ item.title} 
   
    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=> setPostId(item.id)}>Edit</button>  </li>
 })}
 
</ul>
   
<Pagination pageCount={data?.bookReducer?.totalCount>1 && data?.bookReducer?.totalCount
} />
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Update title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <input type="text" className="form-control my-3 " onChange={(e)=>setupdatevalue(e.target.value)}   placeholder="Update Item"></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={(e)=>HandleEdititem(postId)}>Update</button>
      </div>
    </div>
  </div>
</div>

  </>
   
  )
}

export default Results
