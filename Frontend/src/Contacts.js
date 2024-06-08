// Contacts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts({ onSelectContact, onCreateGroupChat }) {
    // State variables to manage the list of contacts and new contact input
    const [contacts, setContacts] = useState([]);
    const [newContactName, setNewContactName] = useState("");
    const [newContactEmail, setNewContactEmail] = useState("");

    // useEffect hook to fetch contacts from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/contacts')
            .then(response => {
                setContacts(response.data); // Update the contacts state with the fetched data
            });
    }, []);

    // Function to add a new contact
    const addContact = () => {
        if (newContactName !== "" && newContactEmail !== "") {
            axios.post('http://localhost:3000/contacts', { name: newContactName, email: newContactEmail })
                .then(response => {
                    setContacts([...contacts, response.data]); // Update the contacts state with the new contact
                    setNewContactName(""); // Clear the new contact name input field
                    setNewContactEmail(""); // Clear the new contact email input field
                });
        }
    };

    return (
        <div>
            
            <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)} // Update the new contact name state on input change
                placeholder="Add new contact name"
            />
            <input
                type="email"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)} // Update the new contact email state on input change
                placeholder="Add new contact email"
            />
            <button onClick={addContact}>Add</button> {/* Call addContact function on button click */}
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        <button onClick={() => onSelectContact(contact)}>{contact.name}</button>
                        <button onClick={() => onCreateGroupChat(contact)}>Start Group Chat</button>
                    </li> 
                ))} {/* Render the list of contacts */}
            </ul>
        </div>
    );
}

export default Contacts;
