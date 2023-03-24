# Face Recognition API

This project is providing API for register, sign in and integrate with 3rd party API (Clarifai API)


## Demo

https://image-recognition.netlify.app/

## Screenshots

![sign in](https://user-images.githubusercontent.com/76085854/227434184-6fea9489-3f64-4322-bd09-1dd7528f789b.jpg)

![validation](https://user-images.githubusercontent.com/76085854/227434227-18ac4b3e-31c2-4e25-94c9-eb962cfc703a.png)

![image recog](https://user-images.githubusercontent.com/76085854/227434256-bcf921f1-c69d-4f40-8ff9-630670e73a04.png)

## Run Locally
First, you MUST get your own PAT(Personal Access Token) from Clarifai. You can follow this [guide](https://help.clarifai.com/hc/en-us/articles/4408131744407-Integrating-Clarifai-in-your-React-Javascript-project) as well


Clone the project

```bash
  git clone https://github.com/amrinaas/face-recognition-api
```

Go to the project directory

```bash
  cd face-recognition-api
```

Install dependencies

```bash
  npm install / yarn install
```

Start the server

```bash
  npm run start / yarn start
```


## Appendix

Create your PostgreSQL database using this query:

`users` table:

`CREATE TABLE users(
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined timestamp NOT NULL);`

`login` table:

`CREATE TABLE users(
    id serial PRIMARY KEY NOT NULL,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL);`
## Environment Variables

To run this project, you will need to add the following environment variables from `.env.example` to your `.env` file


## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** PostgreSQL

## Features

- Register new user
- Sign In user
- Detect face from an image


## Feedback

If you have any feedback, please reach out to me at amrinaas96@gmail.com


## Authors

- [@amrinaas](https://www.github.com/amrinaas)


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/amrinaas/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/amrinaas/)

