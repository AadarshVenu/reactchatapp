import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css";
import * as BiIcons from "react-icons/bi";


function MainScreen(props) {
    const {commonProps: {mockData, getTimeFromDate,avatar} } = props;
    const navigate = useNavigate();

    const routeHandler = (id) => {
        navigate(`/${id}`);
    };

		const sortedData = mockData && mockData.sort((a,b)=>{
			return b.messages.slice(-1)[0].time - a.messages.slice(-1)[0].time;
		});

    return (
        <div className="wrapper">
            <div className="chat-wrapper">
                <div className="chat-main-header">
                    <h2>Chat</h2>
                    <BiIcons.BiSearch size={25} />
                </div>
                <div className="chat-list">
                    {sortedData &&
                        sortedData.map((item, index) => {
                            return (
                                <div
                                    className="chat-item"
                                    key={index}
                                    onClick={() => routeHandler(item.id)}
                                >
                                    <div style={{display:"flex",alignItems: "center"}}>
                                        <div className="chat-item-image">
																						<img src={avatar} alt="avatar" style={{width:35}} />
                                        </div>
                                        <div className="user-chat">
                                            <div className="chat-item-name">
                                                {item.name}
                                            </div>
                                            <div className="chat-item-message">
                                                {item.messages &&
                                                    item.messages.slice(-1)[0]
                                                        .msg.slice(0,70)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-item-time">
                                        {item.messages &&
                                            getTimeFromDate(
                                                item.messages.slice(-1)[0].time
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
