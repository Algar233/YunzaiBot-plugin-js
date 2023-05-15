/*每日任务分1和2,1来源于好游快爆的网页;2来源于下面的api经常出错,例如云野任务显示禁阁的图.
所以增加了旧版好游快爆来源,默认为1,指令后加2才为2*/
import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import puppeteer from 'puppeteer'

let url = `https://api.t1qq.com/api/sky/gy/sc/scjlwz`;//季蜡位置
let url2 = `https://api.t1qq.com/api/sky/gy/sc/dlz/scdlwz.php`//大蜡烛位置
let url3 = `https://api.t1qq.com/api/sky/gy/sc/scsky.php`//任务
let url4 = `https://api.t1qq.com/api/sky/gy/sc/mf/magic`//限免魔法
let url5 = `https://api.t1qq.com/api/sky/gytq?key=bcVIK8fjrfJzZJtvxwOJMQmLPt`//天气预报
let url6 = `https://api.t1qq.com/api/sky/gytq?key=bcVIK8fjrfJzZJtvxwOJMQmLPt`//红石位置
export class sky extends plugin {
  constructor () {
    super({
      name: '光遇',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#*(光遇)?(国服)?(今日|每日)?任务$',
          fnc: 'sky_jrrw'
        },
        {
          reg: '^#*(光遇)?(国服)?(今日|每日)?任务2$',
          fnc: 'sky_jrrw2'
        },
        {
          reg: '^#*(光遇)?(大蜡烛|大蜡烛位置|今日大蜡烛)$',
          fnc: 'sky_dlz'
        },
        {
          reg: '^#*(光遇)?(季蜡|季蜡位置|今日季蜡)$',
          fnc: 'sky_jl'
        },
        {
          reg: '^#*(光遇)?(魔法限免|限免魔法)$',
          fnc: 'sky_mf'
        },
        {
          reg: '^#?(光遇天气|天气预报|光遇天气预报)$',
          fnc: 'sky_tqyb'
        },
        {
          reg: '^#*(光遇|sky)(服务器)?状态$',
          fnc: 'sky_fwqzt'
        },
        {
          reg: '^#*光遇日历$',
          fnc: 'sky_rl'
        },
        {
          reg: '^#*红石位置$',
          fnc: 'sky_hswz'
        },
        {
          reg: '^#*光遇菜单$',
          fnc: 'sky_help'
        },
      ]
    })
  }
  async browserInit() {
    return await puppeteer.launch();
  } 
  async sky_jrrw (e) {
    await e.reply('正在返回图片,可能较慢', false, { at: false, recallMsg: 10 })
	// 设置页面属性
    const browser = await this.browserInit();
		const page = await browser.newPage();
		await page.setViewport({
			width: 1280,
			height: 1320
		});
  // 进入页面
		await page.goto('https://www.onebiji.com/hykb_tools/guangyu/rwgl/index.php');
		
  //渲染图像
		let buff = null
		
		buff = await page.screenshot({
			clip: {
			  x: 300,
			  y: 1300,
			  width: 675,
			  height: 1800
			}
		});
		page.close().catch((err) => logger.error(err));
		browser.close().catch((err) => logger.error(err));
	await e.reply(segment.image(buff));
	return true;
	}
  async sky_jrrw2 (e) {
    //cv了https://gitee.com/Nwflower/auto-plugin/blob/master/model/autoGroupName/MonthMassage.js的月消息数代码
    await e.reply('正在返回图片,可能较慢', false, { at: false, recallMsg: 10 })
    let msg = [
      '今日任务',segment.image(url3)
    ]
    await this.reply(msg, true)
    }
  async sky_dlz (e) {
	await e.reply('正在返回图片,可能较慢', false, { at: false, recallMsg: 10 })
	let msg = [
	'大蜡烛位置',segment.image(url2)
	]
	await this.reply(msg, true)
    }
  async sky_jl (e) {
	await e.reply('正在返回图片,可能较慢', false, { at: false, recallMsg: 10 })
	let msg = [
	'季蜡位置',segment.image(url)
	]
	await this.reply(msg, true)
    }
  async sky_mf (e) {
	await e.reply('正在返回图片,可能较慢', false, { at: false, recallMsg: 10 })
	let msg = [
	'魔法限免',segment.image(url4)
	]
	await this.reply(msg, true)
    } 
  async sky_tqyb (e) {
	let res = await fetch(url5).catch((err) => logger.error(err));
    res = await res.json();
    const { url } = res.tq[2];
    let num
    if(res.msg === '查询成功'){
      num = [
        segment.image(`${url}`),
      ]
    }
    await this.reply(num, true)
    }
  async sky_fwqzt(e) { 
    // 获取服务器状态信息
    let response = await fetch(`https://live-queue-sky-merge.game.163.com/queue?type=json`);
    let res = await response.json();
    let num;
    // 判断服务器状态
    if(res.ret === 0){
      num = `查询结果：未炸服~`;
    } else if(res.ret === 1){
      num = `查询结果：炸服力~\n当前排队人数:「${res.pos}」\n预计所需时间:「${res.wait_time}」`;
    }
    let msg = [`${num}`];
    // 回复消息
    e.reply(msg, true);
    }
  async sky_rl (e) {
	  // 使用 puppeteer 库初始化浏览器
	const browser = await puppeteer.browserInit();
	  // 打开一个新页面
	const page = await browser.newPage();
	  // 设置页面大小
	await page.setViewport({width: 650,height: 2000});
	  // 导航到特定 URL
	await page.goto('https://www.guoping123.com/hykb_tools/guangyu/rwgl/index.php');
	  // 截取页面图像
	const buff = await page.screenshot({
	  clip: {
		x: 31, y: 645, width: 591, height: 439
	   }
	});
	  // 关闭页面
	await page.close();
	  // 回复图像数据
	await e.reply(segment.image(buff));
	  // 返回 true
	return true;
	}
  async sky_hswz(e) {
    const imgreply = 'https://gchat.qpic.cn/gchatpic_new/1947425850/3882665563-2271260242-C76BCD49DA8CC0C154C62C405CD9E432/0?term=2&is_origin=0'
    let res = await fetch(url6).catch((err) => logger.error(err));
    res = await res.json();
    const { url } = res.tq[3];
    let num
    if(res.msg === '查询成功'){
      num = [
        imgreply ? segment.image(imgreply) : "",
        segment.image(`${url}`),
      ]
    }
    await this.reply(num, true);
    }
  async sky_help(e) {
	let msg = [
	'❇️任务(每日任务)\n',
	'❇️大蜡烛/季蜡(大蜡烛/季蜡位置)\n',
	'❇️限免魔法(每日免费魔法)\n',
	'❇️天气预报(光遇天气预报)\n',
	'❇️红石位置(每日红石活动位置)\n',
	'❇️光遇状态(光遇服务器状态)'
	]
	await this.reply(msg)
    }
}
