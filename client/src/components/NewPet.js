import React, {useState} from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import Header from './Header';

const NewPet = (props) => {
    const[errors, setErrors]= useState({});
    const [newPetName, setNewPetName] = useState("");
    const [newPetType, setNewPetType] = useState("");
    const [newPetDescription, setNewPetDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");

    const newSubmitHandler = (e)=> {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pets',{
            name: newPetName, //: newPetName.name,
            type: newPetType, //:newPetType.type,
            description: newPetDescription, //:newPetDescription.description,
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
            setErrors(err.response.data.errors);
        });
    };

    return(
        <div>
            <Header link={'/'} linkText="back to home" subText="Know a pet needing a home?"/>
            <form onSubmit={newSubmitHandler}>
                <p>
                    Pet Name:
                <input type="text" onChange={(e)=> setNewPetName(e.target.value)} value={newPetName}/><br />
                </p>
                <p>
                    Pet Type:
                <input type="text" onChange={(e)=> setNewPetType(e.target.value)} value={newPetType}/><br />
                </p> 
                <p>
                    Pet Description:
                <input type="text" onChange={(e)=> setNewPetDescription(e.target.value)} value={newPetDescription}/><br />
                </p> 
                <p>Skills(optional):</p>
                <p>Skill 1: {" "}
                <input type="text" onChange={e => setSkill1(e.target.value)} value={skill1}></input></p>
                <p>Skill 2: {" "}
                <input type="text" onChange={e => setSkill2(e.target.value)} value={skill2}></input></p>
                <p>Skill 3: {" "}
                <input type="text" onChange={e => setSkill3(e.target.value)} value={skill3}></input></p>
                <input type="submit" value="Add Pet" className="btn btn-primary" />
            </form>
            {errors &&
                Object.keys(errors).map((objKey, index) => (
                    <p key={index}>{errors[objKey].message}</p>
                ))}
        </div>
    )
}

export default NewPet;

//

