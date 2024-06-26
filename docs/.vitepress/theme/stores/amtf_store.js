import {
	defineStore
} from "pinia";
import axios from "axios";
import { withBase, useData } from 'vitepress'

import {
	computed,
	onMounted,
	onUnmounted,
	reactive,
	ref,
	toRaw,
	watch,
} from "vue";

export const a4_store = defineStore("amtf", {
	// 为了完整类型推理，推荐使用箭头函数
	state: () => {
		const a4 = reactive({ data: { 联系方式: "", 低调广告: [{}] } })

		axios({
			method: "get",
			url: `${withBase('data.json')}`
		}).then(({ data }) => {
			// console.log('data :>> ', data);
			a4.data = data
			return data;
		}).catch(() => {
			throw "请在public文件夹下添加data.json配置文件";
		}).catch((error) => {
			console.error(error);
		});

		axios({
			method: "get",
			url: `${withBase('更新日志.json')}`
		})
			.then(({ data }) => {
				// console.log('data :>> ', data);
				a4.更新日志 = data
			})
			.catch(() => {
				throw "请在public文件夹下添加更新日志.json配置文件";
			}).catch((error) => {
				console.error(error);
			});

		return {
			a4
		};
	},
});