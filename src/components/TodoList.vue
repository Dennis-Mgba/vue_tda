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
            <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> mark all</label></div>
            <div>{{ remaining }} Item left</div>
        </div>
        
        <div class="extra-container">
            <div>
                <button :class="{ active: filter == 'all' }" @click="filter = 'all' " >All</button>
                <button :class="{ active: filter == 'active' }" @click="filter = 'active' " >Active</button>
                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed' " >Completed</button>
            </div>
            <div>
                <transition name="fade">
                    <button v-if="ShowClearCompletedButton" @click="clearCompleted" class="clear-complete">Clear Completed</button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
    name: 'TodoList',

    components: {
        TodoItem
    },

    data() {
        return {
            newTodo: '',
            manualId: 4,
            beforeEditCache: '',
            filter: 'all',
            todos: [
                {
                    'id': 1,
                    'title': 'Finish learning vue from a tutorial',
                    'completed': false,
                    'editing': false
                },
                 {
                    'id': 2,
                    'title': 'Practice out what I learned',
                    'completed': false,
                    'editing': false
                },
                 {
                    'id': 3,
                    'title': 'Try out building an api of todos',
                    'completed': false,
                    'editing': false
                }
            ]
        }
    },

    created() {
        eventBus.$on('removeTodoItem', (index) => this.removeTodo(index))
        eventBus.$on('finishedEdit', (data) => this.updateTodosData(data))
    },

    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length
        },

        anyRemaining() {
            return this.remaining != 0
        },

        todosFiltered() {
            if (this.filter == 'all') {
                return this.todos
            } else if (this.filter == 'active') {
                // active are the todos tha are not yet completed ye?
                return this.todos.filter(todo => !todo.completed)
            } else if (this.filter == 'completed') {
                return this.todos.filter(todo => todo.completed)
            }

            return this.todos   // this is for the default case
        },

    ShowClearCompletedButton() {
        return this.todos.filter(todo => todo.completed).length > 0 // this will show once there presence of a marked completed item
        }
    },

    methods: {
        addNewTodo() {
            if (this.newTodo.trim().length === 0) {    // prevent empty input string from been added
                return
            }

            this.todos.push({
                id: this.manualId,
                title: this.newTodo,
                completed: false
            });

            this.newTodo = '';
            this.manualId++
        },

        removeTodo(index) {
            this.todos.splice(index, 1)
        },

        checkAllTodos() {
            this.todos.forEach( (todo) => todo.completed = event.target.checked)
        },

        clearCompleted() {
            // grab the todos array and set it to all the items that is not complteted
            this.todos = this.todos.filter(todo => !todo.completed)
        },

        updateTodosData(data) {  // data received from the event
            this.todos.splice(data.index, 1, data.todo)
        }
    }
}
</script>

<style lang="scss" scoped>
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