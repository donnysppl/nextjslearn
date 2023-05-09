"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Form from '@components/Form';

export default function CreatePrompt() {

    const router = useRouter();
    const {data:session} = useSession();
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);

        console.log({
            prompt: post.prompt,
            tag: post.tag,
            userID: session?.user.id,
        })

        try {
            const response = await fetch('/api/prompt/new',{
                method:'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userID: session?.user.id,
                })
            })
            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setsubmitting(false);
        }
    }
    return (
        <Form
            type="Create" post={post} setpost={setpost}
            submitting={submitting} handleSubmit={createPrompt}
        />
    )
}
