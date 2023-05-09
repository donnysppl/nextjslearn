"use client";

import {useState, useEffect} from 'react';
import Promtcard from './Promtcard';

const PromtCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {
        data && data.map((item,index)=> (
          <Promtcard 
            key={index} post={item} handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )

}

export default function Feed() {

  const [searchText, setsearchText] = useState('');
  const [post, setpost] = useState([]);
  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setpost(data);
    }
    fetchPosts();
  },[]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' >
        <input type="text" placeholder='Search For a tag or a username' required
        value={searchText} onChange={handleSearchChange} className='search_input peer' />
      </form>

      <PromtCardList 
        data={post} handleTagClick={() => {}}
      />
    </section>
  )
}
