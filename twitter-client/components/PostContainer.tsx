'use client'

import React, { useRef, ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/user'
import { GoFileMedia } from 'react-icons/go';
import { MdCancelPresentation } from "react-icons/md";
import { useCreateTweet } from '@/hooks/tweet';

const PostContainer = () => {
    const { user } = useCurrentUser();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [theContent,setContent]=useState<string>("");
    const {mutate}=useCreateTweet();
    const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };
    const handlePost = () => {
        mutate({
            content:theContent,
        })
        setContent("");
        if (textareaRef.current) {
            textareaRef.current.value = '';
            textareaRef.current.style.height = 'auto';
        }
        setSelectedImage(null);
    };
    return (
        <div className="w-full bg-app-background text-app-text-primary border-app-border border-b-2 pb-2 pt-3">
            <div className="grid grid-cols-[1fr_11fr]">
                <div className='m-2'>
                    <Image
                        src={(user && user.profileImageURL) ? user.profileImageURL : "/images/profile_photo.webp"}
                        alt={(user && user.firstName) ? user.firstName : "profileimage"}
                        width={30}
                        height={30}
                        className="w-full h-auto rounded-full object-cover"
                    />
                </div>
                <div>
                    <div className='w-full px-2 mt-2 text-xl text-app-text-primary '>
                        <div className='border-app-border border-b-2'>
                            <div>
                                <textarea
                                    ref={textareaRef}
                                    id="comments"
                                    name="comments"
                                    rows={3}
                                    placeholder="What is happening?!"
                                    required
                                    onInput={handleInput}
                                    className='w-full bg-app-background focus:outline-none resize-none'
                                    onChange={(e)=>setContent(e.target.value)}
                                    value={theContent}
                                ></textarea>
                            </div>
                            <div>
                                {selectedImage && (
                                    <div className="mt-2">
                                        <img src={selectedImage} alt="Selected" className="max-w-full h-auto rounded" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 px-3">
                        <div className='flex gap-3'>
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <GoFileMedia className="text-app-icon-default hover:text-app-icon-hover transition-colors duration-300" size={24} />
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            {selectedImage && <MdCancelPresentation size={24} onClick={()=>{setSelectedImage(null)}} className="text-app-icon-default hover:text-app-icon-hover transition-colors duration-300"/>}
                        </div>
                        <button
                            onClick={handlePost}
                            className="bg-app-primary-btn text-app-text-primary py-2 px-4 rounded hover:bg-app-btn-hover transition duration-300"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostContainer
