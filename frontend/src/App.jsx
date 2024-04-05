import { useEffect, useState } from 'react'
import { Button, Icon, ThemeProvider } from '@gravity-ui/uikit';
import { TextInput } from '@gravity-ui/uikit';
import { CirclePlus, CircleXmark, Sun, Moon } from '@gravity-ui/icons';

import './App.css'

const API_HOST = 'http://localhost:3000';

const getInitialCurrentStudent = () => {
    return sessionStorage.getItem('currentStudent') || '';
}

const getInitialTheme = () => {
    return localStorage.getItem('theme') || 'light';
}

function App() {

    const [students, setSudents] = useState([])
    const [currrentStudent, setCurrentStudent] = useState(getInitialCurrentStudent())
    const [theme, setTheme] = useState(getInitialTheme())

    const handleSetTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
        localStorage.setItem('theme', nextTheme)
    }

    const handleSetCurrentStudent = (e) => {
        setCurrentStudent(e.target.value)
        sessionStorage.setItem('currentStudent', e.target.value)
    }

    const handleAddStudent = async () => {
        const res = await fetch(`${API_HOST}/addStudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student: currrentStudent
            })
        });
        const students = await res.json();
        setSudents(students)
        setCurrentStudent('')
        sessionStorage.setItem('currentStudent', '')
    }

    const handleRemoveStudent = async (id) => {
        const res = await fetch(`${API_HOST}/removeStudent`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        });
        const students = await res.json();
        setSudents(students)
    }

    useEffect(() => {
        const getStudents = async () => {
            const res = await fetch(`${API_HOST}/students`)
            const students = await res.json();

            setSudents(students)
        }

        getStudents()
    }, [])

    return <ThemeProvider theme={theme}>
        <Button onClick={handleSetTheme}>
            <Icon data={theme === 'light' ? Moon : Sun} />
        </Button>
        <div className='AppContainer'>

            <div className='Form'>
                <TextInput
                    size='m'
                    pin="brick-round"
                    value={currrentStudent}
                    onChange={handleSetCurrentStudent}
                />
                <Button onClick={handleAddStudent}>
                    <Icon data={CirclePlus} />
                </Button>
            </div>
            <div>
                {students.map(student => {
                    return <div className='Student' key={student.id}>
                        <div>{student.name}</div>
                        <Button onClick={() => handleRemoveStudent(student.id)}>
                            <Icon data={CircleXmark} />
                        </Button>
                    </div>
                })}
            </div>
        </div>
    </ThemeProvider>

}

export default App
