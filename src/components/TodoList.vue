<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done"
        v-model="newTodo"
        v-on:keyup.enter="addNewTodo"
        >
        <transition-group name="fade" enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutDown">

            <div v-for="(todo, index) in todosFiltered" v-bind:key="todo.id" class="todo-item">
                <div class="todo-item-left">
                    <input type="checkbox" v-model="todo.completed">

                    <div v-if="!todo.editing" @dblclick="editTodo(todo)" :class="{ completed : todo.completed }"><p>{{ todo.title }}</p></div>

                    <input v-else type="text" class="edit-input" 
                    v-model="todo.title" 
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.esc="cancelEdit(todo)"
                    v-focus
                    >
                </div>
                <div class="remove-item" @click="removeTodo(index)">
                    &times;
                </div>
            </div>
            
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
export default {
    name: 'TodoList',
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

    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
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

        editTodo(todo) {
            this.beforeEditCache = todo.title
            todo.editing = true
        },

        doneEdit(todo) {
            if (todo.title.trim() == '') {    // prevent empty input string from been added
                todo.title = this.beforeEditCache
            }
            todo.editing = false
        },

        cancelEdit(todo) {
            todo.title = this.beforeEditCache   // beforeEditCache is a method 
            todo.editing = false
        },

        checkAllTodos() {
            this.todos.forEach( (todo) => todo.completed = event.target.checked)
        },

        clearCompleted() {
            // grab the todos array and set it to all the items that is not complteted
            this.todos = this.todos.filter(todo => !todo.completed)
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
    background-color: #ff6666;
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