import React from 'react';
import './home.scss';

class Home extends React.Component{

    render() {

        return (
            <div className="home">

                <span>홈페이지를</span>
                <span>업데이트중입니다.</span>

                <span style={{margin: '40px'}}>HOME</span>
            </div>
        );
    }

}



export default Home;

