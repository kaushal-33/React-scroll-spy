import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Element } from 'react-scroll';
import remarkGfm from 'remark-gfm';

const Main = forwardRef(({ data }, ref) => {
    const { sections } = data;

    return (
        <main
            className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar bg-white"
            id="main-content-area"
            ref={ref}
        >
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b-2 pb-4">
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">{data.report_name}</h1>
                    <div className="prose prose-slate max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {data.report_text}
                        </ReactMarkdown>
                    </div>
                </header>

                {sections?.map((obj) => (
                    <section key={obj.id} className="mb-12 section-block">
                        <h2 className='text-2xl font-semibold my-4 text-blue-800 border-l-4 border-blue-600 pl-4'>
                            {obj.title}
                        </h2>
                        {obj.description && <p className='mb-5 text-gray-500 italic'>{obj.description}</p>}

                        <div className="prose prose-slate max-w-none mb-6">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {obj.section_text}
                            </ReactMarkdown>
                        </div>

                        <div className="space-y-8">
                            {obj?.questions.map((ques) => (
                                <Element
                                    name={ques.question_id}
                                    key={ques.question_id}
                                    className="pb-6 border-b border-gray-100 last:border-0 question-block"
                                >
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                                        {ques.question_text}
                                    </h3>

                                    <div className="text-gray-600 leading-relaxed markdown-container">
                                        {ques.answer_text ? (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {ques.answer_text}
                                            </ReactMarkdown>
                                        ) : (
                                            <span className="italic text-gray-400">No data available...</span>
                                        )}
                                    </div>
                                </Element>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
});

export default Main;