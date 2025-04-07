import { useState } from "react";
import { SampleNotebooks as sn, SampleFolders as sf, SamplePages as sp } from "../constants/temp";
import { MdWorkOutline } from "react-icons/md";
import React from "react";

interface NavigatorProps {
    width: number;
}

const Navigator = ({ width }: NavigatorProps) => {
    const [notebooks, setNotebooks] = useState(sn);
    const [folders, setFolders] = useState(sf);
    const [pages, setPages] = useState(sp);
    return (
        <div style={{ width: `${width}px`}}>
            {/* <div className="active-notebook">
                <MdWorkOutline /> Study
            </div> */}
            <div className="notebook-dropdown">
                {notebooks && (notebooks.map(nb => {
                    return <div className="notebook"><MdWorkOutline />{nb}</div>
                }))}
            </div>
            <div>
                {folders && (folders.map(f => {
                    return <div className="folders"><MdWorkOutline />{f}</div>
                }))}
            </div>
            <div>
                {pages && (pages.map(p => {
                    return <div className="pages"><MdWorkOutline />{p}</div>
                }))}
            </div>
        </div>
    )
}

export default Navigator;