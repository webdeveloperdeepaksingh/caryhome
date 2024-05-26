"use client";

const FormWrap = ({children} : {children : React.ReactNode}) => {
    
    return ( 
        <div className="min-h-fit h-full flex items-center justify-center py-10">
            <div className="max-w-[450px] w-full flex flex-col gap-4 shadow-xl shadow-slate-200 rounded-md p-6">
                {children}
            </div>
        </div>
     );
}
 
export default FormWrap;