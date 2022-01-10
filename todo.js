update=()=>{
    let tbdy=document.querySelector("#tbodyfield");
    let thead=document.querySelector("#theadfield");
    if(localStorage.getItem("tasks")==null || JSON.parse(localStorage.getItem("tasks"))[0]==undefined)
    {
        document.getElementById("tempDisplay").style.visibility="visible";
        console.log("No Tasks available");
        document.querySelector("#clrListBtn").disabled=true;
    }
    else{
    document.getElementById("tempDisplay").style.visibility = "hidden";
    
    let tasksArrstr=localStorage.getItem("tasks");
    let tasksArr=JSON.parse(tasksArrstr);

    thead.innerHTML=`<tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">DELETE ?</th>
        </tr>
        `
    
    tbdy.innerHTML="";
    tasksArr.forEach((element,index) => {
        tbdy.innerHTML+=`<tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">DELETE</button></td>
        </tr>`;
        
    });}
}

addAndUpdate=()=>{

    let task=document.getElementById("task");
    let desc=document.getElementById("desc");

    if(task.value=="" || desc.value=="")
    {alert("Enter Title and description");}
    else{
    let tasksArrstr=localStorage.getItem("tasks");
    let tasksArr=JSON.parse(tasksArrstr);
    
    tasksArr.push([task.value,desc.value]);

    tasksArrstr=JSON.stringify(tasksArr);
    localStorage.setItem("tasks",tasksArrstr);
    document.querySelector("#clrListBtn").disabled=false;
    }
    update();
}

deleteTask=(index)=>{

    let tasksArrstr=localStorage.getItem("tasks");
    let tasksArr=JSON.parse(tasksArrstr);

    if(index==0){
        console.log("Inside 1");
        tasksArr.pop();
        localStorage.setItem("tasks",JSON.stringify(tasksArr));
        location.reload();
    }
    else{
    console.log("Before slicing at index "+index+" : ",tasksArr);
    tasksArr.splice(index,1)
    console.log("after slicing at index "+index+" : ",tasksArr);
    console.log(index);
    localStorage.setItem("tasks",JSON.stringify(tasksArr));
    update();
    }  
}

clearTaskList=()=>{
    if(confirm("Do you want to Clear the task list?") == true)
    {
        localStorage.setItem("tasks","[]");
        location.reload();
        
    }
    else{
        alert("cancelled!");
    }
}

if(localStorage.getItem("tasks")==null)
    {
        document.getElementById("tempDisplay").style.visibility="visible";
        localStorage.setItem("tasks","[]");
        console.log("TASKS ARRAY CREATED IN LOCALSTORAGE");
        document.querySelector("#clrListBtn").disabled=true;
    }
else{update();}



