import { useState } from "react";
import { Link } from "react-scroll";
import { Accordion, Loader } from "rsuite";
import 'rsuite/dist/rsuite.css';

const Sidebar = ({ data, onDownload }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const handleDownloadClick = async () => {
        setIsDownloading(true);
        try {
            await onDownload();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <aside className="w-80 border-r border-gray-200 py-6 sticky top-0 h-screen overflow-y-auto hidden md:block bg-white">
            <div className="px-6 mb-6 flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Contents</h3>
                <button
                    onClick={handleDownloadClick}
                    disabled={isDownloading}
                    className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition-all
                        ${isDownloading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'}`}
                >
                    {isDownloading ? (
                        <>
                            <Loader size="xs" content="Preparing..." />
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </>
                    )}
                </button>
            </div>

            <nav className="px-2">
                <Accordion bordered={false} className="bg-transparent">
                    {data?.map((obj, idx) => (
                        <Accordion.Panel
                            key={obj.id}
                            header={
                                <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                                    {obj.title}
                                </span>
                            }
                            eventKey={idx + 1}
                        >
                            <div className="flex flex-col gap-1 mt-2 ml-2 border-l border-gray-100">
                                {obj.questions && obj.questions.map((ques, qIdx) => (
                                    <Link
                                        key={ques.question_id}
                                        to={ques.question_id}
                                        spy={true}
                                        offset={-70}
                                        smooth={true}
                                        duration={500}
                                        containerId="main-content-area"
                                        activeClass="active-link"
                                        className="group flex items-start gap-3 py-2 px-4 text-sm text-gray-500 hover:text-blue-600 transition-all duration-200 cursor-pointer no-underline hover:no-underline"
                                    >
                                        <span className="text-xs font-medium text-gray-400 group-hover:text-blue-400 pt-0.5">
                                            {qIdx + 1}.
                                        </span>
                                        <span className="leading-relaxed">
                                            {ques.question_text}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </Accordion.Panel>
                    ))}
                </Accordion>
            </nav>
        </aside>
    );
};

export default Sidebar;