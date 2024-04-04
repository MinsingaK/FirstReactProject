import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AjouterPublication from "./components/AjouterPublication";
import axios from "axios";

function Dashboard() {
    
    const [publications, setPblications] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem("utilisateur")){
            navigate("/connexion")   
        }
        axios.get("http://localhost:3000/publications").then((res) => {
            setPblications(res.data)
        })
    }, [])
    console.log(publications)
    return (
        <Box bgcolor={"#eef4ff"}>
            <Navbar />
            <AjouterPublication />
            <Box width={"50%"} margin={"auto"}>
                {publications.map((publication) => 
                <Box width={"100%"} bgcolor={"#ffff"} borderRadius={4} 
                marginBottom={2} padding={2} marginTop={2}>
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                        <Avatar src={publication.photoUtilisateur} />
                        <Typography>{publication.auteur}</Typography>
                    </Stack>
                    <Typography>{publication.textePublication}</Typography>
                    <p>{publication.imagePublication}</p>
                </Box>)}
            </Box>
        </Box>
    );
}

export default Dashboard;