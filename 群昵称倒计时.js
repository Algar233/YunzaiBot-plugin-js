import plugin from '../../lib/plugins/plugin.js'
import fetch from "node-fetch";
import cfg from "../../lib/config/config.js";
let t 
const h = [11111,22222]   /**添加你想更改群名片的群号 */
const n = '机器人' /**你的机器人的名字 */
setInterval(function(){
    var date = new Date();
t=date.toLocaleTimeString()
for (var i = 0; i < h.length; i++) {
  
    let a = h[i];
    var now = new Date();
    var target = new Date(2023, 2, 21,18,0,0);  /**月份从0开始计数，这里修改目标日期，精确到秒 */
    var diff = target - now;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    Bot.pickGroup(a).setCard(Bot.uin,n+'|距3.5下半'+days+'天'+hours+'时')//这里自定义文本，也可加参数秒但是不会每秒更新一次
  }
    
}, 120000);

