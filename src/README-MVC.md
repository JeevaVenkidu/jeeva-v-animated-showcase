
# MVC Architecture Implementation Guide

This React portfolio application follows a strict Model-View-Controller (MVC) architecture pattern to ensure maintainable, scalable, and testable code.

## Architecture Overview

### Models (`/src/models/`)
- **Responsibility**: Data management, API calls, business rules, validation
- **What they do**: Handle all data operations, define data structures, simulate API calls
- **What they DON'T do**: Contain UI logic, manage component state directly
- **Files**: `projectModel.ts`, `codingModel.ts`, `homeModel.ts`

### Controllers (`/src/controllers/`)
- **Responsibility**: Business logic, state management, orchestration between Models and Views
- **What they do**: Custom hooks that manage application state, handle user interactions, coordinate data flow
- **What they DON'T do**: Contain presentation logic, directly manipulate DOM
- **Files**: `useProjectController.ts`, `useCodingController.ts`, `useHomeController.ts`

### Views (`/src/views/`)
- **Responsibility**: Pure presentation components
- **What they do**: Render UI based on props, handle user input events (pass to controllers)
- **What they DON'T do**: Contain business logic, make API calls, manage application state
- **Files**: `ProjectCardView.tsx`, `CodingProfileView.tsx`, `CategoryFilterView.tsx`

### Pages (`/src/pages/`)
- **Responsibility**: Route-level components that combine Controllers and Views
- **What they do**: Use controllers for data/logic, pass data to views for rendering
- **Files**: `Home.tsx`, `Projects.tsx`, `Coding.tsx`

## Key Principles

1. **Separation of Concerns**: Each layer has a single, well-defined responsibility
2. **Unidirectional Data Flow**: Data flows from Model → Controller → View
3. **No Cross-Layer Dependencies**: Models never import Views, Views never import Models
4. **Controller as Bridge**: Controllers are the only layer that connects Models and Views
5. **Pure Views**: Views are stateless and only receive data through props

## Adding New Features

When adding a new feature, follow this pattern:

1. **Create Model** (`/models/featureModel.ts`):
   ```typescript
   export class FeatureModel {
     static async getData(): Promise<FeatureData> {
       // Data logic here
     }
   }
   ```

2. **Create Controller** (`/controllers/useFeatureController.ts`):
   ```typescript
   export const useFeatureController = () => {
     const [data, setData] = useState();
     // Business logic here
     return { data, actions };
   };
   ```

3. **Create Views** (`/views/FeatureView.tsx`):
   ```typescript
   const FeatureView = ({ data, onAction }) => {
     // Pure presentation logic
     return <div>...</div>;
   };
   ```

4. **Combine in Page** (`/pages/FeaturePage.tsx`):
   ```typescript
   const FeaturePage = () => {
     const { data, actions } = useFeatureController();
     return <FeatureView data={data} onAction={actions.handleAction} />;
   };
   ```

## Benefits

- **Maintainability**: Clear separation makes code easier to understand and modify
- **Testability**: Each layer can be tested independently
- **Reusability**: Views and Controllers can be reused across different parts of the app
- **Scalability**: Easy to add new features following the established pattern
- **Debugging**: Issues can be quickly isolated to the appropriate layer

## Testing Strategy

- **Models**: Test data operations and business rules
- **Controllers**: Test state management and business logic
- **Views**: Test rendering and user interactions
- **Integration**: Test the flow between layers

This architecture ensures that your React application remains organized, maintainable, and scalable as it grows.
