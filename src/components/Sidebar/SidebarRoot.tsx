export const SidebarRoot = () => {
    return (
        <div className="w-96 h-full bg-neutral-100 p-3">
            <div className="flex justify-between">
                <img src={"/logo.png"} alt="logo" className="w-20"/>
                <span className="text-3xl font-bold pt-4">|</span>
                <span className="text-3xl font-bold pt-5">OBS CONFIG</span>
            </div>
        </div>
    )
}