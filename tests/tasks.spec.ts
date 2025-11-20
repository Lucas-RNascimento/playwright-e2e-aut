import { expect, test } from '@playwright/test'
//import { faker } from '@faker-js/faker';
import { TaskModel } from './fixtures/task.model';

import { deleteTaskByHelper, postTask } from './support/helpers';

import { TasksPage } from './support/pages/tasks';

import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

test.describe('cadastro', ()=> {

    // test('deve poder cadastrar uma nova tarefa', async ({ page }) => {
    //     // importa o faker dinamicamente
    //     const { faker } = await import('@faker-js/faker');

    //     await page.goto('http://localhost:8080');

    //     // await page.fill('#newTask', 'Ler um livro de TypeScript')
    //     // await page.fill('._listInputNewTask_1y0mp_21', 'Ler um livro de TypeScript')
    //     // await page.fill('input[class*=InputNewTask]', 'Ler um livro de TypeScript')
    //     // await page.fill('input[placeholder="Add a new Task"]', 'Ler um livro de TypeScript')
        
    //     const inputTaskName = page.locator('#newTask');
    //     // await inputTaskName.fill('Ler um livro de TypeScript')
    //     await inputTaskName.fill(faker.lorem.words());
        
    //     // await inputTaskName.press('Enter')
    //     // await page.click('xpath=//button[contains(text(), "Create")]')
    //     await page.click('css=button >> text=Create');

    // })


    test('deve poder cadastrar uma nova tarefa', async ({ request }) => {

        // Gerkin
        // Dado que eu tenho uma nova tarefa
        const task = data.success as TaskModel

        // utilizando fixo com o helper
        await deleteTaskByHelper(request, task.name)

        // E que estou na pagina de cadastro
        // const taskPage: TasksPage = new TasksPage(page)
        await tasksPage.go()

        // Quando faco o cadastro dessa tarefa
        await tasksPage.create(task)
    
        // Então essa tarefa deve ser exibida na lista
        await tasksPage.shouldHaveText(task.name)
        
    })

    test('não deve permitir tarefa duplicada', async ({ request })=> {

        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        // const taskPage: TasksPage = new TasksPage(page)
        await tasksPage.go()

        await tasksPage.create(task)

        await tasksPage.alertHaveText('Task already exists!')
    })

    test('Campo Obrigatorio', async () => {
        const task = data.required as TaskModel

        //const tasksPage: TasksPage = new TasksPage(page)

        await tasksPage.go()
        await tasksPage.create(task)

        //const inputTaskName = page.locator('Input[class*=InputNewTask]')
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    })


})

test.describe('atualização', ()=> {
    test('deve concluir uma tarefa', async ({ request })=> {
    const task = data.update as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    //const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()

    await tasksPage.toggle(task.name)

    await tasksPage.shouldBeDone(task.name)
    })
})

test.describe('exclusão', ()=> {
    test('deve excluir uma tarefa', async ({ request })=> {
    const task = data.delete as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    //const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()

    await tasksPage.remove(task.name)

    await tasksPage.shouldNotExist(task.name)
    })
})

