// import { aside_future_info } from '../../config.host.js';
import ajax from '../assets/ajax.js';

export default {
    namespaced: true,
    state: () => ({
        future_info_ori: {},
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        main_code_interval_raise_fall_data: {
            'D': [],
            'W': [],
            'M': []
        },
        main_code_interval_point_data: {
            'D': [],
            'W': [],
            'M': []
        },
        ts_code_interval_point_data: {
            'D': [],
            'W': [],
            'M': []
        },
        ts_code_interval_pure_holding_data_first_n: [],
        ts_code_interval_pure_volume_data: {},
        main_code_relative_close_point_data: {
            'D': [],
            'W': [],
            'M': []
        },
        contract_change_date_by_main_ts_code: [],
        note_data: [],
        bs_note_data: []
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
                        id_list_now.forEach(function (element) {
                            id_list.push(element);
                        });
                    }
                }
            }

            let future_info_new = [];
            add_symbol(state.future_info_ori, future_info_new, [])

            return future_info_new
        }
    },
    mutations: {
        set_future_info: (state, data) => {
            state.future_info_ori = data
        },
        main_code_interval_raise_fall_data: (state, data) => {
            const freq_code = data.freq_code;
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
        main_code_relative_close_point_data: (state, data) => {
            const freq_code = data.freq_code;
            state.main_code_relative_close_point_data[freq_code] = data.result;
        },
        contract_change_date_by_main_ts_code: (state, data) => {
            state.contract_change_date_by_main_ts_code = data.result;
        },
        note_data: (state, data) => {
            state.note_data = data.result;
        },
        bs_note_data: (state, data) => {
            state.bs_note_data = data.result;
        },
    },
    actions: {
        main_code_interval_raise_fall_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const ts_code_list = param.ts_code_list;
            const freq_code = param.freq_code;

            ajax.post({
                url: 'summarize/main_code_interval_raise_fall_data',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    ts_code_list: ts_code_list,
                    freq_code: freq_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('main_code_interval_raise_fall_data', {
                        result: response.data,
                        freq_code: freq_code
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        main_code_interval_point_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const main_ts_code = param.ts_code;
            const freq_code = param.freq_code;

            ajax.post({
                url: 'point/main_code_interval_point_data',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    ts_code: main_ts_code,
                    freq_code: freq_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('main_code_interval_point_data', {
                        result: response.data,
                        freq_code: freq_code
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        ts_code_interval_point_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const ts_code = param.ts_code;
            const freq_code = param.freq_code;

            ajax.post({
                url: 'point/ts_code_interval_point_data',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    ts_code: ts_code,
                    freq_code: freq_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('ts_code_interval_point_data', {
                        result: response.data,
                        freq_code: freq_code
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        ts_code_interval_pure_holding_data_first_n(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const ts_code = param.ts_code;

            ajax.post({
                url: 'point/ts_code_interval_pure_holding_data_first_n',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    ts_code: ts_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('ts_code_interval_pure_holding_data_first_n', {
                        result: response.data
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        ts_code_interval_pure_volume_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const ts_code = param.ts_code;

            ajax.post({
                url: 'point/ts_code_interval_pure_volume_data',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    ts_code: ts_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('ts_code_interval_pure_volume_data', {
                        result: response.data
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        main_code_relative_close_point_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const ts_code_list = param.ts_code_list;
            const freq_code = param.freq_code;

            ajax.post({
                url: 'summarize/main_code_relative_close_point_data',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    ts_code_list: ts_code_list,
                    freq_code: freq_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('main_code_relative_close_point_data', {
                        result: response.data,
                        freq_code: freq_code
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        contract_change_date_by_main_ts_code(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const main_ts_code = param.main_ts_code;

            ajax.post({
                url: 'symbol/get_contract_change_date_by_main_ts_code',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    main_ts_code: main_ts_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('contract_change_date_by_main_ts_code', {
                        result: response.data
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        note_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const main_ts_code = param.main_ts_code;

            ajax.post({
                url: 'note/get_note',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    main_ts_code: main_ts_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('note_data', {
                        result: response.data
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        bs_note_data(context, param) {
            const start_date = param.start_date;
            const end_date = param.end_date;
            const main_ts_code = param.main_ts_code;

            ajax.post({
                url: 'note/get_bs_note',
                data: {
                    start_date: start_date.format('YYYY-MM-DD'),
                    end_date: end_date.format('YYYY-MM-DD'),
                    main_ts_code: main_ts_code
                },

            }).then((response) => {
                if (response.status === 200) {
                    context.commit('bs_note_data', {
                        result: response.data
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
