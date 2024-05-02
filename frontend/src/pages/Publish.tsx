import { useState } from 'react';
import { Appbar } from '../components/Misc/Appbar';
import { CreateBlogInput } from '@adi_solanki21/medium-common-module';
import axios from 'axios';
import { BACKEND_URL_DEV } from '../utils/config';
import { useNavigate } from 'react-router-dom';

export const Publish = () => {
    const [postInputs, setPostInputs] = useState<CreateBlogInput>({
        title: "",
        content: "",
    });
    const navigate = useNavigate();

    const publishBlog = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${BACKEND_URL_DEV}/api/v1/blog`, {
                title: postInputs.title,
                content: postInputs.content,
            }, {
                headers: {
                    Authorization: `${token}`
                }
            });
            if(response.status === 200 && response.data){
                console.log(response.data);
                navigate('/blog/'+response.data.id);
            } else {
                console.error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    console.log(postInputs);
    publishBlog();
  };

  return (
    <div>
        <Appbar/>
        <div className="flex justify-center w-full mx-auto p-8">
            <form onSubmit={handleSubmit} className="max-w-screen-lg w-full">
                <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder={"your title here"}
                    onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            title: e.target.value,
                        });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                    <textarea
                        id="content"
                        rows={8}
                        placeholder={"your content here"}
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                content: e.target.value,
                            });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <button 
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Publish
                </button>
            </form>
        </div>
    </div>
  );
};
