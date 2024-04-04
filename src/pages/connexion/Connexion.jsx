import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {useForm} from "react-hook-form"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function Connexion() {

    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem("utilisateur")){
            navigate("/")
        }
    })
    const {handleSubmit, register} = useForm()
    const onSubmit = (data) => {
        axios.get(`http://localhost:3000/utilisateurs?email=${data.email}&motDePasse=${data.motDePasse}`)
        .then((res) => {
            if(res.data.length > 0){
                localStorage.setItem("utilisateur", JSON.stringify(res.data[0]))
                navigate("/")
                alert("Connexion reussie !")
            }else{
                alert("Les identifiants sont incorrects !")
            }
        })
    }
    return (
        <Stack alignItems={"center"}
        justifyContent={"center"} width={"100%"} height={"100vh"} 
        bgcolor={"#f5f5f5"}>
            <Box width={"400px"} sx={
                {
                    bgcolor: "#fff",
                    padding: 3
                }
            }>
                <Typography variant="h5" sx={{
                    display:"flex",
                    justifyContent:"center"
                }}>Connexion</Typography>
                <form style={{
                    marginTop: 4
                }} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={"column"} gap={2}>
                        <TextField id="filled-basic" label="Veuillez saisir votre adresse email" type="email"
                        variant="outlined" fullWidth {...register("email", {required: "Veuillez saisir votre adresse email", 
                        pattern:"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/"})}/>
                        <TextField id="filled-basic" label="Veuillez saisir votre mot de passe" 
                        variant="outlined" fullWidth type="password" {...register("motDePasse", {required: "Veuillez saisir un mot de passe", 
                        minLength:{value: 6, message: "Veuillez saisir un mdp de plus de 08 caracteres"}})}/>
                    </Stack>
                    <Button variant="contained" sx={{
                        marginTop: 2
                    }} type="submit">Connexion</Button>
                    <Typography sx={{
                            marginTop:2
                        }}>Voulez vous creer un compte ? 
                        <Link to="/Inscription">Cliquez ici !</Link>
                    </Typography>
                </form>
            </Box>
        </Stack>
    );
}

export default Connexion;