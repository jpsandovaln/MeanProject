import {Person} from './app.module';

async function getPosts() {
    const res = await fetch('http://172.21.19.100:3000/crud/employees');
    const data = await res.json();
    return data;
}


getPosts().then(po => console.log(po));