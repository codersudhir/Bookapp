import axios from "axios";
import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from "./actiontypes";


export const getProducts =async (dispatch,params,page) => {
 
    try {
        dispatch({ type: GET_BOOKS_LOADING })
        const response = await axios.get(`http://68.178.162.203:8080/application-test-v1.1/books?page=${page}&title=${params}`)
        dispatch({ type: GET_BOOKS, payload: response.data })
    } catch (error) {
        dispatch({ type: GET_BOOKS_ERROR, payload: error })
    }
}