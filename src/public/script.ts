document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;

    if (addTaskBtn && taskInput) {
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    }
});

async function addTask(): Promise<void> {
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const title: string = taskInput.value.trim();
    if (!title) {
        alert("Please enter a task");
        return;
    }

    try {
        const response = await fetch("/add-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Failed to add task');
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// Deleting the task
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', function (this: HTMLElement) {
            const taskId = this.getAttribute('data-task-id');

            if (!taskId) return;

            fetch('/delete-task', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: Number(taskId) })
            })
            .then(response => response.json())
            .then((data: { success: boolean }) => {
                if (data.success) {
                    this.closest("li")?.remove();
                } else {
                    alert('Failed to delete task');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    });
});

// Updating the task
document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', function (this: HTMLElement) {
        const taskId = this.getAttribute('data-task-id');
        const taskSpan = document.getElementById(`task-title-${taskId}`);

        if (!taskId || !taskSpan) return;

        // Create an input field
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = taskSpan.innerText;
        inputField.classList.add('form-control');

        // Replace text with input field
        taskSpan.replaceWith(inputField);
        inputField.focus();

        // Function to save the edited task
        const saveTask = async (): Promise<void> => {
            const newTitle: string = inputField.value.trim();
            if (!newTitle) {
                inputField.replaceWith(taskSpan);
                return;
            }

            try {
                const response = await fetch('/update-task', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: Number(taskId), title: newTitle })
                });

                if (response.ok) {
                    taskSpan.innerText = newTitle;
                    inputField.replaceWith(taskSpan);
                } else {
                    console.log('Failed to update task');
                    alert('Failed to update task');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        inputField.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                saveTask();
            }
        });

        inputField.addEventListener('blur', () => {
            saveTask();
        });
    });
});

// Task completion
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.task-checkbox').forEach((checkbox) => {
        checkbox.addEventListener('change', async function (this: HTMLInputElement) {
            const taskId = this.getAttribute('data-task-id');
            const isComplete = this.checked;
            

            if (!taskId) return;

            try {
                const response = await fetch('/update-task-status', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: Number(taskId), status: isComplete ? 'completed' : 'pending' })
                });
                
                if (!response.ok) {
                    console.error('Failed to update the task status');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        });
    });
});
