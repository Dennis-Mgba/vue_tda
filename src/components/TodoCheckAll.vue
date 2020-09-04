<template>
    <div>
        <label><input type="checkbox" :checked="!anyRemaining" @change="checkAll"> mark all</label>
    </div>
</template>

<script>
export default {
    name: 'todo-check-all',
    props: {
        anyRemaining: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        checkAll() {
            eventBus.$emit('allChecked', this.anyRemaining)
        }
    }
}
</script>