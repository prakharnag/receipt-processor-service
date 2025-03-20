The below `STEPS` provide instructions to evaluate the assessment by pulling this repo, set up the Dockerized environment, and understand the test cases I've written for the web service:

---

# Receipt Processor Service

This project provides a web service that processes receipts and rewards points based on the receipt data. The service includes endpoints for processing receipts and retrieving associated points.

## Prerequisites

- Docker
- Docker Compose

## Setup

Follow these steps to run the project with Docker:

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/prakharnag/receipt-processor-service.git
```

### 2. Build and run the application

You can build and start the application using Docker Compose:

```bash
cd receipt-processor-service
docker-compose up --build
```

This will:

- Build the Docker image as defined in the `Dockerfile`.
- Start the application and expose it on port `3000`.

### 3. Access the application

Once the application is running, you can access the API at `http://localhost:3000`.

## Running Tests
I have also tested the web service with superTest suite, it runs on port 3001

To run the tests for the Receipt Processor API, use the following command:

```bash
Open new terminal.
cd receipt-processor-service
docker-compose exec app npm test
```

This will run the test cases using `supertest` to validate the API endpoints.

## Test Cases

### 1. Process a Receipt and Return an ID

This test case ensures that when a receipt is processed via the `/receipts/process` endpoint, it returns a valid ID:

```javascript
it('should process a receipt and return an ID', async () => {
  // Simulate sending a receipt for processing
});
```

### 2. Retrieve Points for a Given Receipt ID

After processing a receipt, this test case validates that the API can return the points for a given receipt ID:

```javascript
it('should return points for a given receipt ID', async () => {
  // Process receipt, then retrieve and validate points
});
```

### 3. Missing Fields in Receipt Processing (Negative Test Case)

This test case simulates missing required fields during receipt processing and ensures the API responds with a `400` error:

```javascript
it('should return 400 for missing fields in receipt processing', async () => {
  // Send a receipt with missing fields and expect a 400 error
});
```

### 4. Invalid Data Types in Receipt Processing (Negative Test Case)

This test case validates that the API responds with a `400` error when invalid data types are provided in the receipt:

```javascript
it('should return 400 for invalid data types in receipt processing', async () => {
  // Send a receipt with invalid data types and expect a 400 error
});
```

### 5. Non-Existent Receipt ID (Negative Test Case)

This test case ensures that when a non-existent receipt ID is used to retrieve points, the API responds with a `404` error:

```javascript
it('should return 404 for non-existent receipt ID when fetching points', async () => {
  // Try to fetch points with a non-existent receipt ID and expect a 404 error
});
```

### 6. Validate UUID Format of Receipt ID

This test case checks that the receipt ID returned during processing is in the correct UUID format:

```javascript
it('should return a valid UUID as receipt ID', async () => {
  // Validate that the receipt ID is in UUID format
});
```

## Stopping the Application

To stop the Docker containers, run:

```bash
docker-compose down
```

## Directory Structure

Here is an overview of the project structure:

```
/receipt-processor-service
  ├── README.md
  ├── Dockerfile
  ├── receipt-processor # Source Code
      ├── app.js
      ├── app.test.js         # Test cases for Receipt Processor API
      ├── routes              # receipt process and points endpoints
  ├── docker-compose.yml
  ├── package.json
  ├── .gitignore
  ├── .dockerignore
  ├── api.yml
```
