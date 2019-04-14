async function getPosts() {
    const res = await fetch('http://localhost:3000/crud/employees');
    const data = await res.json();
    return data;
}


getPosts().then(post => console.log(post));