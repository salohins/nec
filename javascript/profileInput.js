var lastfocus;
var infoOver;
var sCard;

setInterval(function() {
    var groups = document.getElementsByClassName("group_card");

    Array.prototype.forEach.call(groups, function(el) {
        $.ajax({
            type : "POST",
            url  : "../php/notifications.php",
            data : {group_id : el.id},
            success: function(res){ 
                var group = document.getElementById(el.id);
                var not = document.getElementById(el.id + "_notif");
                if (res != "0") {
                    not.innerHTML = res;
                    not.style.opacity = 1;
                }
                else {
                    not.style.opacity = 0;
                    not.innerHTML = "";
                }
                
            }
        });
    })
}, 3000);



function articleClick(elem_id) {

}

function articleOver(elemId) {
    var selectedCard = document.getElementById(elemId);
    var wrapper = selectedCard.parentNode;
    var h = selectedCard.childNodes[1];
    selectedCard.classList.add("hover");
    selectedCard.style.filter = "brightness(1.5)";
    wrapper.classList.add("wrappHover");
    var animationOver = false;
    
    setTimeout(function() {
        animationOver = true;
    }, 200);

    selectedCard.onmousedown = function() {
        if (animationOver && !selectedCard.childNodes[2]) {
            if (sCard) {
                sCard.childNodes[1].style.top = "80%";
                sCard.removeChild(document.getElementById("cardInfo")) 
                sCard.classList.remove("hover");
                sCard.style.height = "300px";
                sCard.style.backgroundPositionY = "0";
                sCard.style.filter = "brightness(1)";
            }
            sCard = selectedCard;
            //card info div---------------------------------
            var cardInfoDiv = document.createElement("div"); 
            var ci = cardInfoDiv.style;
            cardInfoDiv.id = "cardInfo";
            cardInfoDiv.setAttribute("data-card", elemId);
            ci.position = "absolute";
            ci.zIndex = "0";
            ci.width = "100%";
            ci.height = "auto";
            ci.borderBottomLeftRadius = "20px";
            ci.borderBottomRightRadius = "20px";
            ci.overflowX = "hidden";
            ci.overflowY = "hidden";
            ci.bottom = 0;
            ci.left = 0;

            var cardDate = document.createElement("p");
            var cds = cardDate.style;
            cds.position = "relative";
            cds.color = "white";
            cds.fontSize = "10px";
            cds.marginLeft = "20px";
            cds.filter = "opacity(.7)";
            cardDate.innerHTML = selectedCard.getAttribute("data-date");

            var cardDescr = document.createElement("p");
            var cd = cardDescr.style;
            cd.position = "relative";
            cd.color = "white";
            cd.display = "inner-line";
            cd.textAlign = "left";
            cd.fontSize = "13px";
            cd.margin = "15px";
            cd.marginTop = "10px";
            cardDescr.innerHTML = selectedCard.getAttribute("data-description");

            var dp = document.createElement("h4");
            dp.innerHTML = "discuss";
            var dps = dp.style;
            dps.color = "white";
            dps.position = "relative";
            dps.marginLeft = "18px";
            dps.fontSize = "14px";
            dps.fontWeight = "normal";
            dps.textTransform = "uppercase";
            dps.opacity = ".7";

            var opinionInput = document.createElement("input");
            var oi = opinionInput.style;
            oi.position = "relative";
            oi.width = "350px";
            oi.height = "25px";
            oi.marginLeft = "10px";
            oi.marginBottom = "10px";
            oi.border = "none";
            oi.borderRadius = "15px";
            oi.paddingLeft = "15px";
            
            var sendO = document.createElement("input");
            var so = sendO.style;
            sendO.type = "button";
            so.width = "23px";
            so.height = "23px";
            so.position = "relative";
            so.float = "right";
            so.background = "url(../img/send.png) center";
            so.backgroundSize = "cover";
            so.border = "none";
            so.marginRight = "12px";
            so.marginTop = "2px";
            so.cursor = "pointer";

            sendO.onclick = function() {
                
                $.ajax({
                    type : "POST",
                    url  : "../php/create_chat.php",
                    data : {post_id: selectedCard.getAttribute("data-post-id"), 
                            chat_name: selectedCard.getAttribute("data-title"),
                            type : "article", 
                            msg_text: opinionInput.value,
                            bg: selectedCard.getAttribute("data-backurl")},
                    success: function(res){ 
                        location.reload();
                    }
                });
            } 

            h.style.top = "10%";
            selectedCard.style.backgroundPositionY = "-100px";
            cardInfoDiv.appendChild(cardDate);
            cardInfoDiv.appendChild(cardDescr);
            cardInfoDiv.appendChild(dp);
            cardInfoDiv.appendChild(opinionInput);
            cardInfoDiv.appendChild(sendO);
            selectedCard.appendChild(cardInfoDiv);
        }
    }
}

function wrappperOut(wrappId) {
    if (!document.getElementById("cardInfo"))
        document.getElementById(wrappId).classList.remove("wrappHover");
}

function articleOut(cardId) {  
    var card = document.getElementById(cardId);
    var info = document.getElementById("cardInfo");
    if (!(info && info.getAttribute("data-card") == cardId)) {
        card.classList.remove("hover");
        card.style.removeProperty("transform");
        card.style.height = "300px";
        card.style.filter = "brightness(1)";    
    }
}

function groupClick(elem_id) {
    
    $.ajax({
        type : "POST",
        url  : "../php/find_chat.php",
        data : {post_id: elem_id},
        success: function(res){
            start_messenger(res, elem_id);
        }
    });
}

function imgDown(elemId) {
    var posX = event.clientX;
    var posY = event.clientY;

    if (document.getElementById("oDIv"))
        document.body.removeChild(document.getElementById("oDIv"));

    var oDiv = document.createElement("div");
    var od = oDiv.style;
    oDiv.id = "oDiv";
    od.position = "fixed";
    od.display = "inline-block";
    od.textAlign = "center";
    od.zIndex = 10000;
    od.left = posX + "px";
    od.top = posY + "px";
    od.width = "160px";
    od.lineHeight = "35px";
    od.backgroundColor = "gray";
    od.borderRadius = "10px";
    od.cursor = "pointer";

    var p = document.createElement("p");
    var ps = p.style;
    ps.color = "white";
    ps.fontSize = "15px";
    ps.display = "inline-block";
    ps.width = "100%";
    ps.textAlign = "center";
    ps.margin = "auto";
    p.innerHTML = "change profile picture";

    p.onmousedown = function() {
        document.body.removeChild(oDiv);
        var c = document.createElement("div");
        var cs = c.style;
        cs.position = "fixed";
        cs.display = "inline-block";
        cs.lineHeight = document.body.clientHeight + "px";
        cs.width = "100%";
        cs.left = 0;
        cs.top = 0;
        cs.textAlign = "center";
        cs.verticalAlign = "baseline";
        cs.zIndex = 20000;

        var div = document.createElement("div");
        var divs = div.style;
        divs.height = "300px";
        divs.width = "500px";
        divs.display = "inline-block";
        divs.backgroundColor = "white";
        
        var f = document.createElement("form");
        f.setAttribute("method", "post");
        f.setAttribute("action", "../php/upld_img.php");
        f.setAttribute("enctype", "multipart/form-data");
        var input1 = document.createElement("input");
        var input2 = document.createElement("input");
        
        input1.type = "file";
        input1.style.position = "relative";
        input1.style.float = "left";
        input1.name = "fileToUpload";
        input1.id = "fileToUpload";

        input2.type = "submit";
        input2.name = "submit";
        input2.value = "upload";
        input2.style.position = "relative";
        input2.style.float = "left";

        f.appendChild(input1);
        f.appendChild(input2);

        div.appendChild(f);
        c.appendChild(div);
        document.body.appendChild(c);

        
    }

    oDiv.appendChild(p);

    var fade = document.createElement("div");
    fade.id = "fade";
    fade.onmousedown = function() {
        fadeClick(oDiv);
    }

    document.body.appendChild(fade);
    document.body.appendChild(oDiv);
    
    
}


function start_messenger(chat_id, elemId) {
    if (document.getElementById("messenger"))
        document.body.removeChild(document.getElementById("messenger"));
    $.ajax({
        type : "POST",
        url  : "../php/show_messages.php",
        data : {chat_id: chat_id,
                amount: "all"},
        success: function(res){
            const mWidth = 320;
            const mHeight = 500;
            
            //Mesenger-----------------------------------
            var messenger = document.createElement("div");
            var ms = messenger.style;
            messenger.id = "messenger"; 
            ms.position = "fixed";
            ms.zIndex = 5000;
            ms.display = "block";
            ms.backgroundColor = "rgb(50, 50, 50)";
            ms.width = mWidth + "px";
            ms.height = mHeight + "px";
            ms.top = window.innerHeight - mHeight + "px";
            ms.left = window.innerWidth - mWidth - 50 + "px";
            ms.webkitBoxShadow = "0px 10px 28px -5px rgba(0,0,0,0.56)";
            ms.borderRadius = "25px";
            ms.overflowY = "hidden";
            ms.overflowX = "hidden";
            ms.borderTop = "1px solid rgb(70, 70, 70)";

            //messenger header----------------------------
            var msgHeader = document.createElement("div"); 
            var msh = msgHeader.style;
            msgHeader.id = "msgHeader";
            msh.display = "block";
            msh.height = "53px";
            msh.width = "100%";
            msh.position = "relative";
            msh.backgroundColor = "rgb(50, 50, 50)";
            msh.borderBottom = "1px solid rgb(70, 70, 70)";

            //group icon----------------------------------
            var groupIcon = document.createElement("div");
            if (document.getElementById(elemId)) {
                var groupBg = document.getElementById(elemId).getAttribute("data-backurl");
                var hName = document.createElement("h4"); 
                hName.innerHTML = document.getElementById(elemId).getAttribute("data-name");
            }
            else 
                var groupBg = elemId;

            groupIcon.onmousedown = function() {
                if (document.getElementById("deleteChatDiv"))
                    document.body.removeChild(document.getElementById("deleteChatDiv"));
                var dChat = document.createElement("div");
                var ds = dChat.style;
                dChat.id = "deleteChatDiv";
                ds.position = "fixed";
                ds.zIndex = 500000;
                ds.left = event.clientX + "px";
                ds.top = event.clientY + "px";
                ds.width = "auto";
                ds.height = "auto";
                ds.backgroundColor = "gray";
                ds.borderRadius = "10px";

                var o = document.createElement("p");
                os = o.style;
                os.color = "white";
                os.margin = "10px";
                o.innerHTML = "leave chat";
                os.cursor = "pointer";

                o.onmousedown = function() {
                    $.ajax({
                        type : "POST",
                        url  : "../php/delete_chat.php",
                        data : {id : chat_id},
                        success: function(res) {
                            location.reload();  
                        }
                    });
                }

                dChat.appendChild(o);
                document.body.appendChild(dChat);

                var fade = document.createElement("div");
                fade.id = "fade";
                fade.onmousedown = function() {
                    fadeClick(dChat);
                }
                document.body.appendChild(fade);

            }
            gi = groupIcon.style;
            gi.background = "url(" + groupBg + ") center";
            gi.backgroundSize = "cover";
            gi.width = "44px";
            gi.height = "44px";
            gi.borderRadius = "50%";
            gi.display = "block";
            gi.position = "relative";
            gi.float = "left";
            gi.marginLeft = "5px";
            gi.marginTop = "5px";

            //
            

            //close button------------------------------------
            var closeButton = document.createElement("input");
            closeButton.type = "button";
            var cb = closeButton.style;
            cb.background = "url(../img/close.png) center";
            cb.backgroundSize = "cover";
            cb.float = "right";
            cb.width = "27px";
            cb.height = "27px";
            cb.border = "none";
            cb.cursor = "pointer";
            cb.marginRight = "7px";
            cb.marginTop = "7px";
            cb.filter = "opacity(.7)";

            closeButton.onclick = function() {
                document.body.removeChild(messenger);
            }
            
            msgHeader.appendChild(groupIcon);
            //msgHeader.appendChild(hName);
            msgHeader.appendChild(closeButton);

            //chat area----------------------------------
            var chatArea = document.createElement("div");
            var ca = chatArea.style;
            chatArea.id = "chatArea";
            ca.display = "block";
            ca.width = "100%";
            ca.height = "395px";
            ca.backgroundColor = "rgb(50, 50, 50)";
            ca.position = "relative";
            ca.overflowY = "auto";
            chatArea.innerHTML = res;
        
            //msg input------------------------------------
            var msgInput = document.createElement("input");
            var mi = msgInput.style;
            msgInput.id = "msgInput";
            msgInput.type = "text";
            mi.height = "35px";
            mi.width = "167px";
            mi.borderRadius = "30px";
            mi.marginTop = "7px";
            mi.marginLeft = "13px";
            mi.paddingLeft = "10px";
            mi.border = "none";
            mi.float = "left";
            mi.paddingRight = "40px";
            mi.backgroundColor = "rgb(80, 80, 80)";
            mi.fontSize = "15px";
            mi.color = "white";
            msgInput.setAttribute("tabindex", "-1");

            msgInput.addEventListener("keyup", function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    event.stopPropagation();
                    sendButton.click();
                }
            });

            msgInput.onblur = function() {
                lastfocus = this;
            }

            //emoji button-------------------------------------
            var emojiButton = document.createElement("button");
            var eb = emojiButton.style;
            eb.position = "absolute";
            eb.background = "url(../img/smile.png) center";
            eb.backgroundSize = "cover";
            eb.border = "none";
            eb.width = "19px";
            eb.height = "19px";
            eb.left = "240px";
            eb.top = "465px";
            eb.cursor = "pointer";
            eb.filter = "opacity(.3)";

            emojiButton.onclick = function() {
                if (document.getElementById("emojiDiv")) {
                    messenger.removeChild(document.getElementById("emojiDiv"));
                    return;
                }

                //emoji div----------------------------------
                var emojiDiv = document.createElement("div");
                var ed = emojiDiv.style;
                emojiDiv.id = "emojiDiv";
                ed.position = "absolute";
                ed.backgroundColor = "rgb(65, 65, 65)";
                ed.displed
                ed.width = "325px";
                ed.height = "150px";
                ed.zIndex = "5001";
                ed.left = "-5px";
                ed.top = "300px";
                ed.borderRadius = "15px";
                ed.overflowY = "auto";
                ed.paddingLeft = "7px";
                
                for (var i = 128512; i < 128581; i++) {
                    var newEmoji = document.createElement("p");
                    var ne = newEmoji.style;
                    newEmoji.id = "imoji_" + i;
                    ne.position = "relative";
                    ne.float = "left";
                    ne.marginLeft = "7px";
                    ne.marginBottom = "0px";
                    ne.cursor = "pointer";
                    ne.fontSize = "23px";
                    
                    newEmoji.innerHTML = "&#" + i;
                    newEmoji.setAttribute("onmousedown", "printEmoji(this.id)");
                    emojiDiv.appendChild(newEmoji);
                }

               messenger.appendChild(emojiDiv);
            }

            //send button------------------------------------
            var sendButton = document.createElement("input");
            sendButton.type = "button";
            var sb = sendButton.style;
            sb.float = "left";
            sb.background = "url(../img/send.png) center";
            sb.backgroundSize = "cover";
            sb.width = "25px";
            sb.height = "25px";
            sb.border = "none";
            sb.marginLeft = "13px";
            sb.marginTop = "12px";
            sb.cursor = "pointer";

            sendButton.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                sendButton.setAttribute("selectable", "false");
                sendMessage(chat_id);
                if (lastfocus) {
                    setTimeout(function() {lastfocus.focus()}, 10);
                } 
                return false;
            });

            //attach button------------------------------------
            var attachButton = document.createElement("input");
            var ab = attachButton.style;
            attachButton.type = "button";
            ab.float = "left";
            ab.background = "url(../img/attach.png) center";
            ab.backgroundSize = "cover";
            ab.width = "25px";
            ab.height = "25px";
            ab.border = "none";
            ab.marginLeft = "13px";
            ab.marginTop = "12px";
            ab.cursor = "pointer";

            messenger.appendChild(msgHeader);
            messenger.appendChild(chatArea);
            messenger.appendChild(attachButton);
            messenger.appendChild(msgInput);
            messenger.appendChild(emojiButton);
            messenger.appendChild(sendButton);
           
            setInterval(function(){
                $.ajax({
                    type : "POST",
                    url  : "../php/receive_msg.php",
                    data : {chat_id: chat_id},
                    success: function(res) {
                        if (res.localeCompare("") != 0) {
                            chatArea.insertAdjacentHTML('beforeend', res);
                            chatArea.scrollTop = chatArea.scrollHeight;
                        }
                    }
                });
            }, 3000);
            
            document.body.appendChild(messenger);
            msgInput.focus();
            dragMessenger();
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    });
    
}

function printEmoji(emoji_id) {
    emoji = document.getElementById(emoji_id);
    msgInput = document.getElementById("msgInput");
    msgInput.value += emoji.innerHTML;
}

function dragMessenger() {
    elmnt = document.getElementById("messenger");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("msgHeader"))
        document.getElementById("msgHeader").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function sendMessage(chat_id) {
    chatArea = document.getElementById("chatArea");
    if (msgInput.value != "") {
        $.ajax({
            type : "POST",
            url  : "../php/send_message.php",
            data : {send_msg: "send_msg",
                    text_msg: document.getElementById("msgInput").value,
                    chat_id: chat_id},
            success: function(res) {
                chatArea.insertAdjacentHTML('beforeend', res);
                chatArea.scrollTop = chatArea.scrollHeight;
            }
        });
    }
    if (document.getElementById("emojiDiv"))
        messenger.removeChild(document.getElementById("emojiDiv"));
    msgInput.value = "";
}


function profDown(id) {
    if (document.getElementById("flist"))
        document.body.removeChild(document.getElementById("flist"));

    var posX = event.clientX;
    var posY = event.clientY;

    var rect = document.createElement("div");
    var rs = rect.style;
    rect.id = "flist";
    rs.position = "fixed";
    rs.zIndex = 300000;
    rs.width = "150px";
    rs.lineHeight = "10px";
    rs.display = "inline-block";
    rs.textAlign = "center";
    rs.backgroundColor = "gray";
    rs.left = posX + "px";
    rs.top = posY + "px";
    rs.cursor = "pointer";
    rs.borderRadius = "10px";

    var o = document.createElement("p");
    o.innerHTML = "send friend request";
    os = o.style;
    os.color = "white";
    os.display = "inline-blocks";
    os.textAlign = "center";
    os.width = "100%";
    os.fontSize = "15px";

    o.onmousedown = function() {
        if (document.getElementById("flist"))
            document.body.removeChild(document.getElementById("flist"));
        $.ajax({
            type : "POST",
            url  : "../php/add_friend.php",
            data : {user_id: id,
            status : "pending"},
            success: function(res) {
            }
        });
    }

    rect.appendChild(o);
    document.body.appendChild(rect);

    var fade = document.createElement("div");
    fade.id = "fade";
    fade.onmousedown = function() {
        fadeClick(rect);
    }
    document.body.appendChild(fade);
}

function btnClick(id) {
    var btn = document.getElementById(id);
    
    var div = document.createElement("div");
    var ds = div.style;
    div.id = "barDiv";
    ds.backgroundColor = "rgb(50, 50, 50)";
    ds.position = "fixed";
    ds.zIndex = 300003;
    ds.width = "300px";
    ds.height = "auto";
    ds.borderRadius = "15px";
    ds.display = "block";
    ds.top = "160px";
    ds.color = "white";
    ds.border = "solid 1px gray"

    switch(id) {
        case "fr-button":
            ds.left = "200px";

            $.ajax({
                type : "POST",
                url  : "../php/show_friends.php",
                success: function(res) {
                    if (res.localeCompare("") != 0) {
                        div.innerHTML = res;
                        document.body.appendChild(div);
                        btn.style.filter = "brightness(1)";
                    }    
                }
            });
            
        break;

        case "sett-button":
            ds.left = "50px";
            ds.top = "45px";
            ds.width = "auto";
            var o = document.createElement("p");
            var os = o.style;
            os.color = "white";
            os.margin = "10px";
            os.cursor = "pointer";
            o.innerHTML = "log out";

            o.onmousedown = function() {
                window.location.href = '../index.php';
            }
            div.appendChild(o);
            document.body.appendChild(div);
            
            btn.style.filter = "brightness(1)";
        break;
    }
    

    var fade = document.createElement("div");
    fade.id = "fade";
    document.body.appendChild(fade);
    fade.onclick = function() {
        fadeClick(div);
        btn.style.filter = "brightness(0.8)";
    }
}

function fclick(id, name, bg) {
    var btn = document.getElementById("fr-button");
    btn.style.filter = "brightness(0.8)";
    if (document.getElementById("fade"))
        document.body.removeChild(document.getElementById("fade"));
    if (document.getElementById("barDiv"))
        document.body.removeChild(document.getElementById("barDiv"));
    

    $.ajax({
        type : "POST",
        url  : "../php/find_chat.php",
        data : {post_id: id},
        success: function(res) {
            if (res.localeCompare("") != 0) {
                start_messenger(res, bg);
            }
            else {
                $.ajax({
                    type : "POST",
                    url  : "../php/create_chat.php",
                    data : {type: "chat",
                            bg: bg,
                            sender: id,
                            msg_text: ""},
                    success: function(res) {
                        start_messenger(res, bg);
                    }
                });
            }
        }
    });
   
}

function fadeClick(elem) {
    document.body.removeChild(document.getElementById("fade"));
    document.body.removeChild(elem);
}

function addFriend(id) {
    $.ajax({
        type : "POST",
        url  : "../php/add_friend.php",
        data : {user_id : id,
                status: "friend"},
        success: function(res) {
            location.reload();
        }
    });
}

function declineFriend(id) {
    $.ajax({
        type : "POST",
        url  : "../php/decline_friend.php",
        data : {id : id},
        success: function(res) {
            location.reload();
        }
    });
}

function addSection() {
    if (document.getElementById("sDiv")) 
        document.body.removeChild(document.getElementById("sDiv"));


    var elemRect = document.getElementById("add-section");
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect = elemRect.getBoundingClientRect(),
        offsetTop   = elemRect.top - bodyRect.top,
        offsetLeft = elemRect.left - bodyRect.left;


    var posX = event.clientX;
    var posY = event.clientY;

    var sDiv = document.createElement("div");
    var ss = sDiv.style;

    sDiv.id = "sDiv";

    ss.position = "absolute";
    ss.display = "block";
    ss.width = "200px";
    ss.height = "auto";
    ss.left = offsetLeft + event.offsetX + "px";
    ss.top = offsetTop + event.offsetY + "px";
    ss.zIndex = 50000;
    ss.backgroundColor = "rgb(50, 50, 50)";
    ss.borderRadius = "10px";
    ss.border = "1px solid gray";
    ss.overflowY = "hidden";
    ss.color = "white";

    $.ajax({
        type : "POST",
        url  : "../php/show_sections.php",
        data : {},
        success: function(res) {
            sDiv.innerHTML = res;
        }
    });

    document.body.appendChild(sDiv);
    var fade = document.createElement("div");
    fade.id = "fade";
    fade.onmousedown = function() {
        fadeClick(sDiv);
    }
    document.body.appendChild(fade);
}

function insertSection(name) {
    $.ajax({
        type : "POST",
        url  : "../php/insert_section.php",
        data : {name: name},
        success: function(res) {
            location.reload();
        }
    });
}

