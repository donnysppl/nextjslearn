"use client";

import {useState, useEffect} from 'react'; 
import ProfileComp from '@components/ProfileComp';
import Common from '@components/Common';

export default function Profile() {

  const {userSession, userSessionId, router} = Common();

    const [userPost, setuserPost] = useState([]);
    const [loader, setloader] = useState(true);

    useEffect(() => {
     const fetchPosts = async () => {
      await fetch(`/api/users/${userSession?.user.id}/posts`, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setuserPost(res.result);
            setloader(false);
          }
          else if (res.status === 300){
            alert(res.message);
          }
          else {
            alert(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
        // const response = await fetch(`/api/users/${userSession?.user.id}/posts`);
        // const data = await response.json();
        // setuserPost(data);
     }
     fetchPosts();
    }, [])

    const handleEdit = async (data) => {
      router.push(`/update-prompt?id=${data._id}`);
    }
    const handleDelete = async (data) =>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {

          
          try {
            await fetch(`/api/prompt/${data._id.toString()}`,{
              method:'DELETE',
            }).then(response => response.json())
            .then(response =>{
              console.log(response);
            });
            
          } catch (error) {
            console.log(error)
          }
        }
    }

  return (
   <ProfileComp
    name="My" disc="Welcome to your personalized profile page" loader={loader}
    data={userPost} handleEdit={handleEdit} handleDelete={handleDelete}
   />
  )
}
