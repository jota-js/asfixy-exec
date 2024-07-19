console.clear();
    console.warn('Join Discord for updates')
    window.open('https://discord.gg/9QDNKyYKFk', '_blank');

    var frame = document.createElement("iframe");
    frame.sandbox = "allow-scripts allow-same-origin";
    frame.style.width = "380px";
    frame.style.height = "250px";
    frame.style.position = "fixed";
    frame.style.backgroundColor = "black";
    frame.style.color = "black";
    frame.style.top = "0";
    frame.style.right = "0";
    frame.style.zIndex = "999999";
    document.body.appendChild(frame);

    var titleLabel = document.createElement("h2");
    titleLabel.textContent = "Asfixy Internal 8";
    titleLabel.style.color = "white";
    titleLabel.style.textAlign = "center";
    frame.contentDocument.body.appendChild(titleLabel);

    var textbox = document.createElement("textarea");
    textbox.style.width = "100%";
    textbox.style.height = "100px";
    textbox.style.backgroundColor = "black";
    textbox.style.color = "white";
    textbox.style.textAlign = "left";
    textbox.style.verticalAlign = "top";
    frame.contentDocument.body.appendChild(textbox);

    frame.contentDocument.body.style.display = "flex";
    frame.contentDocument.body.style.flexDirection = "column";

    var sandboxedCode = textbox.value;
    
// EXECUTE 

var button1 = document.createElement("button");
var button1Icon = document.createElement("img");
button1.style.backgroundColor = "black";
button1Icon.src = "https://gcdnb.pbrd.co/images/icUa26yq3tvA.png?o=1";
button1Icon.style.width = "32px";
button1Icon.style.height = "32px";
button1.appendChild(button1Icon);

button1.onclick = function() {
    var jsCode = textbox.value;
        
    if (jsCode === "") {
        console.log('trying to execute nothing mf');
    } else if (jsCode === `console.clear();

            fetch("https://raw.githubusercontent.com/jota-js/Asfixy/paid/index.js")
              .then(response => response.text())
              .then(script => {
                eval(script);
              })`) {
            alert('nice try')
        } else {
            try {
                var scriptElement = document.createElement('script');
                scriptElement.textContent = jsCode;
                document.body.appendChild(scriptElement);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


var css = `
.notification {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 9999;
}

.close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}
`;

var style = document.createElement("style");
style.textContent = css;

document.head.appendChild(style);


// BuG REPORT SYSTEM

var button2 = document.createElement("button");
var button2Icon = document.createElement("img");
button2.style.backgroundColor = "black";
button2Icon.src = "https://gcdnb.pbrd.co/images/ceVi8cUAVYc6.png?o=1";
button2Icon.style.width = "32px";
button2Icon.style.height = "32px";
button2.appendChild(button2Icon);

button2.onclick = function() {
    function sendMessageToWebhook(message, hwid, cancelled) {
        var webhookUrl = "https://discord.com/api/webhooks/1199394939151331450/Rh-NqR65aVNKT_8kDiBBgmt9EMwfj-hRjzW-wwl-R5yrlDCQju_4VQQcE7tRy10ZMMdE";
        var data = {
            content: "# Free User Bug Report System \n**__Mensagem:__** " + message + "\n**__HWID:__** " + hwid + "\n**__Cancelled:__** " + cancelled
        };
        var request = new XMLHttpRequest();
        request.open("POST", webhookUrl);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(data));
    }
    
    function sendPromptMessage() {
        var userInput = prompt("Report Bugs System (spam = ban)");
        var hwid = "AsfixyHWiD-" + generateHWID();
        if (userInput !== null) {
            sendMessageToWebhook(userInput, hwid, "false");
        } else {
            sendMessageToWebhook("", hwid, "true");
        }
    }
    
    function generateHWID() {
        var hwid = "";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.ipify.org?format=json", false);
        xhr.send();
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            hwid = response.ip;
        }
        return hwid;
    }
    
    sendPromptMessage();
}

frame.contentDocument.body.appendChild(button1);
frame.contentDocument.body.appendChild(button2);
