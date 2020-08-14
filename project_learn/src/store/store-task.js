import { stat } from "fs"

const state = {
    tasks: [{
            id: 1,
            name: 'go to shop',
            completed: false,
            dueDate: '2019/05/02',
            dueTime: '14.20'
        },
        {
            id: 1,
            name: 'go to apple',
            completed: false,
            dueDate: '2018/03/12',
            dueTime: '11.30'
        },
        {
            id: 1,
            name: 'go to banana',
            completed: false,
            dueDate: '2020/09/12',
            dueTime: '15.30'
        }




    ]
}
const mutations = {

}

const actions = {


}

const getters = {
    tasks: (state) => {
        return state.tasks
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}