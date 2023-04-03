import plugin from '../../lib/plugins/plugin.js'
import fetch from "node-fetch";

export class wenan extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: '发病文学',
			/** 功能描述 */
			dsc: '发病文学',
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 2000,
			rule: [
				{
					/** 命令正则匹配 */
					reg: "#*^发病(.*)$",
					/** 执行方法 */
					fnc: 'fabing'
				},
				{
					/** 命令正则匹配 */
					reg: "#*^(疯狂星期四|cykfc|CYKFC)$",
					/** 执行方法 */
					fnc: 'kfc'
				}

			]
		})
	}
	async fabing(e) {
		let msg = e.msg.replace("发病", "").trim()
		//判断是否为空白字符
		if (!msg) {
			e.reply("你想要对谁发病呢？")
			return false;
		}
		//接口地址
		let url = `http://res.seiki.fun/api/diana/?name=${msg}`
		let res = await fetch(url).catch(err => logger.error(err))
		//判断接口是否请求成功
		if (!res) {
			logger.error('发病接口请求失败')
			return await this.reply('请求失败,请稍后再试')
		} 
		//接口结果文本转对象
		res = await res.text()
		//最后回复消息
		await this.reply(res)
	}
	async kfc(e) {
		//接口地址
		let url = `http://res.seiki.fun/api/kfc/`
		let res = await fetch(url).catch(err => logger.error(err))
		//判断接口是否请求成功
		if (!res) {
			logger.error('KFC接口请求失败')
			return await this.reply('请求失败,请稍后再试')
		} 
		//接口结果文本转对象
		res = await res.text()
		//最后回复消息
		await this.reply(res)
	}
}