<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done"
        v-model="newTodo"
        v-on:keyup.enter="addNewTodo"
        >

        <transition-group name="fade" enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutDown">
            <TodoItem class="todo-item" 
            v-for="(todo, index) in todosFiltered" :key="todo.id" 
            :todo="todo" :index="index"
            :checkAll="!anyRemaining"
            >
            </TodoItem>
        </transition-group>

        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-item-remaining :remainingItem="remaining"></todo-item-remaining>
        </div>
        
        <div class="extra-container">
            <todo-filtered></todo-filtered>
            <div>
                <transition name="fade">
                    <todo-clear-completed></todo-clear-completed>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import TodoItemRemaining from './TodoItemRemaining.vue'
import TodoCheckAll from './TodoCheckAll.vue'
import TodoFiltered from './TodoFiltered.vue'
import TodoClearCompleted from './TodoClearCompleted.vue'

export default {
    name: 'TodoList',

    components: {
        TodoItem,
        TodoItemRemaining,
        TodoCheckAll,
        TodoFiltered,
        TodoClearCompleted
    },

    data() {
        return {
            newTodo: '',
            manualId: 4,
            beforeEditCache: '',
            // newTodo: {
            //     id: this.manualId,
            //     title: '',
            //     completed: false,
            //     editing: false
            // }
        }
    },

    computed: {
        remaining() { 
            return this.$store.getters.remaining
        },

        anyRemaining() {
            return this.$store.getters.anyRemaining
        },

        todosFiltered() {
            return this.$store.getters.todosFiltered
        },

        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton
        }
    },

    methods: {
        addNewTodo() {
            if (this.newTodo.trim().length === 0) {    // prevent empty input string from been added
                return
            }

            // the commit takes in two parameters - 1. a name 2. the payload
            // this.$store.commit('addTodo', newTodo);
            this.$store.commit('addTodo', {
                id: this.manualId,
                title: this.newTodo,
            });

            // this.$store.state.todos.push({
            //     id: this.manualId,
            //     title: this.newTodo,
            //     completed: false
            // });

            this.newTodo = '';
            this.manualId++;
        }
    }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css");

.todo-input, .edit-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;

    &:focus {
        outline: 0;
    }
}

.todo-input::placeholder {
    color: #d9d9d9;
}

.todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    animation-duration: 0.3s;
}

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid #999999;
    padding-top: 14px;
    margin-bottom: 14px;
}

button {
    font-size: 12px;
    background-color: white;
    appearance: none;
    border: 1px solid grey;
    border-radius: 3px;
    margin-right: 5px;

    &:hover {
        background: lightgreen;
    }

    &:focus {
        outline: none;
    }
}

.active {
    background: #5cd65c;
    color: #fff;
}

.clear-complete {
    background-color: #ff4d4d;
    color: #fff;

    &:hover {
        background: #ff8080;
    }
}

// Css Transitions
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>