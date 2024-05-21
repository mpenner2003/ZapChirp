import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/contacts')
            .then(response => {
                setContacts(response.data);
            });
    }, []);

    const addContact = () => {
        if (newContact !== "") {
            axios.post('http://localhost:3001/contacts', { name: newContact })
                .then(response => {
                    setContacts([...contacts, response.data]);
                    setNewContact("");
                });
        }
    };

    return (
        <div>
            <h3>Contacts</h3>
            <input
                type="text"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="Add new contact"
            />
            <button onClick={addContact}>Add</button>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>{contact.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Contacts;