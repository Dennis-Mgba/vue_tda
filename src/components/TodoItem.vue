<template>
    <div>
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">

            <div v-if="!editing" @dblclick="editMode" :class="{ completed : completed }">
                <p>{{ title }}</p>
            </div>

            <input v-else type="text" class="edit-input" 
            v-model="title" 
            @blur="doneEdit"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEditMode"
            v-focus
            >

        </div>
        <div class="remove-item" @click="removeTodo(index)">
            &times;
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',

    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': ''
        }
    },

    watch: {
        checkAll() {
            // if (this.checkAll) {
            //     this.completed = true
            // } else {
            //     this.completed = this.todo.completed
            // }
            this.completed = this.checkAll ? true : this.todo.completed
        }
    },

    directives: {
    focus: {
        inserted: function (el) {
            el.focus()
            }
        }
    },

    methods: {
        removeTodo(id) {
            const index = this.$store.state.todos.findIndex(item => item.id == id) + 1;
            this.$store.state.todos.splice(index, 1)
        },

        editMode() {
            this.beforeEditCache = this.title
            this.editing = true
        },

        doneEdit(id) {
            if (this.title.trim() == '') {  
                this.title = this.beforeEditCache
            }
            this.editing = false

           const index = this.$store.state.todos.findIndex(item => item.id == this.id);
            this.$store.state.todos.splice(index, 1, {
                'id': this.id,
                'title': this.title,
                'completed': this.completed,
                'editing': this.editing
            })
        },

        cancelEditMode() {
            this.title = this.beforeEditCache 
            this.editing = false
        },
    }
}
</script>

<style lang="scss">
.remove-item {
    cursor: pointer;
    margin-left: 14px;
    font-weight: bold;

    &:hover {
        color: red;
    }
}

// new
.todo-item-left p {
    font-size: 18px;
}

.todo-item-left {
    display: flex;
    width: 90%;
}

.todo-item-left input {
    margin-top: 20px;
}


.edit-input {
    color: #737373;
    font-size: 16px;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #a6a6a6;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
        outline: none;
    }
}

.completed {
    text-decoration: line-through;
    color: #b3b3b3;
}
</style>