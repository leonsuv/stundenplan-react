# Lecture Scheduler App

## Overview
Welcome to the Lecture Scheduler App, a web application designed to view lectures.

## Features
* Personalized Schedule
* Vite & React
* Typescript
* Shadcn Styling
* NextUI Components

## Getting Started
### Prerequisites
Node.js

### Installation
1. Clone the repository:
```bash
git clone https://github.com/leonsuv/stundenplan-react.git
```
2. Navigate to the project directory:
```bash
cd stundenplan-react
```
3. Install dependencies:
```bash
npm i
```
4. CORS avoidance

   4.1. Request CORS avoidance for the PHWT-API:
[Registration of IP-Address](https://cors-anywhere.herokuapp.com/corsdemo)

   4.2. Host own proxy from example project:
[Go to Example proxy. (Clone and run)](https://github.com/leonsuv/cors-proxy)

   4.3. Depending on your choice edit [ApiWrapper.ts](https://github.com/leonsuv/stundenplan-react/src/data/ApiWrapper.ts):
   ```ts
   const globalproxy = "https://cors-anywhere.herokuapp.com/";
   const localproxy = "http://127.0.0.1:8080/";
   const proxyurl = localproxy; //change this line to your choice
   ```
6. Start the development server:
```bash
npm run dev
```
6. Open your browser and visit [http://localhost:5173](http://localhost:5173) to see the app in action.

## Authentication
The Lecture Scheduler App uses PHWT credentials for authentication. Make sure to provide the necessary credentials in the login interface.

## API Documentation
For more details on the API used in this app, refer to the official documentation: [PHWT API Documentation](https://app.phwt.de/api/v2/)

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](https://github.com/leonsuv/stundenplan-react/LICENSE.md) file for details.

## Acknowledgments
Thanks to PHWT for providing the API used in this project.
