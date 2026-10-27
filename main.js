import { save, edit, removeData, searchAll } from "./firebase/crud.js";

const form = document.getElementById("form");
const moodUL = document.getElementById("moods");

await updateList();

let editingID = null

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const mood = document.getElementById("mood").value;

    if (!editingID) {
        await save(name, mood);
    
    } else {
        await edit(editingID, name, mood);

    }

    form.reset();

    await updateList();
})

async function updateList() {

    const data = await searchAll();

    const moods = Object.entries(data).map(([id, item]) => {

        return {
            id : id,
            name : item.name,
            mood : item.mood
        }
    })

    moodUL.innerHTML = "";

    moods.forEach((item) => {

        const moodLI = document.createElement("li");

        const name = document.createElement("p");
        name.textContent = item.name;

        const mood = document.createElement("p");
        mood.innerText = item.mood;

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";

        btnEdit.addEventListener("click", async (event) => {

            await editMood(item);
        })

        const btnDel = document.createElement("button");
        btnDel.textContent = "Delete";

        btnDel.addEventListener("click", async (event) => {

            await deleteMood(item.id);
        })

        moodLI.appendChild(name);
        moodLI.appendChild(mood);
        moodLI.appendChild(btnEdit);
        moodLI.appendChild(btnDel);

        moodUL.appendChild(moodLI);
    })
}

async function editMood(item) {

    editingID = item.id;

    document.getElementById("name").value = item.name;
    document.getElementById("mood").value = item.mood;
}

async function deleteMood(id) {

    const confimation = confirm("Certeza que deseja excluir?");

    if (!confimation) {
        return

    }

    await removeData(id);

    updateList();
}