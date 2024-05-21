import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
    // State variables to manage the list of contacts and new contact input
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState("");

    // useEffect hook to fetch contacts from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3001/contacts')
            .then(response => {
                setContacts(response.data); // Update the contacts state with the fetched data
            });
    }, []);

    // Function to add a new contact
    const addContact = () => {
        if (newContact !== "") {
            axios.post('http://localhost:3001/contacts', { name: newContact })
                .then(response => {
                    setContacts([...contacts, response.data]); // Update the contacts state with the new contact
                    setNewContact(""); // Clear the new contact input field
                });
        }
    };

    return (
        <div>
            <h3>Contacts</h3>
            <input
                type="text"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)} // Update the new contact state on input change
                placeholder="Add new contact"
            />
            <button onClick={addContact}>Add</button> {/* Call addContact function on button click */}
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>{contact.name}</li> 
                ))} {/* Render the list of contacts */}
            </ul>
        </div>
    );
}

export default Contacts;