const API_URL = 'http://127.0.0.1:3000/tasks'

export const fetchData = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = response.json().then((data)=> data);
    return data
}

export const addData = async (task) => {
    const response = await fetch(API_URL, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to add task');
    const data = response.json().then((data)=> data)
    return data
}