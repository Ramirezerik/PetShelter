import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import { navigate } from '@reach/router';

const PetDetails = (props) => {
    const {id} = props;
    const [pets, setPets] = useState({});
    const [pet, setPet]= useState({});

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then((response)=>{
                console.log(response);
                console.log(response.data);
                setPets(response.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])

    const deleteHandler = (id)=> {
        axios.delete(`http://localhost:8000/api/pets/${id}`)
            .then((response)=>{
                console.log(response);
                setPet(pet.filter((pet)=>pet._id !== id));
                navigate("/")
            })
            .catch((err)=>{
                console.log(err.response);
            });
    }

    return(
        <div>
            <Header link={'/'} linkText="back to home" subText="Details about " />
                <h3>{pets.name}</h3>
            <fieldset>
                <h3>Pet Type: {pets.type}</h3>
                <h3>Pet Description: {pets.description}</h3>
                <h3>Skills (optional)</h3>
                    <li>{pets.skill1}</li>
                    <li>{pets.skill2}</li>
                    <li>{pets.skill3}</li>

                <input onClick={(e)=> deleteHandler(pets._id)} className="btn btn-danger" value="Adopt Pet" />
            </fieldset>
        </div>
    )
}


export default PetDetails;

//