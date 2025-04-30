export default function Footer() {
    return(
    <div className="w-full flex flex-wrap justify-center items-center bg-[#2563EBDB]/86 text-white bottom-0 relative py-2 lg:py-8 gap-x-4">
        {/* logo */}
        <div className="grid text-center lg:grid-cols-2 gap-4 lg:-translate-x-18">
            <div className="flex lg:justify-end justify-center items-center">
        <h1 className="font-bold text-[1.3rem]">Loremipsum</h1>
            </div>
            <div className="flex lg:justify-start justify-center items-center">
        <p className="text-[1rem]">©2025 Blog genzet. All rights reserved.</p>
            </div>
        </div>
    </div>    
    
    )
}