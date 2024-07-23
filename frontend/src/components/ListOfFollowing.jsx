import { useEffect, useState } from "react"
import PropTypes from 'prop-types';

import api from "../services/api"

import ArrowUpRightFromSquare from "./icons/fontawesome/arrow-up-right-from-square";
import Github from "./icons/fontawesome/github";
import Search from "./icons/fontawesome/search"

function ListOfFollowing({ username }) {
    const [users, setUsers] = useState([])

    function handleSearch(event) {
        getUsers(event.target.value)
    }

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers(search = null) {
        const url = search ?
            `/user/${username}/following?search=${search}` :
            `/user/${username}/following`

        const response = await api.get(url)
        setUsers(response.data.data)
    }

    return (
        <>
            <div className="text-center p-5 flex flex-col items-center">
                <div className="w-4/5 mx-auto">
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-4 h-4 fill-cyan-200" />
                        </div>
                        <input type="search" id="search" placeholder="Digit username" autoComplete="off" onChange={handleSearch}
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>

                {users.length > 0 ? (
                    users.map((user) => {
                        return (
                            <div className="w-full max-w-4/5 mt-5 px-4 py-2 bg-white border border-cyan-200 rounded-lg shadow sm:p-8 dark:bg-cyan-900 dark:border-cyan-700" key={user.id}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-20 h-20 rounded-full" src={user.avatar} alt="Neil image" />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4 text-left space-y-2">
                                        <p className={`text-sm font-semibold text-cyan-900 truncate dark:text-cyan-400 ${user.type === "Organization" ? "text-cyan-950 dark:text-cyan-500" : ""}`}>
                                            {user.type}
                                        </p>
                                        <p className="text-sm font-medium text-cyan-900 truncate dark:text-cyan-50">
                                            @{user.username}
                                        </p>
                                        <p className="text-sm text-cyan-500 truncate dark:text-cyan-400">
                                            <a href={user.github_link} target="_blank" className="text-cyan-300 hover:text-cyan-400 transition duration-300 ease-in">
                                                <Github className="w-6 h-6 fill-cyan-200" />
                                            </a>
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-cyan-900 dark:text-white">
                                        <a href={`/${user.username}`} className="text-cyan-300 hover:text-cyan-400 transition duration-300 ease-in">
                                            <ArrowUpRightFromSquare className="w-6 h-6 fill-cyan-200" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="text-cyan-300 my-5 font-bold">No results found</div>
                )}
            </div>
        </>
    )
}

ListOfFollowing.propTypes = {
    username: PropTypes.string.isRequired
}

export default ListOfFollowing
