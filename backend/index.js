import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
const app = express()
const port = 3000;

const students = [
    {
        id: 1,
        name: 'Иванов И И'
    },
    {
        id: 2,
        name: 'Петров П П'
    }
];


app.use(bodyParser.json());
app.use(cors());

app.get('/students', (req, res) => {
    res.send(students)
})

app.post('/addStudent', (req, res) => {
    console.log({ body: req.body })
    const studentName = req.body.student;
    students.push({
        id: students.length + 1,
        name: studentName
    })

    res.send(students)
})

app.delete('/removeStudent', (req, res) => {
    const id = req.body.id;
    const idx = students.findIndex(item => item.id === id)

    students.splice(idx, 1)

    res.send(students)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})