# Demo

Assignment live link: https://kong-assignment.netlify.app/

![ezgif-6-92a07ed987](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/2b6ebf28-05a6-4162-94b9-9ee5409571b4)

Full demo: https://drive.google.com/file/d/1WxjLKLPNAPSmRmTJjRFHxIhdFel3vQps/view?usp=sharing

### Service List page

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/694608dc-d2ba-48cf-9b52-827460821798)

### Service list - with a search query

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/a30ae443-6460-47f6-b39b-ff01339ef345)

### Client-side pagination with search and page in query param

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/8797e491-ba2e-4d28-a03a-e0decb17fb71)

### Service with service details

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/6a67b7a3-2fb9-450f-a98b-fa5db44e6756)

### No result page page

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/c2845148-f99c-45d6-ba7a-4e0f2ea4da8b)

### 404 Page

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/46ee0039-8c69-41b2-a0c9-83ed124ed18c)

![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/66a997a5-5118-4832-b52b-99c008e3143d)
![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/fbb9a881-aba9-4206-932c-0eb871e48593)
![image](https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/ed7889b1-2d5d-4518-b5da-99e1b63899ba)
<img width="408" alt="image" src="https://github.com/Pratyush2710/konnect-team-interview-frontend-exercise/assets/30828006/565de4e7-8636-41b2-a377-bc37eef4d79d">

<hr/>

### Design considerations, assumptions, and trade-offs

- **Assets and colors from figma**:

  - Except the left/right arrow in the pagination, all icons are extracted as SVG from the figma link along with color scheme.

- **Card Sizing and Layout**:

  - A minimum height of 24rem for each card to ensure consistent presentation across devices, preventing content overflow on smaller screens. Flexbox layout to allow cards to automatically adjust based on available width, and to create a visually appealing and adaptable interface.

- **Card Display and Pagination:**
  - Displayed a maximum of 10 cards by default with client-side pagination to optimize initial page load speed and user experience. This approach allows users to easily navigate through large datasets without overwhelming them with information.
  - The current page limit is set to 10, however can be configured to [10, 20, 50] through UI elements to provide flexibility for users who prefer a different card density.
- **Search and State Management:**
  - Stored search key and page number in the URL query parameters to facilitate seamless sharing of search results and user state across sessions. This approach makes it easy for users to bookmark specific search results or share them with colleagues.
- **Service Details and User Experience:**
  - Utilized a modal for displaying detailed service information as limited information is available in Versions DTO and to avoid overwhelming users with unnecessary information and to let users to delve deeper into specific details when needed without losing context.
- **Accessibility:**
  - Included alt tags for images for fallback to understand the content of images, even if they fail to load and aria-labels for custom modals.
- **Error Handling:**
  - 404 error page for uncaptured routes to provide a user-friendly experience by informing users of an invalid request and potentially guiding them to the correct location ( Homepage here ).
- **Pagination Robustness:**

  - Validated user input for pagination buttons to prevent errors and to ensure users cannot navigate to non-existent pages. Visual cues are provided (disabled buttons) for first and last pages nav buttons.

- **Responsive Design:**

  - Utilized flexboxes and rem units to create a responsive and adaptive layouts across various screen sizes. Media queries for mobile devices with specific adjustments (e.g., card layout, font size) are added to further enhance UX by optimizing the interface for smaller screens.

- **Modal Interaction:**
  - Included canCloseOnEscape and canCloseOnOutsideClick events for modals to allow users to close them conveniently on focus lose and esc button for better user experience.
- **Component-Based Architecture:**
  - The application utilizes a component-based architecture, promoting code reusability and maintainability. Each component represents a specific UI element or functionality.
- **JSDoc and types integration :**
  - JSDocs are added for all composable and generic types for component and utils

### Project Structure

The project is structured to organize components, composables, utilities, and types:

- **src/**
  - **common/**
    - types - Contains generic type definitions used throughout the application.
    - utils - Houses common utility functions used by various components.
  - **components/**
    - **common/** - Reusable components like AvatarTiles, ModalComponent, PrimaryButton, and StatusBar.
  - **Header/** - Contains the Header component for the application header.
  - **Pagination/** - Holds the Pagination component for managing page navigation.
  - **services/** - Components related to displaying and managing services:
    - **ServiceCard/** - Individual service card component.
    - **ServiceCardSkeleton/** - Placeholder component for loading services.
    - **ServiceCatalog/** - Overview component for displaying services.
    - **ServiceDetails/** - Detailed view of an individual service.
    - **ServiceVersions/** - Component for managing service versions.
  - **composables/** - Folder containing reusable composable functions:
    - **useDebouncedRef** - Handles creating a debounced ref for values.
    - **useGetPaginatedData** - Manages paginated data fetching and provides properties and methods for components to display and navigate through paginated content.
    - **useModal** - Controls the visibility and logic of modal components.
    - **useServices** - Manages fetching and error state for service data.
  - **views** - Top-level components representing application views:
    - **ErrorPage** - Component for displaying error states.
    - **PageHome** - The main application page.

<hr/>

### Future scope unable to implement due to limited time

- New service CRUD flow
- Internationalization
- Client side caching for search API
- State management of service via store pinia
- Storing service id in the URL as well for scoped URL of pagination and service data

<hr/>

# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>

## Functional Requirements

- [Vue 3](https://vuejs.org/) and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- Routing and views (e.g. navigating to a given service from its card)
- State management with [Pinia](https://pinia.vuejs.org/)
- [Component Tests and/or Unit Tests](#run-component-and-unit-tests-with-vitest-and-optionally-vue-test-utils)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- The project should pass type checking and build successfully
- How you dedicate the allotted time to focus on your strengths
- Test coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
