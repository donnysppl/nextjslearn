import {useState} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Common from '@components/Common';

export default function Promtcard({post, handleTagClick, handleEdit, handleDelete}) {
  
  const {userSession} = Common();
  const [copied, setcopied] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setcopied(""),3000);
  }

  return (
    <div className='prompt_card overflow-hidden'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image className='rounded-full'
            src={post.creator.image} alt="user_image" width={40} height={40}
          />
          <div className='flex flex-col overflow-hidden'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>

          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
          src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          width={12} height={12} />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p onClick={() => handleTagClick && handleTagClick(post.tag)}
       className='font-inter text-sm blue_gradient cusror-pointer'>{post.tag}</p>

       {userSession?.user.id === post.creator._id && 
       pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-200 pt-3'>
          <p className='font-inter text-sm green_gradient curser-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient curser-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
       )}
    </div>
  )
}
