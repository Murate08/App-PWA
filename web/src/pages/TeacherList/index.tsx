import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import api from '../../services/api';

import './styles.css';


function TeacherList(){
//salvar a lista de professores
        const [teachers, setTeachers] = useState([]);

        const [subject, setSubject] = useState('');
        const [week_day, setWeekDay] = useState('');
        const [time, setTime] = useState('');

async function seachTeachers(e: FormEvent){
           e.preventDefault();
           
const response = await  api.get('/classes', {
               params:{
                   subject,
                   week_day,
                   time,
               }
           })

        setTeachers(response.data)
        
       } 
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis">
                <form id="search-teachers" onSubmit={seachTeachers}>
                <Select
                     name="subject" 
                     label="Materia"
                     value={subject}
                     onChange={e=>{setSubject(e.target.value)}}
                     options={[
                         {value:'Artes', label: 'Artes'},
                         {value:'Biologia', label: 'Biologia'},
                         {value:'Ciencia', label: 'Ciencia'},
                         {value:'Fisica', label: 'Fisica'},
                         {value:'Matematica', label: 'Matematica'},
                         {value:'Quimica', label: 'Quimica'},
                         {value:'Desenho', label: 'Desenho'},
                         {value:'Historia', label: 'Histotia'},
                         {value:'Filosofia', label: 'Filosofia'},
                        ]}
                     />
                    <Select
                     name="week_day" 
                     label="Dia da semana"
                     value={week_day}
                     onChange={e=>{setWeekDay(e.target.value)}}
                     options={[
                         {value:'0', label: 'Domingo'},
                         {value:'1', label: 'Segunda-feira'},
                         {value:'2', label: 'Terca-feira'},
                         {value:'3', label: 'Quarta-feira'},
                         {value:'4', label: 'Quinta-feira'},
                         {value:'5', label: 'Sexta-feira'},
                         {value:'6', label: 'Sabado'},
                     
                        ]}
                     />
                    <Input 
                        type="time"
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={e=>{setTime(e.target.value)}}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
           
 


            </main>

        </div>

    )
}
export default TeacherList;