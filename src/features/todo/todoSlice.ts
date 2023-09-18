import { createSlice } from "@reduxjs/toolkit";

type Priority = "high" | "middle" | "low";

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}

interface TodoState {
  todos: TodoItem[];
}

const initialState: TodoState = {
  todos: [
    {
      id: 1,
      title: "吃饭",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "睡觉",
      priority: "middle",
      completed: false,
    },
  ],
};

let nextTodoId = 10;

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const {
        title,
        priority = "high",
        id = nextTodoId++,
        completed = false,
      } = action.payload;
      let newTodo = { id, title, completed, priority };
      if (newTodo.priority === "high") {
        state.todos.unshift(newTodo);
      } else {
        const idx = state.todos.findIndex((item) => item.priority === priority);
        if (idx === -1) {
          state.todos.push(newTodo);
        } else {
          state.todos.splice(idx, 0, newTodo);
        }
      }
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      state.todos.forEach((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
      });
    },
    removeTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((item) => item.id !== id);
    },
    updateTodo: (state, action) => {
      const { id, title, completed, priority } = action.payload;
      const todo = state.todos.find((item) => item.id === id);
      todo!.completed = completed;
      todo!.title = title;
      todo!.priority = priority;
      let highTodos: TodoItem[] = [];
      let middleTodos: TodoItem[] = [];
      let lowTodos: TodoItem[] = [];
      state.todos.forEach((todo) => {
        if (todo.priority === "high") {
          highTodos.push(todo);
        }
        if (todo.priority === "middle") {
          middleTodos.push(todo);
        }
        if (todo.priority === "low") {
          lowTodos.push(todo);
        }
      });
      state.todos = highTodos.concat(middleTodos).concat(lowTodos);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
