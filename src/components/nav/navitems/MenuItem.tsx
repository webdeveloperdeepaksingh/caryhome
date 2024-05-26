"use client";
interface MenuListProps {
    children:React.ReactNode;
    onClick: () => void;
}

const MenuList: React.FC<MenuListProps> = ({children, onClick}) => {

    return (
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition">
            {children}
        </div>
    )
}

export default MenuList;