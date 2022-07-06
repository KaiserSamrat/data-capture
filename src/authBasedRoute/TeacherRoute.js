import React from 'react'

import {Route, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
 
import LoadingToRedirect from './LoadingToRedirect'
const TeacherRoute = ({children, ...rest})=>{


    const {  token, email, userrole } = useSelector(state => ({ ...state.Login }))

     
    
    return(
        token && userrole === "teacher" ? (
             
            <Route {...rest} render ={()=> children}/>
         
        ): (
        <LoadingToRedirect />
        )
    )
}

export default TeacherRoute