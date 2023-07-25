import { defineStore } from 'pinia'
import { ref } from 'vue'

 export default  defineStore('forumstore', {
    state: () => {
        return {

            search: Function,
            key : "key"
        }
    }
})