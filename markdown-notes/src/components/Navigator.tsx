import { useState } from "react";
import { SampleFolders as sf, SamplePages as sp } from "../constants/temp";
import { HiLightningBolt } from "react-icons/hi";
import { MdChevronLeft, MdChevronRight, MdSettings, MdAdd } from "react-icons/md";
import React from "react";
import NotebookFinder from "./NotebookFinder";

interface NavigatorProps {
    width: number;
    onWidthChange?: (width: number) => void;
}

const Navigator = ({ width, onWidthChange }: NavigatorProps) => {
    const [folders, setFolders] = useState(sf);
    const [pages, setPages] = useState(sp);
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleToggleCollapse = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        if (onWidthChange) {
            onWidthChange(newCollapsedState ? 60 : width);
        }
    };

    return (
        <div className={`navigator ${isCollapsed ? 'navigator--collapsed' : ''}`} 
             style={{ width: isCollapsed ? '60px' : `${width}px`}}>
            <div className="navigator__header">
                <HiLightningBolt className="navigator__header__icon" onClick={handleToggleCollapse} />
                <h1 className="navigator__header__title">MDNotes</h1>
                <button 
                    className="navigator__collapse-btn" 
                    onClick={handleToggleCollapse}
                    aria-label={isCollapsed ? "Expand navigator" : "Collapse navigator"}>
                    {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
                </button>
            </div>
            <div className="navigator__body">
                <NotebookFinder collapsed={isCollapsed} />
            </div>
            <div className="navigator__footer">
                {!isCollapsed && <span>3 notebooks</span>}
                <div className="navigator__footer__actions">
                    <button aria-label="Add new notebook"><MdAdd /></button>
                    <button aria-label="Settings"><MdSettings /></button>
                </div>
            </div>
        </div>
    )
}

export default Navigator;