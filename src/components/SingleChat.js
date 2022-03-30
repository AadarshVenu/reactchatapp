import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import * as VscIcons from "react-icons/vsc";

function SingleChat(props) {
    const { dataHandler,commonProps:{ mockData, getTimeFromDate, avatar}} = props;
    const { pathname } = useLocation();
    const orderId = Number(pathname.slice(1));
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        const mess = e.target[0].value;
        if (mess.length > 0) {
            dataPoster(mess);
        }
        e.target[0].value = null;
    };

		const chatUrl = (id) => (`http://localhost:3000/mess/${id}`);
		const singleUserData =mockData && mockData.filter((item) => item.id === orderId)

		const dataPoster = async (message) => {
			const res = await axios.put(chatUrl(singleUserData[0].id),{
				"name":singleUserData[0].name,
				"id":singleUserData[0].id,
				"messages": [...singleUserData[0].messages, {
					"msg": message,
					"time": Date.now(),
					"role": "sender"
				}]
			});
			dataHandler(res.data);
	};

    const routeHandler = (item) => {
        navigate(`/home`);
    };
	

		const MsgclassName=(role)=>{
			if(role === "sender"){
				return "message other-message float-right background-color-sender";
			}
			return "message other-message float-left background-color-receiver";
		} 
		const dateDisplay = () => {
			const date = new Date();
			return date.getDate()  + "." + (date.getMonth() + 1) + "." + date.getFullYear();
		}


    return (
        <div className="single-chat-wrapper">
            {singleUserData &&
                singleUserData.map((item, index) => {
                    return (
                        <div key={index} className="chat-wrapper">
                            <div className="chat-header">
                                <div className="user-head">
                                    <div
                                        onClick={routeHandler}
                                        className="chat-arrow"
                                    >
                                        <AiIcons.AiOutlineArrowLeft size={20} />
                                    </div>
                                    <div className="chat-item-image">
																		<img src={avatar} alt="avatar" style={{width:35}} />
                                    </div>
                                    <h2>{item.name}</h2>
                                </div>
                                <BiIcons.BiSearch size={25} />
                            </div>
                            <div className="user-chat-wrapper">
                                <div className="message-data align-center">
                                    <span className="message-data-time">
																		{dateDisplay()}
                                    </span>{" "}
                                </div>
                                {item.messages.map((message, index) => {
                                    return (
                                        <div
                                            className={MsgclassName(message.role)}
                                            key={index}
                                        >	{message.imgUrl && <img width={200} src={message.imgUrl} alt="img" />}
                                            {message.msg}
																						<div className="chat-item-time float-right">
																						{getTimeFromDate(message.time)}
																						</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <div className="edit-icons-wrapper">
                                    <BsIcons.BsTypeBold />
                                    <BiIcons.BiItalic />
                                    <BiIcons.BiUnderline />
                                    <MdIcons.MdFormatListBulleted />
                                    <AiIcons.AiOutlineAlignLeft />
                                    <GrIcons.GrAttachment />
                                </div>
                                <form
                                    onSubmit={submitHandler}
                                    className="chat-message"
                                >
																	<VscIcons.VscSmiley/>
                                    <input
                                        className="chat-message-input"
                                        name="message-to-send"
                                        id="message-to-send"
                                        placeholder="Type your message...."
                                        // rows="1"
                                    ></input>
                                    <button>
                                        <MdIcons.MdSend
                                            color="purple"
                                            size={20}
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default SingleChat;
