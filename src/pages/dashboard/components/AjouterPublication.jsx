import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useForm} from "react-hook-form"

function AjouterPublication() {

    const user = JSON.parse(localStorage.getItem("utilisateur")) 
    const {handleSubmit, register, formState: {errors}, reset} = useForm()
    const onSubmit = (data) => {
        const publication = {
            ...data,
            idUtilisateur: user.id,
            dataPublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur
        }

        axios.post("http://localhost:3000/publications", publication)
        .then((res) => {
            console.log(res.data)
            alert("Publication ajoutée !")
            reset()
        }).catch((err) => {
            console.log(err)
            alert("Une erreur est survenue !")
        })
    }
    return (
        <Stack width={"60%"} margin={"auto"}>
            <h1>Ajouter une publication</h1>
            <form style={{
                marginTop: 4
            }} onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2}>
                <TextField id="filled-basic" label="Parlez nous de votre journee" 
                    variant="outlined" fullWidth size="small" type="text" multiline rows={4}
                    {...register("textePublication", {required: "Veuillez saisir un texte", 
                    minLength: {value:10, message: "Veuillez saisir un texte de plus de 5 caracteres !"}})}/>
                <TextField id="filled-basic" label="Saisir l'url de votre image" 
                    variant="outlined" fullWidth size="small" type="text"
                    {...register("imagePublication", {required: "Veuillez saisir l'url de votre image"})}/>
                <Button variant="contained" type="submit">Publier</Button>
                </Stack>
            </form>
        </Stack>
    );
}

export default AjouterPublication;