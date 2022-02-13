# trying-nestjs-ddd

Based on layered architecture.

# Development

- Install dependencies by running `yarn install`.
- Copy the **.env.example** as **.env**.
- Add values to the **.env**.
- Create **trying_nestjs_ddd** to your mysql database.
  - Initialize tables by running `yarn migration`.
  - Initialize data by running `yarn seed`.
  - If you wan't to use **in-memory repository**, switch the **REPOSITORY_TYPE** to **in-memory**.  
  In this case, no database is needed.
- Start development by running `yarn start:dev`.

# Rough requirement definition

- It's a task management application.
- It's a web server.
- The user is only you.
- Task contains rules below.
  - Task has it's name and done state.
  - Task name must not be duplicated.
  - Name of the task is 1 to 20 characters.
- It provides the following features.
  - Create a task.
  - Get all tasks.
  - Update a task.
  - Delete a task.

# Rough development policy

- Based on layered architecture.
- Since the unit of aggregation is only task, there are no modules or packages that are conscious of aggregation.
  - For example, there is no directory named task.
- Try not to depend on libraries as much as possible at the application or domain layers.
- Task identifiers are serial numbers.
- Executing domain behavior is not allowed in presentation layer.
