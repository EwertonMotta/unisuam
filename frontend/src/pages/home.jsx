import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import ArrowUpRightFromSquare from "../components/icons/fontawesome/arrow-up-right-from-square";
import Blog from "../components/icons/fontawesome/blog";
import Download from "../components/icons/fontawesome/download";
import FileLines from "../components/icons/fontawesome/file-lines";
import Github from "../components/icons/fontawesome/github";
import ListOfFollowing from "../components/ListOfFollowing";
import MapLocationDot from "../components/icons/fontawesome/map-location-dot";
import RegularHeart from "../components/icons/fontawesome/regular-heart";
import SolidHeart from "../components/icons/fontawesome/solid-heart";
import Suitcase from "../components/icons/fontawesome/suitcase";

import Bio from "../components/modal/Bio";

function Home() {
    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [openBio, setOpenBio] = useState(false);

    useEffect(() => {
        if (username) {
            getUser();
        }
    }, []);

    async function getUser() {
        const response = await api.get(`/user/${username}`);
        setUser(response.data);
    }

    function openBioModal() {
        setOpenBio(true);
    }

    function closeBioModal() {
        setOpenBio(false);
    }

    return (
        <>
            <div className="bg-cyan-950 min-h-screen text-cyan-50">
                <div className="container mx-auto border-r border-l border-cyan-900 min-h-screen">
                    <header className="text-center py-5 border-b border-cyan-500 shadow-sm">
                        <h1 className="text-5xl font-bold">Github Users - UNISUAM</h1>
                    </header>

                    {user ? (
                        <main className="grid lg:grid-cols-4 gap-4 grid-cols-1">
                            <div className="col-span-1 p-5 flex flex-col items-center">
                                <div className="rounded-full max-w-60 mx-auto bg-cyan-500 p-1 mb-3">
                                    <img src={user?.avatar} alt="" className="rounded-full" />
                                </div>
                                <h3 className="text-3xl font-bold">{user?.name}</h3>
                                <p className="text-cyan-300">@{user?.username}</p>
                                <div>
                                    {user?.company ? (
                                        <p className="text-cyan-300 flex items-center space-x-2">
                                            <Suitcase className="w-4 h-3 fill-cyan-200" />
                                            <span>{user?.company}</span>
                                        </p>
                                    ) : null}
                                    {user?.location ? (
                                        <p className="text-cyan-300 flex items-center space-x-2">
                                            <MapLocationDot className="w-4 h-3 fill-cyan-200" />
                                            <span>{user?.location}</span>
                                        </p>
                                    ) : null}
                                    <div className="text-cyan-300 space-x-5 flex justify-between">
                                        <div className="flex items-center space-x-2">
                                            <FileLines className="w-4 h-3 fill-cyan-200" />
                                            <span>Bio</span>
                                        </div>
                                        <button type="button" onClick={openBioModal}>
                                            <ArrowUpRightFromSquare className="w-4 h-3 fill-cyan-200" />
                                        </button>
                                    </div>
                                    <a
                                        href={user?.github_link}
                                        className="text-cyan-300 hover:text-cyan-400 transition duration-300 ease-in hover:underline flex space-x-2 items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Github className="w-4 h-3 fill-cyan-200" />
                                            <span>Github</span>
                                        </div>
                                        <ArrowUpRightFromSquare className="w-4 h-3 fill-cyan-200" />
                                    </a>
                                    {user?.blog_link ? (
                                        <a
                                            href={user?.blog_link}
                                            className="text-cyan-300 hover:text-cyan-400 transition duration-300 ease-in hover:underline flex space-x-2 items-center justify-between"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Blog className="w-4 h-3 fill-cyan-200" />
                                                <span>Blog</span>
                                            </div>
                                            <ArrowUpRightFromSquare className="w-4 h-3 fill-cyan-200" />
                                        </a>
                                    ) : null}
                                    <p className="text-cyan-300 flex items-center space-x-2 justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Download className="w-4 h-3 fill-cyan-200" />
                                            <span>Public Repos:</span>
                                        </div>
                                        <span>{user?.public_repositories}</span>
                                    </p>
                                    <p className="text-cyan-300 flex items-center space-x-2 justify-between">
                                        <div className="flex items-center space-x-2">
                                            <RegularHeart className="w-4 h-3 fill-red-400" />
                                            <span>Followers:</span>
                                        </div>
                                        <span>{user?.followers}</span>
                                    </p>
                                    <p className="text-cyan-300 flex items-center space-x-2 justify-between">
                                        <div className="flex items-center space-x-2">
                                            <SolidHeart className="w-4 h-3 fill-red-400" />
                                            <span>Following:</span>
                                        </div>
                                        <span>{user?.following}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <ListOfFollowing username={username} />
                            </div>
                        </main>
                    ) : (
                        <p className="text-center text-2xl font-bold mt-5">
                            {username
                                ? "User not found!"
                                : "Write some Github username in the navigation bar to see the profile."
                            }
                        </p>
                    )}
                </div>
                {openBio ? <Bio bio={user.bio} closeModal={closeBioModal} /> : null}
            </div>
        </>
    );
}

export default Home;
