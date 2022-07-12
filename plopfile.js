module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'Path',
        filter: value => value.replace(/\/$/, ''),
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{name}}/{{name}}.tsx',
        templateFile: 'plop/templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop/templates/Component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{name}}/{{name}}.stories.tsx',
        templateFile: 'plop/templates/Component/Component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{name}}/index.ts',
        templateFile: 'plop/templates/Component/index.ts.hbs',
      },
    ],
  })
}
