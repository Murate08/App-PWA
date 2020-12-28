import React,{FormEvent, useState} from 'react'
import {useHistory}from 'react-router-dom'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import './styles.css'

import warningIcon from '../../assets/images/icons/warning.svg'
import Textare from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'

function TeacheForm(){
//para redicionar assim que fizer o cadastro
    const history = useHistory();
//para cadastrar na api o formulario  {nome, imagem, whatsapp, e bio}
    const [name, setName] = useState('');    
    const [avatar, setAvatar] = useState('');    
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
//dados da materia conectar com api
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState(''); 
 

    const [scheduleItems, setScheduleItems] = useState([
        { week_day:0,  from:'',   to:''}
    ])



    function addNewCheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day:0,  from:'',   to:''}
        ]);


    }


    //funcao para o funcionamento do cadastro

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index)=>{
            if(index === position){
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert('Cadastro feito com sucesso!')

            //redicionar
            history.push('/')

        }).catch(()=>{
            alert('Erro no cadastro')
        })
    }


    return(
        
        <div id="page-teacher-form" className="container">
            <PageHeader 
           title="Que incrivel que voce quer dar aulas."
           description="Preencha o formulario de inscricao"           
           />
          


           <main>
               <form onSubmit={handleCreateClass}>
               <fieldset>
                   <legend>Seus dados</legend>
                    <Input 
                        name="name" 
                        label="Nome completo" 
                        value={name} 
                        onChange={(e) =>{ setName(e.target.value)}}
                    />

                    <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar} 
                        onChange={(e) =>{ setAvatar(e.target.value)}} 
                    />

                    <Input 
                        name="whatsapp" 
                        label="Whatsapp" 
                        value={whatsapp} 
                        onChange={(e) =>{ setWhatsapp(e.target.value)}}                         
                    /><br/>

                    <Textare 
                        name="bio" 
                        label="Biografia"
                        value={bio} 
                        onChange={(e) =>{ setBio(e.target.value)}}  
                    />
                   
               </fieldset>

        
               <fieldset>
                   <legend>Sobre a aula</legend>
                    <Select
                        name="subject"
                        label="Materia"
                        value={subject} 
                        onChange={(e) =>{ setSubject(e.target.value)}}
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
                    <Input 
                        name="cost" 
                        label="Custo da sua aula por hora"
                        value={cost} 
                        onChange={(e) =>{ setCost(e.target.value)}}
                    />                   
               </fieldset>
                <fieldset>
                    <legend>
                        Horarios disponiveis
                    <button type="button" onClick={addNewCheduleItem}>
                    + Novo Horario
                    </button>
                    </legend>

                  {scheduleItems.map((scheduleItem, index) =>{
                      return(
                        <div key={scheduleItem.week_day} className="schedule-item">
                        <Select
                         name="week_day"
                         label="Dia da semana"
                         value={scheduleItem.week_day}
                         onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value) }
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
                            label="Das" 
                            name="from" 
                            type="time"
                            value={scheduleItem.from}
                            onChange={ e => setScheduleItemValue(index, 'from', e.target.value) }
                        />

                         <Input  
                            label="Ate" 
                            name="to" 
                            type="time"
                            value={scheduleItem.to}
                            onChange={ e => setScheduleItemValue(index, 'to', e.target.value) }
                        />
                        </div>
                   
                      );

                  })}
                </fieldset>
               
               <footer>
                   <p>
                       <img src={warningIcon} alt="Aviso importante"/>
                       Importante! <br/>
                       Preecha todos osdados
                   </p>
                   <button type="submit">Salvartodos dados</button>

               </footer>
               </form>
           </main>
         </div>


    )
}
export default TeacheForm;