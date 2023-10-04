import React from 'react'
import { useSelector } from 'react-redux'
import "./../styles/loder.css"
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
const Results = () => {
  const data=useSelector((store)=>store)
  const [searchParams, setSearchParams] = useSearchParams({});
  const page=searchParams.get("page")
  const title=searchParams.get("title")
  const HandleEdititem=async(id)=>{
    const res = await axios.put(`http://68.178.162.203:8080/application-test-v1.1/books/${id}`, {
      title: 'title',
    });
    
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

  
  console.log(data?.bookReducer);
  return (
    <>
    {data?.bookReducer?.isLoading &&<div className="loader mx-auto"></div>}
     <ul class="list-group w-75 mx-auto">
 {data?.bookReducer?.products?.map((item,index)=>{
 
  return  <li class="list-group-item d-flex justify-content-between " key={index}>{item.title} <button type="button" class="btn btn-primary btn-sm" onClick={(e)=>HandleEdititem(item?.id)}>Edit</button> </li>
 })}
 
</ul>
   
<Pagination pageCount={data?.bookReducer?.totalCount>1&&data?.bookReducer?.totalCount
} />
  </>
   
  )
}

export default Results
