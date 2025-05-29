import { useSession } from "next-auth/react";
import { title } from "process";
import React, { useEffect, useState } from "react";

enum Tabs {
  AddTodo = "Add Todo",
  MyTodo = "My Todo",
}

interface AddTodoI {
  title: string;
  description: string;
}

interface MyTodosI {
  description: string;
  email: string;
  status: string;
  title: string;
  _id: string;
}

const Todo = () => {
  const { data: userData, status } = useSession();
  const [selectedTab, setSelectedTab] = useState(Tabs.AddTodo);
  const [addTodo, setAddTodo] = useState<AddTodoI>({} as AddTodoI);
  const [pending, setPending] = useState<boolean>(false);
  const [myTodos, setMyTodos] = useState<MyTodosI[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodo({ ...addTodo, [e.target.name]: e.target.value });
  };

  const fetchTodo = async () => {
    if (status === "authenticated") {
      const result = await fetch(`/api/todo?email=${userData?.user?.email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      setMyTodos(data?.data);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPending(true);
      const result = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: addTodo?.title,
          description: addTodo?.description,
          email: userData?.user?.email,
        }),
      });
      const data = await result.json();
      if (result.ok) {
        console.log("Added todo");
        // fetch todos
      } else if (data.status === 400) {
        console.log(data.message);
      } else if (data.status === 500) {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong");
      setPending(false);
    }
  };

  return (
    <div className="todo-container">
      <div className="tabContainer">
        <button
          className={`tab-btn ${
            selectedTab === Tabs.AddTodo ? "selected-tab" : ""
          }`}
          onClick={() => setSelectedTab(Tabs.AddTodo)}
        >
          {Tabs.AddTodo}
        </button>
        <button
          className={`tab-btn ${
            selectedTab === Tabs.MyTodo ? "selected-tab" : ""
          }`}
          onClick={() => {
            setSelectedTab(Tabs.MyTodo);
            fetchTodo();
          }}
        >
          {Tabs.MyTodo}
        </button>
      </div>
      {selectedTab === Tabs.AddTodo && (
        <div className="add-todo box">
          <p className="tab-title">Add Todo</p>
          <form>
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                className="form-input"
                value={addTodo?.title}
                onChange={handleInputChange}
                disabled={pending}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                className="form-input"
                value={addTodo?.description}
                onChange={handleInputChange}
                disabled={pending}
              />
            </div>
            <button className="submit-btn" onClick={handleAddTodo}>
              + Add
            </button>
          </form>
        </div>
      )}
      {selectedTab === Tabs.MyTodo && (
        <div className="my-todo box">
          <p className="tab-title">My Todo</p>
          <div>
            {myTodos?.map((todo: MyTodosI) => {
              return (
                <div key={todo._id}>
                  <h5>{todo.title}</h5>
                  <p>{todo.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
