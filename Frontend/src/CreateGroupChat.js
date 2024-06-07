import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateGroupChat({ onGroupCreated }) {
  const [groupName, setGroupName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    // Fetch all users to select as members
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateGroup = async () => {
    if (groupName === "" || selectedUsers.length === 0) {
      alert("Please provide a group name and select at least one member.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/groupChats', {
        groupName,
        members: selectedUsers
      });
      alert('Group chat created successfully!');
      onGroupCreated(response.data);
    } catch (error) {
      console.error('Error creating group chat:', error);
      alert('Failed to create group chat.');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleAddNewUser = () => {
    if (newUserName === "" || newUserEmail === "") {
      alert("Please provide both name and email.");
      return;
    }

    const newUser = {
      _id: new Date().getTime().toString(), // Temporary ID until saved to the server
      username: newUserName,
      email: newUserEmail
    };

    setAllUsers([...allUsers, newUser]);
    setSelectedUsers([...selectedUsers, newUser._id]);
    setNewUserName("");
    setNewUserEmail("");
  };

  return (
    <div className="createGroupChatContainer">
      <h2>Create Group Chat</h2>
      <input
        type="text"
        placeholder="Group Name..."
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <div className="userSelection">
        {allUsers.map(user => (
          <div key={user._id}>
            <input
              type="checkbox"
              id={`user-${user._id}`}
              checked={selectedUsers.includes(user._id)}
              onChange={() => handleSelectUser(user._id)}
            />
            <label htmlFor={`user-${user._id}`}>{user.username}</label>
          </div>
        ))}
        <h2>Add New Member</h2>
        <input
          type="text"
          placeholder="Name..."
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email..."
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button onClick={handleAddNewUser}>Add Member</button>
      </div>
      <button onClick={handleCreateGroup}>Create Group Chat</button>
    </div>
  );
}

export default CreateGroupChat;