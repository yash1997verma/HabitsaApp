import { useEffect } from "react";

export const Button = ({bgColor, bgHover, onButtonClick, icon, text})=>{
    //default colors will be in play when no prop colors are provided
    const defaultBgColor = 'bg-white'; 
    const defaultHoverColor = 'hover:bg-slate-100'

    //if prop colors are provided they will be given priority
    const bgColorClass = bgColor ? `bg-[${bgColor}]` : defaultBgColor;
    const hoverColorClass = bgHover ? `hover:bg-[#${bgHover}]`: defaultHoverColor;


    //handle click on button
    const handleClick = ()=>{
       {onButtonClick  && onButtonClick();}
    }
    

    return(
        <button onClick={handleClick} className={`flex text-sm p-3  rounded-3xl shadow-lg shadow-slate-200 font-semibold h-fit w-fit ${bgColorClass} ${hoverColorClass}`}>
            {icon}
            {text}
        </button>
    );
}