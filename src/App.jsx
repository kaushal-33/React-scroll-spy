import { useRef } from "react";
import { reportData } from "..";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import { useReactToPrint } from "react-to-print";

const data = reportData;

const App = () => {
    const contentRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef,
    });

    return (
        <div className="flex w-full mx-auto h-screen bg-white font-sans text-[#1C1C1C]">
            <Sidebar data={data.sections} onDownload={handlePrint} />
            <Main data={data} ref={contentRef} />
        </div>
    );
};

export default App;