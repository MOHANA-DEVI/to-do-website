document.addEventListener("DOMContentLoaded",()=>{
    const storeditem=JSON.parse(localStorage.getItem('task'));
    if(storeditem ){
        storeditem.forEach((tasks)=>task.push(tasks))
        updatetasklist();
        updatestats();
    }
})
let task = [];

const savetask=()=>{
    localStorage.setItem('task',JSON.stringify(task))
}
  

const totogglethechange= (index)=>{
    task[index].completed= !task[index].completed;
    updatetasklist();
    updatestats();
     savetask();
}

const deletetask=(index)=>{
    task.splice(index);
    updatetasklist();
    updatestats();
     savetask();

}

const edittask=(index)=>{
    const taskinput= document.getElementById("textcontent")
    taskinput.value=task[index].text;
    task.splice(index);
    updatetasklist();
    updatestats();
     savetask();

}
const updatestats = () => {
    const completetasks = task.filter(t => t.completed).length;
    const totallength = task.length;

    const progress = totallength === 0 
        ? 0 
        : (completetasks / totallength) * 100;

    const progressbar = document.querySelector('.progress');
    const number = document.getElementById('number');

    progressbar.style.width = `${progress}%`;
    document.getElementById("number").textContent = `${completetasks}/${totallength}`;

};


const updatetasklist = () => {
    const tasklist = document.querySelector(".task_items");
    tasklist.innerHTML = "";

    task.forEach((tasks, index) => {
        const listitem = document.createElement("li");

        listitem.innerHTML = `
        <div class="taskitem">
            <div class="tasks ${tasks.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${tasks.completed ? "checked" : ""}>
                <p>${tasks.text}</p>
            </div>
            <div class="icons">
                <button id="editbutton" onclick="edittask(${index})">edit</button>
                <button id="deletebutton" onclick="deletetask(${index})">delete</button>
            </div>
        </div>
        `;

      listitem.addEventListener('change',()=> totogglethechange(index));
        tasklist.appendChild(listitem);
    });
};

const add_task = () => {
    const taskinput = document.getElementById("textcontent");
    const text = taskinput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskinput.value = "";
        updatetasklist();
    }
    updatetasklist();
    updatestats ();
    savetask();
};

const newtask = document.getElementById("addtask");
newtask.addEventListener("click", (e) => {
    e.preventDefault();
    add_task();
});
