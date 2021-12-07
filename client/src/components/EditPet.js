import React, {useEffect, useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import NewPet from './NewPet';
import Header from './Header';



const EditPet = (props) => {

    const {id} = props;
    const [updatingPetName, setUpdatingPetName] = useState("");
    const [updatingPetType, setUpdatingPetType] = useState("");
    const [updatingPetDescription, setUpdatingPetDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then((response)=>{
                console.log(response.data);
                setUpdatingPetName(response.data.name);
                setUpdatingPetType(response.data.type);
                setUpdatingPetDescription(response.data.description);
                setSkill1(response.data.skill1);
                setSkill2(response.data.skill2);
                setSkill3(response.data.skill3);
            })
            .catch((err)=>{
                console.log(err);
                navigate('/error');
            })
    },[id])

    const onSubmitHandler = (e)=> {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pets/${id}`,{
            name: updatingPetName,
            type: updatingPetType,
            description: updatingPetDescription,
            skill1,
            skill2,
            skill3
        })
        .then((response)=>{
            console.log(response.data);
            navigate("/");
        })
        .catch((err)=>{
            console.log(err.response);
        });
    };

    return(
        <div>
            <Header link={'/'} linkText="back to home" subText="Edit Pet"/>
            <form style={{margin:'auto', border:"1px solid black"}} onSubmit={onSubmitHandler}>
                <p>Name:
                <input type="text" onChange={(e)=> setUpdatingPetName(e.target.value)} value={updatingPetName}/><br />
                </p>
                <p>Type:
                <input type="text" onChange={(e)=> setUpdatingPetType(e.target.value)}  value={updatingPetType}/><br />
                </p>
                <p>Description:
                <input type="text" onChange={(e)=> setUpdatingPetDescription(e.target.value)} value={updatingPetDescription}/><br />
                </p>
                <p>Skills (optional) </p>
                <p>Skill 1: {" "} 
                <input type="text" onChange={e => setSkill1(e.target.value)} ></input>
                </p>
                <p>Skill 2: {" "}<input type="text" onChange={e => setSkill2(e.target.value)} ></input>
                </p>
                <p>Skill 3: {" "}<input type="text" onChange={e => setSkill3(e.target.value)} ></input>
                </p>
                <button className="btn btn-primary">Edit Pet</button>
            </form>
        </div>
    )
}

export default EditPet;


//