import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./App.css";
import { Table } from "./Component/table";

const fields = ["Task Id", "Title", "Status", "Action"];

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState();
  const [taskId, setTaskId] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);

  //fetch data
  const CreateTasks = async () => {
    setLoading(true);
    const body = {
      TaskId: taskId,
      Title: title,
      Status: "Pending",
    };
    await axios.post(`http://localhost:3001/api/create`, body).then((res) => {
      setLoading(false);
      window.alert("Task Created");
      window.location.reload();
    });
  };

  //fetch data
  const fetchTasks = async () => {
    await axios.get(`http://localhost:3001/api/getAll`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const deleteTasks = async (id) => {
    window.confirm("Are you sure you want to delete this task?");
    setLoading(true);
    await axios.delete(`http://localhost:3001/api/delete/${id}`).then((res) => {
      window.alert("Task deleted");
      window.location.reload();
    });
    setLoading(false);
  };

  const updateTasks = async (id, Status) => {
    setLoading(true);
    const body = {
      id: id,
      Status: Status,
    };
    await axios.put(`http://localhost:3001/api/update`, body).then((res) => {
      window.alert("Task updated");
    });
    setLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    fetchTasks();
  }, [loading]);

  const renderOrderHead = (item, index) => (
    <th scope="col" className="px-6 py-3 " key={index}>
      {item}
    </th>
  );

  const renderOrderBody = (item, index) => (
    <tr className="bg-white border-b  hover:bg-gray-50" key={item._id}>
      <td className="px-6 py-4 font-medium text-gray-600   hover:text-gray-300">
        {item.TaskId}
      </td>
      <td className="px-6 py-4 font-medium text-gray-600   hover:text-gray-300">
        {item.Title}
      </td>
      <td className="px-6 py-4 font-medium text-gray-600   hover:text-gray-300">
        {item.Status === "Pending" ? (
          <select onChange={() => updateTasks(item._id, "Completed")}>
            <option>Pending</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          <select onChange={() => updateTasks(item._id, "Pending")}>
            <option>Completed</option>
            <option value="Pending">Pending</option>
          </select>
        )}
      </td>
      <td className="px-6 py-4 font-medium text-gray-600   hover:text-gray-300">
        <button
          className="bg-red-300 py-3 px-5 rounded"
          onClick={() => deleteTasks(item._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );

  if (loading) {
    return "loading...";
  }

  return (
    <div className="grid grid-rows-1 gap-2">
      <div className="p-10">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          id="taskId"
          placeholder="taskId"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        &nbsp;
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        &nbsp; &nbsp;
        <button className="bg-blue-300 py-3 px-5 rounded" onClick={CreateTasks}>
          Create
        </button>
      </div>
      <div className="p-3">
        <Table
          limit="5"
          headData={fields}
          renderHead={(item, index) => renderOrderHead(item, index)}
          bodyData={data}
          renderBody={(item, index) => renderOrderBody(item, index)}
        />
      </div>
    </div>
  );
}

export default App;
