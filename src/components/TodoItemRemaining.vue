<template>
    <div>
        <div>{{ remainingItem }} Item left</div>
    </div>
</template>

<script>
export default {
    name: 'todo-item-remaining',
    props: {
        remainingItem: {
            type: Number,
            required: true
        }
    }
}
</script>