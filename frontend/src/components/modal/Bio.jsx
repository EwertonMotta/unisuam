import PropTypes from 'prop-types';

function Bio({
    bio,
    closeModal,
}) {
    return (
        <div className="absolute inset-0 bg-cyan-950 bg-opacity-50 w-screen h-screen flex justify-center items-center space-y-3">
            <div className=" relative w-1/4 mx-auto h-auto bg-cyan-900 p-5 text-cyan-50 border border-cyan-950 rounded-md shadow-md space-y-2">
                <header>
                    <h1 className="text-3xl font-bold">Bio</h1>
                    <div className="absolute top-2 right-2">
                        <button
                            type="button" onClick={closeModal}
                            className="cursor-pointer text-cyan-300 p-1 px-2 text-xs rounded-sm border border-cyan-950 hover:border-red-900 transition duration-300 ease-in hover:bg-red-700 hover:text-red-50 hover: font-semibold" aria-label="Close modal">
                            &#10005;
                        </button>
                    </div>
                </header>
                <p className="">
                    {bio ? bio : "No bio"}
                </p>
            </div>
        </div>
    )
}

// Bio.propTypes = {
//     bio: PropTypes.string,
//     closeModal: PropTypes.func
// }

export default Bio
