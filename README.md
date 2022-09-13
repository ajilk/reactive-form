Angular provides two different approaches to handling user input through forms,
reactive and template-driven. Both capture user input events from the view,
validate the user input, create a form model and data model to update, and
provide a way to track changes.

## Reactive Form
- Reactive forms are more scalable than template-driven forms
## Template Driven Form
- they don't scale as much as reactive form
- focus on simple scenarios and are not as reusable.

- FormControl
- FormGroup
- FormArray
- FormRecord

The purpose of writeValue is to inform your component about changes on the parent component. What you'll usually want to do with it is to bind the change from outside to a local variable.

In order to inform the outside world about changes inside of your component, you need to call the onChange method. You can call it, like you would usually call an event emitter.

References:
https://angular.io/guide/forms-overview
https://indepth.dev/posts/1143/a-thorough-exploration-of-angular-forms