import React from "react";
import './LeftHeader.scss'
import logo from '../../image/logo.png';


class MemberHeader extends React.Component{
    render() {
        return(
          <div className='LeftHeader'>
              <img className='logo' src={logo} alt="Logo"/>;

              <ul>
                  <li className='active'>회원정보</li>
                  <li>회원정보</li>
                  <li>회원정보</li>
              </ul>
          </div>
        );
    }
}

export default MemberHeader;
