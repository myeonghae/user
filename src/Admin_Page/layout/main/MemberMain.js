import React from 'react';
import './App.scss';
import MemberLeftHeader from "../header/MemberLeftHeader";
import Member from "./A_Member/Member";

class MemberMain extends React.Component{

    render() {
        return (
            <div className='outerWrep'>
                <div className='App'>
                    <MemberLeftHeader/>

                    <div className='main'>
                        <Member/>
                    </div>
                </div>

                <div className='bottomLayout'>

                </div>
            </div>
        );
    }

}

export default MemberMain;

