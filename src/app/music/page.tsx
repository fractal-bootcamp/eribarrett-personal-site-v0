import Header from "../_components/header";


export default function MusicPage() {
    return (
        <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
            <Header />

            <div className="flex flex-1 justify-center min-h-0 overflow-auto">
                <div className="flex-1 border-r border-gray-800 relative justify-center flex-center">
                    Music
                </div>
            </div>
        </div>
    )
}