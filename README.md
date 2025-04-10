# FooocusUI

FooocusUI is a Vue.js-based UI project for interacting with the Fooocus FastAPI backend. It provides a clean and intuitive interface for generating and managing images using the Fooocus API.

## Features

- **Image Generation**: Generate images using prompts and advanced parameters.
- **Drag-and-Drop Support**: Easily drag images into input panels for processing.
- **Customizable Parameters**: Adjust settings like resolution, performance, styles, and more.
- **Real-Time Feedback**: View generated images and progress in real-time.
- **Integration with Fooocus API**: Seamlessly communicates with the Fooocus FastAPI backend.

## Prerequisites

Before running FooocusUI, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Vue CLI](https://cli.vuejs.org/)
- A running instance of the Fooocus FastAPI backend

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/FooocusUI.git
   cd FooocusUI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the API base URL:

   Edit the `.env` file and set the `VITE_API_BASE_URL` to the URL of your Fooocus FastAPI backend. For example:

   ```env
   VITE_API_BASE_URL=http://127.0.0.1:7866
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`.

## Building for Production

To build the application for production:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Project Structure

```
FooocusUI/
├── src/
│   ├── components/        # Vue components
│   ├── assets/            # Static assets
│   ├── stores/            # Vuex or Pinia stores
│   ├── App.vue            # Root Vue component
│   ├── main.ts            # Application entry point
├── public/                # Public static files
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Key Components

- **`Generator.vue`**: Main component for generating images.
- **`InputImagePanel.vue`**: Component for uploading and managing input images.
- **`CustomImage.vue`**: Reusable component for displaying and handling images.

## API Integration

FooocusUI communicates with the Fooocus FastAPI backend using RESTful API endpoints. Ensure the backend is running and accessible at the configured `VITE_API_BASE_URL`.

### Example API Endpoints

- **Generate Image**: `POST /api/create_task`
- **Get Results**: `GET /api/generate`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Fooocus FastAPI Backend](https://github.com/your-repo/Fooocus)

---
