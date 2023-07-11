## Getting Started

First, run the development server:

```
npm run start
```

## Tests

Run the tests run:

```
npm run test
```

## Technical choices

[Zodios](https://www.zodios.org/) for end-to-end typesafety and data validation between the API and the front.
[PandaCSS](https://panda-css.com/) for typed css in js.
[Vite](https://vitejs.dev/) and [Vitest](https://vitest.dev/) for performances and easy setup.
NPM as was mentioned but [PNPM](https://pnpm.io/fr/) will be more suitable for a monorepo, has better performances and uses less storage.

## Improvements

### Redis

Queue data is stored in a javascript variable, it will be better to use a data storage like Redis for example. It will simplify the logic by bringing native expiration of the actions after 24 hours with TTL for example.

### Socket

Currently, the API is spammed by the front. Using a socket or server-sent events can remove this complexity by subscribing to the update instead of verifying if the action has been shifted.

### Animation

Add animation when an action is being executed.

### Actions

Keep track of the action history.
Add feedback for action not executed because of lack of credits.
