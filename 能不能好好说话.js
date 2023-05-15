import fetch from "node-fetch"
export class sxck extends plugin {
  constructor () {
    super({
      name : '缩写查看',
      dsc : '缩写查看',
      event : 'message',
      priority : 5000,
      rule : [
        {
          reg: '^#*(sx|缩写) (.*)$',
          fnc: 'sx'
        }
      ]
    })
  }
  async sx (e) {
    let word = e.msg.replace(/#*(sx|缩写) /g, "").trim();
    const url = "https://lab.magiconch.com/api/nbnhhsh/guess";
    const data = {
      "text": `${word}`
    };
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://lab.magiconch.com',
        'Referer': 'https://lab.magiconch.com/nbnhhsh/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
      },
      body: JSON.stringify(data),
    });
    const result = await resp.json();
    const content = result[0];
    const name = content?.name;
    let res = "";
    const { trans, inputting } = content;
    if (trans) {
      res += trans.join(' , ');
    }      
    if (inputting) {
      res += inputting.join(' , ');
    }
    if (res) {
      await e.reply(name + "可能解释为：\n" + res);
    } else {
      await e.reply(`没有找到缩写 ${word} 的可能释义`);
    }
  } 
}