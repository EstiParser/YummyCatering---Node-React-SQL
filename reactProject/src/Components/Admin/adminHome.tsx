import axios from 'axios';
import { useState, useEffect } from 'react';

function Home() {
    const [, setResponse] = useState(null);
    const [name, setName] = useState(null);
    const [addres, setAddres] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);


    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const { data } = await axios.get('http://localhost:3001/business/get', {
                    headers: {
                        authorization: token
                    }
                });
                
                if (data && data.length > 0) {
                    setAddres(data[0].address);
                    setEmail(data[0].email);
                    setName(data[0].businessName);
                    setPhone(data[0].businessPhone);
                }
                setResponse(data);
            } catch (error) {
                console.error('Error fetching business details', error);
            }
        };

        fetchDetails();
    }, []);

    return (
        <div>
            <h1>business  details</h1>


            <div>
                <h3>name</h3>
                <p>{name}</p>
            </div>
            <div>
                <h3>phone</h3>
                <p>{phone}</p>
            </div>
            <div>
                <h3>email</h3>
                <p>{email}</p>
            </div>
            <div>
                <h3> addres</h3>
                <p>{addres}</p>
            </div>



        </div>
    );
}

export default Home;