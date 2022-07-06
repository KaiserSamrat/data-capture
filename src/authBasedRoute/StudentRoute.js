import React from 'react'

import {Route, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

 

import LoadingToRedirect from './LoadingToRedirect'
const StudentRoute = ({children, ...rest})=>{


    const {  token, email, userrole } = useSelector(state => ({ ...state.Login }))
 
     
    return(
        token && userrole === "student" ? (
            
            <Route {...rest} render ={()=> children}/>
          
        ): (
        <LoadingToRedirect />
        )
    )
}

export default StudentRoute