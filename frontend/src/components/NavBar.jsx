import ProfileSettingDropDown from "./ProfileSettingDropDown";

export default function NavBar({ userName }) {
    return (
        <>
            <div className="flex w-screen justify-between items-center p-3 md:px-10 bg-gray-300">
                <div className="font-bold text-2xl flex">
                    PKpe
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>                

                </div>
                <div className="flex font-semibold items-center text-xl">
                    <div className="italic mr-3">
                        Hello, {userName}
                    </div>

                    < ProfileSettingDropDown userName={userName} />
                </div>
            </div>

        </>
    )
} 