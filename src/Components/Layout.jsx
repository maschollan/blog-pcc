import React from 'react';

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <div className="bg-gray-800 font-patrick text-white min-h-(custom-height) overflow-hidden">
                <div className="container mx-auto">
                    {children}
                </div>
            </div>
        </React.Fragment>
    );  
};
export default Layout