import React, {useEffect, useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import Header from './Header';

const AllPets = (props) => {
    const [petList, setPetList] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8000/api/pets')
            .then((response)=>{
                console.log(response);
                console.log(response.data);
                setPetList(response.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])

    return(
        <div>
            <Header link={'/new'} linkText="Add a pet to the shelter" subText="These pets are looking for a good home"/>
            <table style={{margin:"auto", border:"1px solid black"}}>
                <thead style={{backgroundColor:"lightgray"}}>
                    <tr>
                        <th>Names</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        petList?
                        petList.map((pet, index)=>(
                            <tr key={index}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <button onClick={()=>{navigate(`/edit/${pet._id}`)}} className="btn btn-link" >Edit</button>
                                |
                                <button onClick={()=>{navigate(`/details/${pet._id}`)}} className="btn btn-link">Details</button>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
        </div>
    )
}


export default AllPets;


//