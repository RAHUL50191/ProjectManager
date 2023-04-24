// - - - - - - - - > FOR Task < - - - - - - - -

const task_name = document.getElementById("task_name");
const task_hours = document.getElementById("task_hours");

const ul = document.getElementById("task_ul");
const searchFormInput = document.querySelector("form.search input");
const user_task_select = document.getElementById("user_task_select");

let NODE_COUNT = 0;

//ADD NEW TASK to list
const handleAddItem = (inputTaskName, inputTaskHours) => {
  NODE_COUNT += 1;
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>${NODE_COUNT}</div>
        <div>${inputTaskHours} hour</div>
        <div>${inputTaskName}</div>
        <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  ul.innerHTML += html;
};

const addtask = (e) => {
  if (!task_hours.value || !task_name.value) return alert("add all values");
  handleAddItem(task_name.value, task_hours.value);
};

//REMOVE Task from list
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
  NODE_COUNT--;
});

// clear tasks from list
const clearTask = () => {
  ul.innerHTML = "";
  user_task_select.value = null;
  NODE_COUNT = 0;
};

// - - - - - - - - > For Relationship < - - - - - - - -

const node_id = document.getElementById("node_id");
const node_time = document.getElementById("node_time");
const start_node = document.getElementById("start_node");
const end_node = document.getElementById("end_node");

const relationshipUL = document.getElementById("relationship_ul");

//ADD NEW TASK to list
const handleAddRelationship = (inputTaskName, inputTaskHours) => {
  const html = `
    <li class="relationship-list-group-item d-flex justify-content-between align-items-center">
        <div class="relationship_list_node_id">${node_id.value}</div>
        <div class="relationship_list_node_time">${node_time.value}</div>
        <div class="relationship_list_start_node">${start_node.value}</div>
        <div class="relationship_list_end_node">${end_node.value}</div>
        <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  relationshipUL.innerHTML += html;
};

const addRelationship = (e) => {
  if (!node_id.value || !node_time.value || !start_node.value || !end_node.value) return alert("add all values");
  handleAddRelationship(task_name.value, task_hours.value);
};

//REMOVE Task from list
relationshipUL.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// clear tasks from list
const clearRelationship = () => {
  clearRelationship.innerHTML = "";
  user_task_select.value = null;
};

// - - - - - - - - > For Graph < - - - - - - - -

const createGraph = (e) => {
  if (!user_task_select.value) return alert("Choose Task");

  const taskArr = [];
  const relationshipArr = [];
  const taskArrTopo = [];
  const relationshipArrTopo = [];
  const resultTopo = [];
  const resultRelationTopo = [];

  const taskListGroupItems = document.querySelectorAll(".list-group-item"); // get all li
  const relationshipListGroupItems = document.querySelectorAll(".relationship-list-group-item"); // get all li

  // create promise
  let myPromise = new Promise(function (myResolve, myReject) {
    // "Producing Code" (May take some time)

    // loop through task li
    taskListGroupItems.forEach((item, index) => {
      const taskId = item.children[0].innerText;
      const taskHours = item.children[1].innerText;
      const taskName = item.children[2].innerText;

      console.log("Name is:" + taskName + " " + "hours is:" + taskHours);

      // push to taskArr
      taskArr.push({
        id: (index + 1).toString(),
        labels: [taskName],
        properties: {
          value: taskName,
          hours: taskHours,
        },
      });
    });

    // loop through relationship li
    relationshipListGroupItems.forEach((item, index) => {
      const input_node_id = item.children[0].innerText;
      const input_node_time = item.children[1].innerText;
      const input_start_node = item.children[2].innerText;
      const input_end_node = item.children[3].innerText;

      // console.log(input_node_id + " " + input_node_time + " " + input_start_node + " " + input_end_node);

      // push to taskArr
      relationshipArr.push({
        id: input_node_id.toString(),
        type: `${input_node_time}hours`,
        startNode: input_start_node.toString(),
        endNode: input_end_node.toString(),
        properties: {},
      });
    });
    //-------------------------------------------------------------------------------------------//
    //TOPOLOGY SORT

    // Javascript for the above approach

    // This class represents a directed graph
    // using adjacency list representation

    //DEFINING ARR WITH USER INPUT TASKNAME & HOURS
    taskListGroupItems.forEach((item, index) => {
      const taskName = item.children[2].innerText;
      const taskHours = item.children[1].innerText;

      // console.log(taskName + " " + taskHours);

      // push to taskArr
      taskArrTopo.push({
        name: taskName,
        hours: taskHours,
      });
    });

    //DEFINING RELATION ARR WHICH USED FOR LOOP-INPUTING EDGE IN TOPO GRAPH//g.addEdge(5, 2);
    relationshipListGroupItems.forEach((item, index) => {
      const input_start_node = item.children[2].innerText;
      const input_end_node = item.children[3].innerText;

      // push to taskArr
      relationshipArrTopo.push({
        startNode: Number(input_start_node),
        endNode: Number(input_end_node),
        // time: Number(input_node_time),
      });
    });

    console.log("taskArrTopo:" + taskArrTopo);
    console.log("relationshipArrTopo" + relationshipArrTopo);
    class Graph {
      // Constructor
      constructor(v) {
        // Number of vertices
        this.V = v;

        // Adjacency List as ArrayList of ArrayList's
        this.adj = new Array(this.V);
        for (let i = 0; i < this.V; i += 1) {
          this.adj[i] = new Array();
        }
      }
      ///ERROR PUSH HERE---------------------💥💥
      // Function to add an edge into the graph
      addEdge(v, w) {}
      //   this.adj[v].push(w);
      // }

      // A recursive function used by topologicalSort
      topologicalSortUtil(v, visited, stack) {
        // Mark the current node as visited.
        visited[v] = true;
        let i = 0;

        // Recur for all the vertices adjacent
        // to thisvertex
        for (i = 0; i < this.adj[v].length; i++) {
          if (!visited[this.adj[v][i]]) {
            this.topologicalSortUtil(this.adj[v][i], visited, stack);
          }
        }

        // Push current vertex to stack
        // which stores result
        stack.push(v);
      }

      // The function to do Topological Sort.
      // It uses recursive topologicalSortUtil()
      topologicalSort() {
        let stack = new Array();

        // Mark all the vertices as not visited
        let visited = new Array(this.V);
        for (let i = 0; i < this.V; i++) {
          visited[i] = false;
        }

        // Call the recursive helper
        // function to store
        // Topological Sort starting
        // from all vertices one by one
        for (let i = 0; i < this.V; i++) {
          if (visited[i] == false) {
            this.topologicalSortUtil(i, visited, stack);
          }
        }

        // result set to arr contents of stack
        while (stack.length != 0) {
          let index = stack.pop();
          resultTopo.push({
            id: (index + 1).toString(),
            labels: [taskArrTopo[index].name],
            properties: {
              name: taskArrTopo[index].name,
              hours: taskArrTopo[index].hours,
            },
          });
        }
      }
    }

    // Driver Code
    var g = new Graph(taskArrTopo.length);
    relationshipArrTopo.forEach((item, index) => {
      g.addEdge(item.start_node, item.end_node);
    });
    // console.log("Following is a Topological sort of the given graph");

    // Function Call
    g.topologicalSort();
    //0->1 ,1->2, 2->3 ,3->4
    for (i = 0; i < resultTopo.length - 1; i++) {
      resultRelationTopo.push({
        id: resultTopo[i].id,
        type: resultTopo[i].properties.hours,
        properties: {},
        startNode: resultTopo[i].id,
        endNode: resultTopo[i + 1].id,
      });
    }
    // 2->3->1 , 1->2->0
    console.log("resultRelationTopo" + resultRelationTopo);
    myResolve(); // when successful
    myReject(); // when error
  });

  // "Consuming Code" (Must wait for a fulfilled Promise)
  myPromise.then(
    function (value) {
      console.log(taskArr);
      console.log(relationshipArr);

      fetch("http://localhost:5000/add-json", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArr: taskArr,
          relationshipArr: relationshipArr,
          taskTitle: user_task_select.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      // window.location.href = 'http://localhost:5500/graphPage.html'
    },
    function (error) {
      alert(error);
    }
  );
  //  TOPOLOGY SORT AND THEN MAKE IT NEW TOPOLOGYarr & TOPOLOGYrelation
  myPromise.then(
    function (value) {
      // console.log("taskArrTopo:" + taskArrTopo);
      // console.log("relationshipArrTopo" + relationshipArrTopo);

      fetch("http://localhost:5000/add-json-topology", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArrTopo: taskArrTopo,
          relationshipArrTopo: relationshipArrTopo, //user inputed relations between nodes
          resultTopo: resultTopo, //topology generated relation/result indexArr
          resultRelationTopo: resultRelationTopo, //single edge

          taskTitle: user_task_select.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      // window.location.href = 'http://localhost:5500/graphPage.html'
    },
    function (error) {
      alert(error);
    }
  );
};
