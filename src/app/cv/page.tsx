import Header from "~/app/_components/header";

export default function CVPage() {
    return (
        <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
            <Header />

            <div className="flex flex-1 justify-center items-center min-h-0 overflow-y-auto py-8">
                <div className="w-full max-w-4xl px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center">Curriculum Vitae</h1>

                    <div className="bg-black bg-opacity-30 p-8 rounded-lg">
                        <p className="text-center text-xl mb-8">CV content coming soon...</p>

                        {/* Placeholder for CV content */}
                        <div className="flex justify-center">
                            <div className="w-32 h-32 border-4 border-dashed border-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-gray-400">CV</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 