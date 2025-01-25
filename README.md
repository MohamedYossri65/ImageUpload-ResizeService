

# Photo Upload and Resize with Progress Bar

This project demonstrates a photo upload system where photos are resized using [Sharp](https://sharp.pixelplumbing.com/), with a client-side progress bar implemented using [Axios](https://axios-http.com/). The application is containerized using Docker and Docker Compose for easy deployment.

---

## Features

- **Photo Upload**: Allows users to upload photos through a simple UI.
- **Photo Resizing**: Uploaded photos are resized server-side using Sharp.
- **Progress Bar**: Displays upload progress on the client side using Axios' progress tracking.
- **Dockerized**: The application runs inside Docker containers for consistency and portability.
- **Docker Compose**: Simplifies running the app with multi-container configurations.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (for local development)
- [Docker](https://www.docker.com/) (for containerization)
- [Docker Compose](https://docs.docker.com/compose/) (for managing containers)
- [Nest Js](https://nestjs.com/) as a framework
- [type ORM](https://typeorm.io/data-source) as a framework for database ORM
- [My Sql](https://www.mysql.com/) as a datsbase
---

## Installation

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/photo-upload-resize.git
   cd photo-upload-resize
## Environment Variables

The application uses environment variables to manage configuration. Below is an example `.env` file for setting up the project:

```plaintext
# Application Environment
NODE_ENV="development"
PORT=4000

# Upload Configuration
UPLOAD_DIR=uploads
IMAGE_QUALITY=50

# Base URL
BASE_URL="http://localhost:4000/"

# Database Configuration
DATABASE_HOST="mysql"
DATABASE_PORT="3306"
DATABASE_USER_NAME="root"
DATABASE_PASSWORD="root"
DATABASE_NAME="upload_image_db"
