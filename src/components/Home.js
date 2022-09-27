import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Home = () =>{
    const loginedUser = useSelector((state) => state.login.loginUser)
    const registeredUsers = useSelector((state)=> state.register.registeredUsers)
    
    const userExists = registeredUsers.find(item => loginedUser.email === item.email)
    return (
        <>
        { userExists ? <h2>Welcome {userExists?.name}</h2> : 
        
        <Link to="/login">
            <Box component={"h2"}>Go to login</Box>
        </Link>
        }
        </>

        
    )
}

export default Home