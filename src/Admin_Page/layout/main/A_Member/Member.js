import React from "react";
import './Member.scss';
import {BsChevronDown} from "react-icons/bs";
import {BsChevronUp} from "react-icons/bs";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import App from "../../../App";

class Member extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'new_User': [],
            'new_hidden': [],
            'old_hidden': [],
            'old_User': [],
            isLoading: false,
            'level': ["0", "1", "2", "3", "4", "5"],
            'select_Item':[],
            open: false,
        }
        this.onClickHiddenFunction = this.onClickHiddenFunction.bind(this);
        this.onClickCopyText = this.onClickCopyText.bind(this);
        this.onClickPlusBTN = this.onClickPlusBTN.bind(this);
        this.onClickMinusBTN = this.onClickMinusBTN.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOkay = this.handleOkay.bind(this);
        this.updateMAXIMUM = this.updateMAXIMUM.bind(this);
        this.updateLEVEL = this.updateLEVEL.bind(this);
        this.deleteUSER = this.deleteUSER.bind(this);
    }

    componentDidMount() {

        fetch(App.Server + '/data/user_php/getUSER.php')
            .then(response => response.json())
            .then(response => this.setState({'new_User': response.new_User, 'old_User': response.old_User}))
            .then(() => {
                if (this.state.new_hidden.length !== 0) {
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.new_hidden = [];
                }

                for (let i = 0; i < this.state.new_User.length; i++)
                    this.state.new_hidden.push(false);

                if (this.state.old_hidden.length !== 0) {
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.old_hidden = [];
                }

                for (let i = 0; i < this.state.old_User.length; i++)
                    this.state.old_hidden.push(false);

            })
            .then(() => this.setState({isLoading: true}))
            .catch(error => {
                console.log(error)
            })
    }


    handleClickOpen(i, index) {
        if(i)
        {
            this.setState({ select_Item: this.state.new_User[index] , open: true });
        }
        else
        {
            this.setState({ select_Item: this.state.old_User[index] , open: true });
        }

    };

    handleClose() {
        this.setState({ select_Item: [] ,open: false });
    };

    handleOkay() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: '_ID='+this.state.select_Item._ID+'&LEVEL='+this.state.select_Item.LEVEL
        };


        fetch(App.Server + '/data/user_php/setUSER.php', requestOptions)
            .then(response => response.text())
            .then(text => {
                if(text === "true")
                {
                    this.setState({ select_Item: [], open: false});
                    window.location.reload(false);
                }
                else if(text === "false")
                {
                    alert("다시 시도해 주세요.")
                }

            })
            .catch(error => {
                console.log(error)
            })
    };

    updateMAXIMUM(index) {
        let maximum = this.state.old_User;

        if(maximum[index].MAXIMUM === "false")
            maximum[index].MAXIMUM = "true";
        else
            maximum[index].MAXIMUM = "false";

        const requestMAXIMUM = {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: '_ID='+maximum[index]._ID+'&MAXIMUM='+maximum[index].MAXIMUM
        };


        fetch(App.Server + '/data/user_php/setMAXIMUM.php', requestMAXIMUM)
            .then(response => response.text())
            .then(text => {
                if(text === "true")
                {
                    this.setState({ old_User: maximum});
                    alert("수정 완료")
                }
                else if(text === "false")
                {
                    alert("다시 시도해 주세요.")
                }

            })
            .catch(error => {
                console.log(error)
            })
    };

    updateLEVEL(index) {
        let level = this.state.old_User;

        const requestLEVEL = {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: '_ID=' + level[index]._ID+'&LEVEL='+ level[index].LEVEL
        };

        fetch(App.Server + '/data/user_php/setLEVEL.php', requestLEVEL)
            .then(response => response.text())
            .then(text => {
                if(text === "true")
                {
                    this.setState({ old_User: level});
                    alert("수정 완료")
                }
                else if(text === "false")
                {
                    alert("다시 시도해 주세요.")
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    deleteUSER(index) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: '_ID='+this.state.select_Item._ID
        };

        fetch(App.Server + '/data/user_php/deleteUSER.php', requestOptions)
            .then(response => response.text())
            .then(text => {
                if(text === "true")
                {
                    window.location.reload(false);
                }
                else if(text === "false")
                {
                    alert("다시 시도해 주세요.")
                }

            })
            .catch(error => {
                console.log(error)
            })
    };


    onClickHiddenFunction(index, i)
    {
        if(i)
        {
            let hidden = this.state.new_hidden;
            hidden[index] = hidden[index] !== true;
            this.setState({'new_hidden': hidden})
        }
        else
        {
            let hidden = this.state.old_hidden;
            hidden[index] = hidden[index] !== true;
            this.setState({'old_hidden': hidden})
        }

    }

    onClickCopyText(string)
    {
        var textField = document.createElement('textarea')
        textField.innerText = string
        document.body.appendChild(textField)
        textField.remove()
        document.execCommand("copy");
        alert(string + " 저장되었습니다.");
    }

    onClickPlusBTN(index, i)
    {
        if(i)
        {
            let item = this.state.new_User;
            item[index].LEVEL++;
            this.setState({'new_User': item})
        }
        else
        {
            let item = this.state.old_User;
            item[index].LEVEL++;
            this.setState({'old_User': item})
            this.updateLEVEL(index);
        }
    }

    onClickMinusBTN(index, i)
    {
        if(i)
        {
            let item = this.state.new_User;
            if(item[index].LEVEL <= 0)
                return;
            item[index].LEVEL--;
            this.setState({'new_User': item})
        }
        else
        {
            let item = this.state.old_User;
            if(item[index].LEVEL <= 0)
                return;
            item[index].LEVEL--;
            this.setState({'old_User': item})
            this.updateLEVEL(index);
        }
    }

    render() {
        return(
            <div className='member'>
                <div className='memberHeader'>
                    {/*<div>*/}
                    {/*    <input type='text' value='회원 검색' />*/}
                    {/*    <button onClick=''>검색</button>*/}
                    {/*</div>*/}
                </div>
                {this.state.isLoading === true ?
                (
                    <div className='memberInside'>
                        <h1>신규회원</h1>
                        {
                            this.state.new_User.map((item, index) => {
                                return(
                                    <div key={index}>
                                        <div className='memberCard' onClick={()=>this.onClickHiddenFunction(index, true)}>
                                            <h1>{item.COMPANY}</h1>
                                            <h2>담당자 : {item.MANGER}</h2>
                                            <h2>연락처 : {item.PHONE}</h2>
                                            {this.state.new_hidden[index] === true ? (
                                                <div className='icon'><BsChevronUp size={28} style={{fill: 'white'}}/></div>
                                            ) : (
                                                <div className='icon'><BsChevronDown size={28} style={{fill: 'white'}}/></div>
                                            )}

                                        </div>

                                        {this.state.new_hidden[index] === true ? (
                                            <div className='memberNewOnClick'>

                                                <div className='memberNewLeft'>
                                                    <div id='div_1'>
                                                        <h1>ABN :</h1>
                                                        <h1>Email :</h1>
                                                        <h1>Company :</h1>
                                                        <h1>Delivey :</h1>
                                                        <h1>Registered :</h1>
                                                    </div>

                                                    <div id='div_2'>
                                                        <h1 onClick={()=>this.onClickCopyText(item.ABN)}>{item.ABN}</h1>
                                                        <h1 onClick={()=>this.onClickCopyText(item.E_ADDRESS)}>{item.E_ADDRESS}</h1>
                                                        <h1 onClick={()=>this.onClickCopyText(item.C_ADDRESS)}>{item.C_ADDRESS}</h1>
                                                        <h1 onClick={()=>this.onClickCopyText(item.D_ADDRESS)}>{item.D_ADDRESS}</h1>
                                                        <h1>{item.DATE}</h1>
                                                    </div>
                                                </div>

                                                <div className='memberNewRight'>
                                                    <div id='div_1'>
                                                        <h1>등급 : {item.LEVEL}</h1>
                                                        <button onClick={()=>this.onClickPlusBTN(index, true)}>+</button>
                                                        <button onClick={()=>this.onClickMinusBTN(index, true)}>-</button>
                                                    </div>

                                                    <div id='div_2'>
                                                        <button onClick={()=>this.handleClickOpen(true,index)}>가입 승인</button>
                                                        <Dialog
                                                            open={this.state.open}
                                                            onClose={()=>this.handleClose()}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title" >{"신규회원 등록을 하시겠습니까?"}</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    회사명&nbsp; : &nbsp;{this.state.select_Item.COMPANY}
                                                                    <br/>
                                                                    담당자&nbsp; : &nbsp;{this.state.select_Item.MANGER}
                                                                    <br/>
                                                                    연락처&nbsp; : &nbsp;{this.state.select_Item.PHONE}
                                                                    <br/>
                                                                    등급수&nbsp; : &nbsp;{this.state.select_Item.LEVEL}
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={()=>this.handleClose()} color="primary">
                                                                    취소
                                                                </Button>
                                                                <Button onClick={()=>this.handleOkay()} color="primary" autoFocus>
                                                                    승인
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </div>
                                                </div>


                                            </div>
                                        ) : (
                                            <div> </div>
                                        )}
                                    </div>
                                );
                            })
                        }


                        <h1>기존회원</h1>
                        {
                            this.state.old_User.map((item, index) => {
                                return(
                                    <div key={index}>
                                        <div className='memberCard' onClick={()=>this.onClickHiddenFunction(index, false)}>
                                            <h1>{item.COMPANY}</h1>
                                            <h2>담당자 : {item.MANGER}</h2>
                                            <h2>연락처 : {item.PHONE}</h2>
                                            {this.state.old_hidden[index] === true ? (
                                                <div className='icon'><BsChevronUp size={28} style={{fill: 'white'}}/></div>
                                            ) : (
                                                <div className='icon'><BsChevronDown size={28} style={{fill: 'white'}}/></div>
                                            )}

                                        </div>

                                        {this.state.old_hidden[index] === true ? (
                                            <div className='memberNewOnClick'>

                                                <div className='memberNewLeft'>
                                                    <div id='div_1'>
                                                        <h1>ABN :</h1>
                                                        <h1>Email :</h1>
                                                        <h1>Company :</h1>
                                                        <h1>Delivey :</h1>
                                                        <h1>Registered :</h1>
                                                    </div>

                                                    <div id='div_2'>
                                                        <h1 onClick={()=>this.onClickCopyText(item.ABN)}>{item.ABN}</h1>
                                                        <h1 onClick={()=>this.onClickCopyText(item.E_ADDRESS)}>{item.E_ADDRESS}</h1>
                                                        <h1 onClick={()=>this.onClickCopyText(item.C_ADDRESS)}>{item.C_ADDRESS}</h1>
                                                        <h1 onClick={()=>this.onClickCopyText(item.D_ADDRESS)}>{item.D_ADDRESS}</h1>
                                                        <h1>{item.DATE}</h1>
                                                    </div>
                                                </div>

                                                <div className='memberOldRight'>
                                                    <div id='div_1'>
                                                        <h1>등급 : {item.LEVEL}</h1>
                                                        <button onClick={()=>this.onClickPlusBTN(index, false)}>+</button>
                                                        <button onClick={()=>this.onClickMinusBTN(index, false)}>-</button>
                                                    </div>

                                                    <div id='div_2'>
                                                        <button onClick={()=>this.handleClickOpen(false,index)}>회원 삭제</button>
                                                        <Dialog
                                                            open={this.state.open}
                                                            onClose={()=>this.handleClose()}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title" >{"기존 회원을 삭제 하시겠습니까?"}</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    회사명&nbsp; : &nbsp;{this.state.select_Item.COMPANY}
                                                                    <br/>
                                                                    담당자&nbsp; : &nbsp;{this.state.select_Item.MANGER}
                                                                    <br/>
                                                                    연락처&nbsp; : &nbsp;{this.state.select_Item.PHONE}
                                                                    <br/>
                                                                    등급수&nbsp; : &nbsp;{this.state.select_Item.LEVEL}
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={()=>this.handleClose()} color="primary">
                                                                    취소
                                                                </Button>
                                                                <Button onClick={()=>this.deleteUSER(index)} color="primary" autoFocus>
                                                                    삭제
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>

                                                        <button onClick={()=>this.updateMAXIMUM(index)}>{
                                                            this.state.old_User[index].MAXIMUM === "false" ? ("거래 중지 상태") : ("거래 가능 상태")
                                                        }</button>
                                                    </div>
                                                </div>


                                            </div>
                                        ) : (
                                            <div> </div>
                                        )}
                                    </div>
                                );
                            })
                        }
                    </div>
                ) : (
                    <div>

                    </div>
                    )}
            </div>
        );
    }




}

export default Member;

