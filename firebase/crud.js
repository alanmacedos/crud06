import { database } from "./fbConfig.js";
import { 
    get,
    ref,
    push,
    set,
    remove,
    child,
    update
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const moodsRef = ref(database, "mood");

async function save(name, mood) {
    const newItemRef = await push(moodsRef);
    await set(newItemRef, {name, mood});
}

async function edit(id, name, mood) {
    const itemRef = await child(moodsRef, id);
    await update(itemRef, {name, mood});
}

async function removeData(id) {
    const itemRef = await child(moodsRef, id);
    await remove(itemRef);
}

async function searchAll(param) {
    const snapshot = await get(moodsRef);
    return snapshot.exists() ? snapshot.val() : {};
}

export { save, edit, removeData, searchAll };