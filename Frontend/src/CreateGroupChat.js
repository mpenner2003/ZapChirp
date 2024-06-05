import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateGroupChat({ onGroupCreated }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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
        <h3>Select Members</h3>
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
      </div>
      <button onClick={handleCreateGroup}>Create Group Chat</button>
    </div>
  );
}

export default CreateGroupChat;