import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


const Workout = () => {

    const callApi = async () => {
        try {
            const response = await axios.get('/ExerciseUser');
            console.log("RESPONSE.DATA: ", response.data)
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    useEffect(() => {
        callApi();
    }, []);

    return (
        <div>
            <div>
                <img />
                <p></p>
            </div>

        </div>
    )
}

export default Workout