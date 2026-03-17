import React from 'react';

const Loading: React.FC = () => {
    return (
        <section className="flex items-center justify-center min-h-[200px] h-full w-full gap-2">
            <div className="h-[15px] w-[15px] rounded-full bg-[#804384] animate-pulse-custom" style={{ animationDelay: '-0.3s' }}></div>
            <div className="h-[15px] w-[15px] rounded-full bg-[#804384] animate-pulse-custom" style={{ animationDelay: '-0.15s' }}></div>
            <div className="h-[15px] w-[15px] rounded-full bg-[#804384] animate-pulse-custom" style={{ animationDelay: '0s' }}></div>
        </section>
    );
};

export default Loading;