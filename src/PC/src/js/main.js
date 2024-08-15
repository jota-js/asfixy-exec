const { Builder } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');

(async function () {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(config.SiteToExec);
        
        // Aguardar 20 segundos após o carregamento da página
        await driver.sleep(config.TimeToExec); // 20000 milissegundos = 20 segundos

        let script;
        if (config.scriptNumber === 1) {
            script = `
                setInterval(() => {
                    Game.lumps = Infinity;
                    Game.cookies = Infinity;
                    Game.prestige = Infinity;
                    Game.ObjectsById[0].levelUp();
                }, 0);

                for (let id = 1; id <= 19; id++) {
                    setInterval(() => {
                        if (Game.ObjectsById.hasOwnProperty(id)) {
                            Game.ObjectsById[id].levelUp();
                        }
                        Game.SetAllUpgrades(1);
                        Game.RuinTheFun(1);
                    }, 0);
                }

                setInterval(() => {
                    for (let i = 0; i <= 19; i++) {
                        const product = document.querySelector('#product' + i);
                        if (product) {
                            product.click();
                        }
                    }
                }, 0);
            `;
        } else if (config.scriptNumber === 2) {
            try {
                const execScriptPath = path.resolve(__dirname, 'exec.js');
                script = fs.readFileSync(execScriptPath, 'utf8');
            } catch (err) {
                console.error("Failed to read exec.js:", err);
                return;
            }
        } else {
            console.error("Invalid scriptNumber.");
            return;
        }

        // Executar o script após a pausa de 20 segundos
        await driver.executeScript(script);
        console.log("Code injected. \nPlease join discord for updates. \nBy UnB Enterprise.\n\nNOTE >> U HAVE 2 MINUTES TO FARM UNTIL DRIVER QUITS, U CAN CONFIGURE THIS TIME IN GUI");
        
    } catch (error) {
        console.error(error);
    } finally {
        await driver.sleep(config.TimeToQuit);
        await driver.quit();
    }
})();
