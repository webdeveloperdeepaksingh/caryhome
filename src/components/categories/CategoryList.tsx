import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineKeyboard, MdStorefront, MdTv, MdWatch } from "react-icons/md";
import { FaTabletScreenButton } from "react-icons/fa6";
import { GiWashingMachine } from "react-icons/gi";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
 

type CategoryIcons = 
    {
        label: string;
        icon: JSX.Element;
    }[];


export const CategoryList : CategoryIcons = [
    {
        label: 'All Items',
        icon: <MdStorefront size={24}/>
    },
    {
        label: 'Mobiles',
        icon: <AiFillPhone size={24}/>
    },
    {
        label: 'Laptop',
        icon: <AiOutlineLaptop size={24}/>
    },
    {
        label: 'Desktop',
        icon: <AiOutlineDesktop size={24}/>
    },
    {
        label: 'Refrigerator',
        icon: <CgSmartHomeRefrigerator size={24}/>
    },
    {
        label: 'Tablets',
        icon: <FaTabletScreenButton size={24}/>
    },
    {
        label: 'W Machine',
        icon: <GiWashingMachine size={24}/>
    },
    {
        label: 'Telivision',
        icon: <MdTv size={24}/>
    },
    {
        label: 'AC',
        icon: <TbAirConditioningDisabled size={24}/>
    },
    {
        label: 'Accesories',
        icon: <MdOutlineKeyboard size={24}/>
    },
]