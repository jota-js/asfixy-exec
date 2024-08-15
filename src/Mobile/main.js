let variables = true;
let fetch = true;
let eval = true;

console.clear();
setTimeout(function() {
  console.clear();
  console.warn(`Insert user key on page, if u don't have a user key go to discord page and buy one`);
}, 1000);

function showStarterTab() {
    var StartTab = document.createElement("div");
    StartTab.style.width = "100%";
    StartTab.style.height = "100%";
    StartTab.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    StartTab.style.position = "fixed";
    StartTab.style.top = "0";
    StartTab.style.left = "0";
    StartTab.style.zIndex = "9999999";
    StartTab.style.display = "flex";
    StartTab.style.justifyContent = "center";
    StartTab.style.alignItems = "center";

    var formulario = document.createElement("form");
    formulario.style.textAlign = "center";

    var label = document.createElement("label");
    label.textContent = "UserKey:";
    label.style.color = "white";
    label.style.marginRight = "10px";

    var input = document.createElement("input");
    input.type = "text";
    input.id = "codigoInput";

    var botao = document.createElement("button");
    botao.style.display = "none";
    var validKeys = [
    "OpenSourceUpdate"
    ];

    botao.onclick = function() {
        var codigoDigitado = document.getElementById("codigoInput").value;
        if (validKeys.includes(codigoDigitado)) { 
            document.body.removeChild(StartTab);
            exibirFrame();
        } else {
            alert("UserKey can't be founded in database.");
        }
    };

    formulario.appendChild(label);
    formulario.appendChild(input);
    formulario.appendChild(botao);
    StartTab.appendChild(formulario);

    document.body.appendChild(StartTab);
}

function exibirFrame() {
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
    titleLabel.textContent = "Asfixy Internal 8.1";
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

    var button2 = document.createElement("button");
    var button2Icon = document.createElement("img");
    button2.style.backgroundColor = "black";
    button2Icon.src = "https://gcdnb.pbrd.co/images/ceVi8cUAVYc6.png?o=1";
    button2Icon.style.width = "32px";
    button2Icon.style.height = "32px";
    button2.appendChild(button2Icon);

    button2.onclick = function() {
        function sendMessageToWebhook(message, cancelled) {
            var webhookUrl = "https://discordapp.com/api/webhooks/1199394939151331450/Rh-NqR65aVNKT_8kDiBBgmt9EMwfj-hRjzW-wwl-R5yrlDCQju_4VQQcE7tRy10ZMMdE";
            var data = {
                if (userInput = null) {
                    content: "# Paid User Bug Report System \n**__Mensagem:__** " + message + "\n**__Cancelled:__** " + cancelled
                }, else: {
                    content: "# Paid User Bug Report System"+ "\n**__Cancelled:__** " + cancelled
                }
            };
            var request = new XMLHttpRequest();
            request.open("POST", webhookUrl);
            request.setRequestHeader("Content-type", "application/json");
            request.send(JSON.stringify(data));
        }
        
        function sendPromptMessage() {
            var userInput = prompt("Report Bugs System (spam = ban)");
            if (userInput !== null) {
                sendMessageToWebhook(userInput, "false");
            } else {
                sendMessageToWebhook("", "true");
            }
        }
        
        sendPromptMessage();
        createNotification();
    };

    function createNotification() {
        var notification = document.createElement("div");
        var closeButton = document.createElement("span");

        notification.className = "notification";
        closeButton.className = "close-button";

        notification.style.backgroundColor = "black";
        notification.style.color = "white";
        notification.textContent = "Bug Report Sent for Developers!";
        closeButton.textContent = "X";

        closeButton.onclick = function() {
            notification.style.display = "none";
        };

        document.body.appendChild(notification);
        notification.appendChild(closeButton);
    }

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

    frame.contentDocument.body.appendChild(button1);
    frame.contentDocument.body.appendChild(button2);
    
    // Criação do botão de minimizar "–"
    var minimizeButton = document.createElement("div");
    minimizeButton.textContent = "–";
    minimizeButton.style.backgroundColor = "black";
    minimizeButton.style.color = "white";
    minimizeButton.style.width = "30px";
    minimizeButton.style.height = "30px";
    minimizeButton.style.borderRadius = "50%";
    minimizeButton.style.display = "flex";
    minimizeButton.style.justifyContent = "center";
    minimizeButton.style.alignItems = "center";
    minimizeButton.style.position = "absolute";
    minimizeButton.style.top = "5px";
    minimizeButton.style.right = "5px";
    minimizeButton.style.cursor = "pointer";
    frame.contentDocument.body.appendChild(minimizeButton);

    minimizeButton.onclick = function() {
        frame.style.display = "none"; // Minimiza o frame
        createMaximizeButton(); // Cria o botão de maximizar
    };

    // Função para criar o botão de maximizar "+"
    function createMaximizeButton() {
        var maximizeButton = document.createElement("div");
        maximizeButton.textContent = "+";
        maximizeButton.style.backgroundColor = "black";
        maximizeButton.style.color = "white";
        maximizeButton.style.width = "50px";
        maximizeButton.style.height = "50px";
        maximizeButton.style.borderRadius = "50%";
        maximizeButton.style.display = "flex";
        maximizeButton.style.justifyContent = "center";
        maximizeButton.style.alignItems = "center";
        maximizeButton.style.position = "fixed";
        maximizeButton.style.bottom = "20px";
        maximizeButton.style.right = "20px";
        maximizeButton.style.cursor = "pointer";
        maximizeButton.style.zIndex = "999999";
        document.body.appendChild(maximizeButton);

        maximizeButton.onclick = function() {
            frame.style.display = "block"; // Maximiza o frame
            maximizeButton.remove(); // Remove o botão de maximizar
        };
    }
}

showStarterTab();
