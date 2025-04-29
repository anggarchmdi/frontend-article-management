export default function register() {
    return(
        <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
            {/* form login */}
            <div className="flex bg-white rounded-xl flex-col w-[343px] h-[420px] lg:w-[400px] lg:h-[452px] items-center py-4 lg:py-8">
                {/* logo */}
                <div className="flex justify-center mb-4">
                    {/* <img src="" alt="" /> */}
                    <h1 className="font-bold text-xl">Loremipsum.</h1>
                </div>
                {/* form */}
                <div className="p-4 lg:p-0 w-[343px] lg:w-[368px] h-[216px] lg:h-[216px] space-y-4">
                    {/* username */}
                    <div className="flex flex-col">
                    <label htmlFor="username" className="font-semibold">Username</label>
                    <input type="text" className="p-2.5 rounded-md border-2" placeholder="Input username" />
                    </div>
                    {/* password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input className="p-2.5 rounded-md border-2" type="password" placeholder="Input password" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="role" className="font-semibold">Role</label>
                        <select
                            id="role"
                            className="p-2.5 rounded-md border-2"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="mt-16 lg:mt-12 w-[323px] lg:w-[368px]">
                <button className="py-2 bg-[#2563EB] w-full font-semibold text-white rounded-lg transition-all transform hover:scale-95 duration-300">Login</button>
                </div>
                <div className="flex justify-center mt-2 lg:mt-4">
                <p className="text-gray-500">Already have an account?</p>
                <a href="/auth/login" className="text-blue-600 underline ml-1">Login</a>
                </div>
            </div>
        </div>
    )
}