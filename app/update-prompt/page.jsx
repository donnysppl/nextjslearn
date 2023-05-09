"use client";

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import Form from '@components/Form';

export default function UpdatePrompt() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const { data: session } = useSession();
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setpost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        if(promptId) getPromptDetails()
    }, [promptId])


    const updatePrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);

        if(!promptId) return alert('Prompt ID not found')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if (response.ok) {
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
            type="Edit" post={post} setpost={setpost}
            submitting={submitting} handleSubmit={updatePrompt}
        />
    )
}

