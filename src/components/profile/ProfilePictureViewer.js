import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { openDatabase, getUserData } from '../../db';

const ProfilePictureViewer = () => {
  const { email } = useParams();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = await openDatabase();
      const userData = await getUserData(db, email);
      if (userData && userData.profilePicture) {
        setProfilePicture(userData.profilePicture);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div>
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" />
      ) : (
        <p>No profile picture available.</p>
      )}
    </div>
  );
};

export default ProfilePictureViewer;
