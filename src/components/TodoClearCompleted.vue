<template>
    <div>
        <button v-if="showClearCompletedButton" @click="clearCompleted" class="clear-complete">Clear Completed</button>
    </div>
</template>

<script>
export default {
    name: 'todo-clear-completed',
    computed: {
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton
        }
    },

    methods: {
        clearCompleted() {
            this.$store.dispatch('clearCompleted')
        }
    }
}
</script>
