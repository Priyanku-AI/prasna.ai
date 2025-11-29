import { addTask, fetchTaskById } from "../services/taskService.js";

export async function createTask(req, res) {
    try {
        const { url, question } = req.body;
        if (!url || !question) {
            return res.status(400).json({ error: "Missing url or question" });
        }
        const task = await addTask(url, question);
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
export const getTask = async (req, res) => {
    
    try {
        const { id } = req.params;
        console.log("the id is",id);
        const task = await fetchTaskById(id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
