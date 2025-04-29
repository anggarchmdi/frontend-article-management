export default function Login() {
    return(
        <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
            {/* form login */}
            <div className="flex bg-white rounded-xl flex-col w-[343px] h-[344px] lg:w-[400px] lg:h-[375px] items-center py-8">
                {/* logo */}
                <div className="flex justify-center lg:mb-4">
                    <h1 className="font-bold text-xl text-blue-950">Loremipsum.</h1>
                </div>
                {/* form */}
                <div className="p-4 lg:p-0 w-[343px] h-[344px] lg:w-[368px] lg:h-[140px] space-y-4">
                    {/* username */}
                    <div className="flex flex-col">
                    <label htmlFor="username" className="font-semibold">Username</label>
                    <input type="text" className="p-2.5 rounded-md border-2" placeholder="Input username"  />
                    </div>
                    {/* password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input className="p-2.5 rounded-md border-2" type="password" placeholder="Input password" />
                    </div>
                </div>
                <div className="lg:mt-10 w-[323px] lg:w-[368px] ">
                <button className="py-2 bg-[#2563EB] w-full font-semibold text-white rounded-lg transition-all transform hover:scale-95 duration-300">Login</button>
                </div>
                <div className="flex justify-center lg:mt-4 mt-2">
                <p className="text-gray-500">Don't have an acccount?</p>
                <a href="/auth/register" className="text-blue-500 ml-1 underline font-semibold">Register</a>
                </div>
            </div>
        </div>
    )
}