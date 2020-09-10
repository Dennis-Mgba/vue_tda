<template>
    <div>
        <div>{{ remainingItem }} Item left</div>
    </div>
</template>

<script>
export default {
    name: 'todo-item-remaining',
    computed: {
        remainingItem() {
            return this.$store.getters.remaining
        }
    }
}
</script>