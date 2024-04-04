import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {useForm} from "react-hook-form"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Inscription() {
    const navigate = useNavigate()
    const {handleSubmit, register} = useForm()
    const onSubmit = (data) => {
        if(data.motDePasse !== data.motDePasseConfirmation){
            alert("Les mots de passe ne correspondent pas !")
        }else {
            axios.get(`http://localhost:3000/utilisateurs?email=${data.email}`)
            .then((res) => {
                if(res.data.length > 0){
                    alert("Un compte existe deja avec cet adresse email")
                }else{
                    axios.post("http://localhost:3000/utilisateurs", data)
                    .then((res) =>{
                        console.log(res)
                        alert("Inscription reussie !")
                        navigate("/connexion")
                    }).catch((err) => {
                        console.log(err)
                        console.log("Une erreur est survenue !")
                    })
                }
            })
        }
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
                <Typography variant="h5"
                sx={{
                    display:"flex",
                    justifyContent:"center"
                }}>Inscription</Typography>
                <form style={{
                    marginTop: 4
                }} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={"column"} gap={2}>
                        <TextField id="filled-basic" label="Veuillez saisir votre nom" 
                        variant="outlined" fullWidth {...register("nomUtilisateur", {required: "Veuillez saisir un nom", 
                        minLength:{value: 5, message: "Veuillez saisir un nom de plus de 05 caracteres"}})}/>
                        <TextField id="filled-basic" label="Veuillez saisir votre adresse email" type="email"
                        variant="outlined" fullWidth {...register("email", {required: "Veuillez saisir votre adresse email", 
                        pattern:"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/"})}/>
                        <TextField id="filled-basic" label="Veuillez saisir votre mot de passe" 
                        variant="outlined" fullWidth type="password" {...register("motDePasse", {required: "Veuillez saisir un mot de passe", 
                        minLength:{value: 6, message: "Veuillez saisir un mdp de plus de 08 caracteres"}})}/>
                        <TextField id="filled-basic" label="Veuillez confirmer votre mot de passe" 
                        variant="outlined" fullWidth type="password" {...register("motDePasseConfirmation", {required: "Veuillez saisir un mot de passe", 
                        minLength:{value: 6, message: "Veuillez saisir un mdp de plus de 08 caracteres"}})}/>
                    </Stack>
                    <Button variant="contained" sx={{
                        marginTop: 2
                    }} type="submit">Inscription </Button>
                    <Typography sx={{
                            marginTop:2
                        }}>J'ai deja un compte, 
                        <Link to="/Connexion">Connexion</Link>
                    </Typography>
                </form>
            </Box>
        </Stack>
    );
}

export default Inscription;