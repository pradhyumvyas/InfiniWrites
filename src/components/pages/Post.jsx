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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={img}
                        alt={post.title}
                        className="rounded-xl h-[300px] w-100%"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
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
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold dark:text-white">{post.title}</h1>
                </div>
                <div className="browser-css dark:text-slate-400">
                    {parse(post.content)}
                    </div>
            </Container>
            <div class="group flex items-center">
              <img class="shrink-0 h-12 w-12 rounded-full" src="..." alt="" />
              <div class="ltr:ml-3 rtl:mr-3">
                <p class="text-sm font-medium text-slate-300 group-hover:text-white">{post.createdBy}</p>
                <p class="text-sm font-medium text-slate-500 group-hover:text-slate-300">test@test.com</p>
              </div>
            </div>
        </div>
    ) : null;
}


