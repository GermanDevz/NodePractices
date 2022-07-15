const inquirer = require('inquirer');
require('colors');


const options = [{
    value: 1,
    name: `${('1.').green} Search a movie`
},{
    value: 2,
    name: `${('2.').green} Show history`
},
{
    value: 0,
    name:  `${('0.').green} Exit`

}];


const menuOptions = [{
    type: 'list',
    name: 'option',
    message: '>',
    choices: options
}];





const menu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log(' The movie data base Api in console'.white );
    console.log('==========================\n'.green);

    const {option}  = await inquirer.prompt(menuOptions);

    return option;
}

const pause = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'movie',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please, insert a valid value';
                }
                return true;
            }
        }
    ];

    const { movie } = await inquirer.prompt(question);
    return movie;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



module.exports = {
    menu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}