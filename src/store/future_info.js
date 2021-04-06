import ajax from '../assets/ajax.js'
import dateutil from '../assets/dateutil.js'
import datautil from '../assets/datautil.js'


export default {
	namespaced: true,
	state: () => ({
		future_info_ori: {
			常用: {
				沪深300: 'IF.CFX',
				棕榈油: 'P.DCE',
				豆一: 'A.DCE',
				玻璃: 'FG.ZCE',
				白糖: 'SR.ZCE',
				螺纹钢: 'RB.SHF',
				棉花: 'CF.ZCE',
				黄金: 'AU.SHF',
				乙二醇: 'EG.DCE',
				苹果: 'AP.ZCE',
				鸡蛋: 'JD.DCE'
			},
			农产品: {
				油脂油料: {
					豆二: 'B.DCE',
					豆粕: 'M.DCE',
					豆油: 'Y.DCE',
					菜籽: 'RS.ZCE',
					菜粕: 'RM.ZCE',
					菜油: 'OI.ZCE',
					棕榈油: 'P.DCE'
				},
				粮食谷物: {
					玉米: 'C.DCE',
					早籼稻: 'RI.ZCE',
					粳稻: 'JR.ZCE',
					强麦: 'WH.ZCE',
					普麦: 'PM.ZCE'
				},
				农副产品: {
					棉花: 'CF.ZCE',
					白糖: 'SR.ZCE',
				},
				本土产品: {
					豆一: 'A.DCE',
					鸡蛋: 'JD.DCE',
					苹果: 'AP.ZCE',
				},
			},
			金属: {
				贵金属: {
					黄金: 'AU.SHF',
					白银: 'AG.SHF',
				},
				有色金属: {
					铜: 'CU.SHF',
					铝: 'AL.DCE',
					铅: 'PB.SHF',
					锌: 'ZN.SHF',
					镍: 'NI.SHF',
					锡: 'SN.SHF'
				}
			},
			能源化工: {
				黑色系: {
					螺纹钢: 'RB.SHF',
					铁矿石: 'I.DCE',
					热轧卷板: 'HC.SHF',
					线材: 'WR.SHF',
					锰硅: 'SM.ZCE',
					硅铁: 'SF.ZCE'
				},
				煤炭类: {
					焦煤: 'JM.DCE',
					焦炭: 'J.DCE',
					动力煤: 'TC.ZCE'
				},
				原油类: {
					燃油: 'FU.SHF',
					原油: 'SC.INE'
				},
				化工: {
					PTA: 'TA.ZCE',
					聚丙烯: 'PP.DCE',
					玻璃: 'FG.ZCE',
					PVC: 'V.DCE',
					甲醇: 'MA.ZCE',
					乙二醇: 'EG.DCE',
					橡胶: 'RU.SHF'
				},
			},
			股指期货: {
				沪深300: 'IF.CFX',
				中证500: 'IC.CFX',
				上证50: 'IH.CFX',
			}

		},
		defaultProps: {
			children: 'children',
			label: 'label'
		},
		main_code_interval_raise_fall_data: {'D': [], 'W': [], 'M': []},
		main_code_interval_point_data: {'D': [], 'W': [], 'M': []},
		ts_code_interval_point_data: {'D': [], 'W': [], 'M': []},
		ts_code_interval_pure_holding_data_first_n: [],
		ts_code_interval_pure_volume_data: {}
	}),
	getters: {
		aside_future_data: state => {
			function add_symbol(data, desc, id_list) {
				for (let key in data) {
					if (typeof data[key] === "string") {
						desc.push({
							label: key,
							id: [data[key]]
						});
						id_list.push(data[key]);
					} else {
						let id_list_now = [];
						let children = [];
						desc.push({
							label: key,
							id: id_list_now,
							children: children
						});

						add_symbol(data[key], children, id_list_now);
						id_list_now.forEach(function(element) {
							id_list.push(element);
						});
					}
				}
			}

			let future_info_new = [];
			add_symbol(state.future_info_ori, future_info_new, [])

			return future_info_new
		},
		// main_code_interval_raise_fall_data: state => {
		// 	return state.main_code_interval_raise_fall_data
		// },
		// ts_code_interval_point_data: state => {
		// 	return state.ts_code_interval_point_data
		// }
	},
	mutations: {
		main_code_interval_raise_fall_data: (state, data) => {
			const freq_code = data.freq_code;
			
			// let result = datautil.copy(state.main_code_interval_raise_fall_data);
			// result[freq_code] = data.result;
			
			// state.main_code_interval_raise_fall_data = result;
			
			state.main_code_interval_raise_fall_data[freq_code] = data.result;
		},
		main_code_interval_point_data: (state, data) => {
			const freq_code = data.freq_code;
			state.main_code_interval_point_data[freq_code] = data.result;
		},
		ts_code_interval_point_data: (state, data) => {
			const freq_code = data.freq_code;
			state.ts_code_interval_point_data[freq_code] = data.result;
		},
		ts_code_interval_pure_holding_data_first_n: (state, data) => {
			state.ts_code_interval_pure_holding_data_first_n = data.result;
		},
		ts_code_interval_pure_volume_data: (state, data) => {
			state.ts_code_interval_pure_volume_data = data.result;
		},
	},
	actions: {
		main_code_interval_raise_fall_data(context, param) {
			// const start_date = new Date(param.data_date.getTime() - 3600 * 1000 * 24 * interval);
			
			const start_date = param.start_date;
			const end_date = param.end_date;
			const ts_code_list = param.ts_code_list;
			const freq_code = param.freq_code;
			
			ajax.post({
				url: 'summarize/main_code_interval_raise_fall_data',
				data: {
					// start_date: dateutil.dateFormat(param.data_date),
					
					start_date: dateutil.dateFormat(start_date),
					end_date: dateutil.dateFormat(end_date), 
					ts_code_list: ts_code_list,
					freq_code: freq_code
				},
				
			}).then((response) => {
				if (response.status === 200) {
					context.commit('main_code_interval_raise_fall_data', {result: response.data, freq_code: freq_code})
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		main_code_interval_point_data(context, param){
			const start_date = param.start_date;
			const end_date = param.end_date;
			const main_ts_code = param.ts_code;
			const freq_code = param.freq_code;
			
			ajax.post({
				url: 'point/main_code_interval_point_data',
				data: {
					start_date: dateutil.dateFormat(start_date),
					end_date: dateutil.dateFormat(end_date), 
					ts_code: main_ts_code,
					freq_code: freq_code
				},
				
			}).then((response) => {
				if (response.status === 200) {
					context.commit('main_code_interval_point_data', {result: response.data, freq_code: freq_code})
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		ts_code_interval_point_data(context, param){
			const start_date = param.start_date;
			const end_date = param.end_date;
			const ts_code = param.ts_code;
			const freq_code = param.freq_code;
			
			ajax.post({
				url: 'point/ts_code_interval_point_data',
				data: {
					start_date: dateutil.dateFormat(start_date),
					end_date: dateutil.dateFormat(end_date), 
					ts_code: ts_code,
					freq_code: freq_code
				},
				
			}).then((response) => {
				if (response.status === 200) {
					context.commit('ts_code_interval_point_data', {result: response.data, freq_code: freq_code})
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		ts_code_interval_pure_holding_data_first_n(context, param){
			const start_date = param.start_date;
			const end_date = param.end_date;
			const ts_code = param.ts_code;
			
			ajax.post({
				url: 'point/ts_code_interval_pure_holding_data_first_n',
				data: {
					start_date: dateutil.dateFormat(start_date),
					end_date: dateutil.dateFormat(end_date), 
					ts_code: ts_code
				},
				
			}).then((response) => {
				if (response.status === 200) {
					context.commit('ts_code_interval_pure_holding_data_first_n', {result: response.data})
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		ts_code_interval_pure_volume_data(context, param){
			const start_date = param.start_date;
			const end_date = param.end_date;
			const ts_code = param.ts_code;
			
			ajax.post({
				url: 'point/ts_code_interval_pure_volume_data',
				data: {
					start_date: dateutil.dateFormat(start_date),
					end_date: dateutil.dateFormat(end_date), 
					ts_code: ts_code
				},
				
			}).then((response) => {
				if (response.status === 200) {
					context.commit('ts_code_interval_pure_volume_data', {result: response.data})
				}
			}).catch((err) => {
				console.log(err)
			})
		}
	}
}
