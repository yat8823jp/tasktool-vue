import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )
const store = new Vuex.Store ( {
	state: {
		//タスク初期ステート
		tasks: [
			{
				id: 1,
				name: '牛乳を買う',
				labelIds: [ 1, 2 ],
				done: false
			},
			{
				id: 2,
				name: 'Vue.js の本を買う',
				labelIds: [ 1, 3 ],
				done: true
			}
		],
		//ラベル初期ステート
		labels: [
			{
				id: 1,
				text: '買い物'
			},
			{
				id: 2,
				text: '食料'
			},
			{
				id: 3,
				text: '本'
			}
		],
		//次に追加するタスク、ラベルのID
		//実際のアプリではサーバーで生成したり、UUID を使ったりするがここでは決め打ち
		nextTaskId: 3,
		nextLabelId: 4,
		//フィルタするラベルの ID
		filter: null
	},
	getters: {
		//フィルタ後のタスクを返す
		filterTasks( state ) {
			//ラベルが選択されていなければそのままの一覧を返す
			if( ! state.filter ) {
				return state.stasks
			}
			return state.tasks.filter( task => {
				return task.labelIds.indexOf( state.filter ) >= 0
			} )
		}
	},
	mutations: {
		//タスクを追加する
		addTask( state, { name, labelIds } ) {
			state.tasks.push( {
				id: state.nextTaskId,
				name,
				labelIds,
				done: false
			} )
			//次に追加されるタスクに付与する ID を更新する
			state.nextTaskId++
		},
		//タスクの完了状態を変更する
		toggleTaskStatus( state, { id } ) {
			const filtered = state.tasks.filter( task => {
				return task.id === id
			} )
			filtered.forEach( task => {
				task.done = ! task.done
			} )
		},
		//ラベルを追加する
		addLabel( state, { text } ) {
			state.labels.push( {
				id: store.nextLabelId,
				text
			} )
			//次に追加されるラベルに付与する ID を更新
			state.nextLabelId++
		},
		changeFilter( state, { filter } ) {
			state.filter = filter
		}
	},
} )

export default store
