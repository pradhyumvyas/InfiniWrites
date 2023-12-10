import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appWrite/config.js";
import { Button, Container, isShowLoader, isHideLoader } from "../index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [img, setImg] = useState(null);
    const userData = useSelector((state) => state.auth.userData);

    const [isAuthor, setIsAuthor] = useState(null);


    useEffect(() => {
        isShowLoader();
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                    appwriteService.getFilePreview(post.image)
                    .then((res) => {
                        setImg(res);
                        setIsAuthor(post && userData ? post.userId === userData.data?.$id : false)
                    })
                }
                else navigate("/");
            }).finally(() => {
                isHideLoader();
            });
        } else {
            navigate("/");
            isHideLoader();
        }

    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img
                        src={img}
                        alt={post.title}
                        className="rounded-xl h-[300px] w-100%"
                    />
                </div>
                <div className="text-left mb-15">
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold dark:text-white">{post.title}</h1>
                </div>
                <div className="browser-css dark:text-slate-400">
                    {parse(post.content)}
                </div>
                </div>
            </Container>
            <div class="group flex items-center mt-[10vw]">
              {/* <img class="shrink-0 h-12 w-12 rounded-full" src="..." alt="" /> */}
              <div class="ltr:ml-3 rtl:mr-3">
                <p class="text-sm font-medium text-slate-300 group-hover:text-white">Posted By:- </p>
                <p class="text-sm font-medium text-slate-500 group-hover:text-slate-300">{post.createdBy}</p>
                <p class="text-sm font-medium text-slate-500 group-hover:text-slate-300">test@test.com</p>
              </div>
            </div>
            <div className="group flex items-right justify-end mt-[1vw]">
            {isAuthor && (
                        <div className="">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
            </div>

            <div class="w-full md:w-1/3 mt-10">
              <label
                class="flex text-xl font-medium text-slate-300 group-hover:text-white"
                for="name"
              >
                Comments
              </label>
                  <div className="flex">
                  <input
                    class="h-10 w-full rounded-md border text-cyan-700 border-white/30 bg-transparent px-3 py-2 text-sm placeholder:text-white-600 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 "
                    type="text"
                    placeholder="Add Comment"
                    id="name"
                    />
                    <button
                      type="button"
                      class="rounded-md hover:bg-blue-200 px-3 py-2 ml-2 text-sm font-semibold text-cyan-700 shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                      Add
                    </button>
                </div>  
            </div>
        </div>
    ) : null;
}