import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const filePath = path.resolve("todo.json");
const command = process.argv.slice(2);

if (command[0] === "add") {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("There is an error:", err);
            return;
        }

        const fileData = data.toString("utf-8"); // Remove trailing whitespace
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question("What todo do you want to add?\n", (response) => {
            rl.close();
            const todoObj = JSON.parse(fileData);

            todoObj.push(response + " - not done");

            const updatedData = JSON.stringify(todoObj);

            fs.writeFile(filePath, updatedData, (textErr) => {
                if (textErr) {
                    console.error("There is an error:", textErr);
                } else {
                    console.log("Todo added successfully.");
                }
            });
        });
    });
} else if (command[0] == "update") {
    fs.readFile(filePath, (err, data) => {
        if (err !== null) {
            console.log("There is a error");
            return
        }

        const fileData = data.toString("utf-8")
        const todoObj = JSON.parse(fileData)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question("what index?\n", (index) => {
            rl.question("what is the updated text?\n", (upResponse) => {

                todoObj[+index] = upResponse + " - not done"
                rl.close()
                const updatedData = JSON.stringify(todoObj)
                fs.writeFile(filePath, updatedData, (err) => {
                    if (err) console.log("There is a error");
                    else console.log("data updated successfuly");
                })
            })
        })

    })
}
if(command[0] == "read"){
    fs.readFile(filePath, (err, data)=>{
        if(err !== null){
            console.log("There is a error")
            return
        }
        const fileData = data.toString("utf-8")
        console.log(fileData);
    })
}
if(command[0] == "mark-as-done"){
    fs.readFile(filePath, (err, data)=>{
        if(err !== null){
            console.log("There is a error");
            return
        }
        const fileData = data.toString("utf-8")
        const todoObj = JSON.parse(fileData)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question("What index?\n", (response)=>{
            rl.close()
            const task = todoObj[response].split("-")
            if(task[1] == " not done"){
                task[1] = " done"
            }else{
                task[1] = " not done"
            }
           
            todoObj[response] = task[0] + "-" + task[1]
            const updatedData = JSON.stringify(todoObj)
            fs.writeFile(filePath, updatedData, (dataErr)=>{
                if(dataErr) console.log("There is a problem");
                else console.log("Task done");
            })
        })
    })
}
if(command[0] == "delete"){
    fs.readFile(filePath, (err,data)=>{
        if(err !== null){
            console.log("There is a problem");
            return
        }
        const fileData = data.toString("utf-8")
        let todoObj = JSON.parse(fileData)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question("What index?\n", (response)=>{
            rl.close()
            todoObj = todoObj.filter((todo, i) => i != response);
            const updatedData = JSON.stringify(todoObj)
            fs.writeFile(filePath, updatedData, (dataErr)=>{
                if(dataErr) console.log("There is a problem");
                else console.log("todo deleted successfuly");
            })
        })
    })
}