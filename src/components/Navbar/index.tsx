import { useState } from "react";
import { Link } from "react-router-dom";
import JigsawModal from "../JigsawModal";

export default function Navbar () {

    const [display, setDisplay] = useState<boolean>(false)

    return <div className="flex items-center cursor-pointer">
        <Link to="/">市場</Link>
        <div className="pl-[10px]" onClick={() => setDisplay(true)}>登入</div>
        <JigsawModal 
            display={display}
            onSuccess={() => setDisplay(false)}
            onClose={() => setDisplay(false)}
        />
    </div>
}