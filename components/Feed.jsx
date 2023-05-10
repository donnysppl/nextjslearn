"use client";

import { useState, useEffect } from 'react';
import Promtcard from './Promtcard';

const PromtCardList = ({ data, handleTagClick, loader }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        !loader ?
        data && data.map((item, index) => (
          <Promtcard
            key={index} post={item} handleTagClick={handleTagClick}
          />
        ))
        : "Loading..."
      }
    </div>
  )

}

export default function Feed() {

  const [loader, setloader] = useState(true);
  const [searchText, setsearchText] = useState('');
  const [post, setpost] = useState([]);
  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch('/api/prompt', {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setpost(res.result);
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
    }
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' >
        <input type="text" placeholder='Search For a tag or a username' required
          value={searchText} onChange={handleSearchChange} className='search_input peer' />
      </form>

      <PromtCardList
        data={post} handleTagClick={() => { }} loader={loader}
      />
    </section>
  )
}
