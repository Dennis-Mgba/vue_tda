<template>
    <div>
        <label><input type="checkbox" :checked="!anyRemaining" @change="checkAll"> mark all</label>
    </div>
</template>

<script>
export default {
    name: 'todo-check-all',
    computed: {
        anyRemaining() {
            return this.$store.getters.anyRemaining
        }
    },

    methods: {
        checkAll() {
            this.$store.commit('checkAllTodos', event.target.checked)
        }
    }
}
</script>