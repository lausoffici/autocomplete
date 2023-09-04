### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

In React, components re-render when their props or state change or when their parent component re-renders. A Pure Component is a component that does not re-render when its props and state have not changed. We can use Pure Components for performance gains. A Pure Component should give the same result given the same props and state.

Depending if we are using a functional component or a class component, we can use `React.memo()` or `React.PureComponent` subclass respectively.

We can break our app if we use a Pure Component and objects or arrays as props. This is because the reference to the object or array will change even if the values inside the object or array have not changed. This will cause the Pure Component to re-render even if the values have not changed.
The problem might occur when we use `shouldComponentUpdate` to prevent those unnecessary re-renders. If we use `shouldComponentUpdate` and we are not careful with the props we are comparing, we might end up with a component that does not re-render when it should.

Another problem might occur if we directly mutate the state or props that are objects. Pure Components make a shallow comparison so if you try to mutate an object or an array, the re-render won't be triggered since the reference to the object or array has not changed.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

If you use `shouldComponentUpdate` in a component that uses context, you might get unexpected results. This is because `shouldComponentUpdate` will not be triggered when the context changes.

### 3. Three ways to pass information from a component to its PARENT:

1. Pass a function as a prop to the child component. The child component can then call the function and pass the data to the parent component.

2. Use React Context API to pass data to the parent component.

3. Use a state management library like Redux or MobX (similar to the Context API)

### 4. Two ways to prevent components from re-rendering:

1.  Use `PureComponent` for class components or `React.memo` for functional components to prevent re-renders when props or state haven't changed.

2.  State collocation: Move the state down to the lowest level possible. This way, only the components that need to re-render will re-render.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a component that allows us to group a list of children without adding extra nodes to the DOM. We need it because React components can only return a single child. We can use a fragment to return multiple children.

It's difficult to think a scenario where a Fragment breaks the App. A common issue is using the syntax `<></>` to create a fragment when we need to map an array. This syntax does not support attributes and it is a problem because we need to add the key to each element mapped. We can use `<React.Fragment></React.Fragment>` instead.

```jsx
const App = () => {
  const array = ["a", "b", "c"];
  return (
    <main>
      {array.map((letter) => (
        <React.Fragment key={letter}>
          <h2>{letter}</h2>
          <p>{letter}</p>
        </React.Fragment>
      ))}
    </main>
  );
};
```

### 6. Give 3 examples of the HOC pattern.

Basically any component that takes a component as an argument and returns a new component is a HOC. This pattern can be used to add functionality to a component. HOCs work like decorators for React components.

1. `connect` from `react-redux`
2. `withRouter` from `react-router-dom`
3. `withStyles` from `@material-ui/core/styles`

Example: Redirect to login page if user is not authenticated.

```jsx
const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };
  return WithPrivateRoute;
};

// Usage
const HomePage = withPrivateRoute(HomePageComponent);
```

### 7. What's the difference in handling exceptions in promises, callbacks and async…await?

**_Promises_**: We can use `.catch()` to handle errors. Promises are chainable so we can chain multiple `.then()` and `.catch()` to handle the asynchronous flow.

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));
```

**_Callbacks_**: We can use `try/catch` to handle errors (this is the way JS provide us to handle errors in synchronous code).
We can also pass the error to the callback function to manage errors.

Example: In this example, we are passing the error to the callback function as the first argument.

```js
function getData(callback) {
  try {
    const data = fetch("https://jsonplaceholder.typicode.com/todos/1");
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}
```

**_Async/Await_**: Is another syntax to handle promises. We can use `try/catch` to handle errors and it makes the code look more synchronous.

```js
async function getData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

### 8. How many arguments does setState take and why is it async?

`setState` takes two arguments: an object with the new state and a callback function that will be executed after the state has been updated.

`setState` is asynchronous because React batches multiple `setState` calls into a single update for performance gains. This means that the state wont change immediately after calling `setState`.

### 9. List the steps needed to migrate a Class to Function Component.

1.  Create a function component.
2.  Move the state to the function component using `useState`.
3.  Replace the lifecycle methods with `useEffect`.
4.  Move the class methods and variables to the function component scope.
5.  Move the `render` method logic to the function return statement.
6.  Remove the class component.

### 10. List a few ways styles can be used with components.

1.  Inline styles using the `style` prop in JSX.

```jsx
<div style={{ color: "red" }}>Hello World</div>
```

2.  CSS stylesheets and className

```css
.my-class {
  color: red;
}
```

```jsx
import "./styles.css";

<div className="red">Hello World</div>;
```

3.  CSS modules (create a file with the extension .module.css). This will generate a unique class name for each class so it wont collide with other classes. This is great to avoid global styles and does not caring about naming collisions.

```css
.red {
  color: red;
}
```

```jsx
import styles from "./styles.module.css";

<div className={styles.red}>Hello World</div>;
```

4.  CSS in JS libraries like styled-components or emotion

### 11. How to render an HTML string coming from the server?

We can use `dangerouslySetInnerHTML` to render an HTML string coming from the server. This is not recommended because it can lead to XSS attacks. If we want to render HTML coming from the server, we should use a library like `sanitize-html` to sanitize the HTML string (ensuring that the HTML is safe to render).
