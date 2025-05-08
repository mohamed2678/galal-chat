# Galal Chat

Galal Chat is a real-time chat application built with **Vue 3**, **Firebase**, and **Vite**. This project demonstrates the implementation of private chat rooms, real-time messaging, and Firestore integration.

## Features

- **Real-Time Messaging**: Messages are updated in real-time using Firestore's `onSnapshot`.
- **Private Chat Rooms**: Users can join specific chat rooms using a unique `roomId`.
- **Firestore Integration**: Messages and chat rooms are stored in Firestore with proper structure and security rules.
- **Responsive Design**: The UI is optimized for both desktop and mobile devices.
- **Vue 3 Composition API**: The project leverages Vue 3's modern features for better state management and reactivity.

## Technologies Used

- **Vue 3**: Frontend framework for building the user interface.
- **Firebase Firestore**: Real-time database for storing chat messages and room data.
- **Moment.js**: For formatting timestamps in chat messages.
- **Vite**: Development environment for fast builds and hot-reloading.
- **CSS**: Custom styles for a clean and responsive design.

## What I Did

1. **Frontend Development**:

   - Designed and implemented the chat interface using Vue 3.
   - Created reusable components like `NewMessage` for sending messages and `Chat` for displaying chat rooms.

2. **Real-Time Messaging**:

   - Integrated Firestore's `onSnapshot` to enable real-time updates for messages.
   - Implemented message fetching and rendering logic with proper reactivity.

3. **Private Chat Rooms**:

   - Added functionality to create and join private chat rooms using `roomId`.
   - Ensured each room has its own isolated message history.

4. **Firestore Integration**:

   - Designed Firestore database structure:
     ```
     rooms (collection)
       |-- roomId (document)
            |-- messages (subcollection)
                 |--messageId (document)
     ```
   - Used Firestore security rules to protect data.

5. **Responsive Design**:

   - Styled the application to ensure usability on both desktop and mobile devices.

6. **Debugging and Testing**:
   - Added extensive logging for debugging Firestore queries and ensuring data integrity.
   - Tested the application for edge cases like empty rooms and invalid `roomId`.

## How to Run the Project

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Future Improvements

- Add user authentication for secure access to chat rooms.
- Implement typing indicators and message read receipts.
- Enhance the UI with animations and better styling.

## Contact

If you'd like to know more about this project or collaborate, feel free to reach out!
