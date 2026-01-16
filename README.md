# 🌱 The Campus Wall

The Campus Wall is an anonymous, serverless web application that allows students to share their wins, confessions, and thoughts in a safe and judgement free space. The platform is designed to be simple, responsive, and privacy-friendly, without requiring any user login or personal information.
- Website documentation Link: [Here](https://docs.google.com/document/d/1zlUzjvCWmtf7vRkOuwNPV9IkSmTogj5XO1C70QnaS24/edit?usp=sharing)
<img width="1898" height="1199" alt="image" src="https://github.com/user-attachments/assets/1ad55579-47e3-4685-83b4-04d9c1445b67" />


---

## ✨ Features

- Create anonymous posts with a category, title, and content  
- View all posts in a responsive tile based layout  
- Filter posts by category (Wins, Confessions, Thoughts)  
- View full post content in a modal  
- Delete posts through backend API integration  
- Responsive UI for desktop and mobile devices  

---

## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend (Serverless)
- AWS Lambda (Python)  
- Amazon API Gateway (REST API)  
- Amazon DynamoDB  

### Hosting
- Amazon S3 (Static Website Hosting)

---

## 🧩 System Architecture

- The frontend is hosted as a static website on Amazon S3  
- User actions trigger HTTP requests to API Gateway  
- API Gateway invokes AWS Lambda functions  
- Lambda functions perform CRUD operations on DynamoDB  
- Responses are returned to the frontend in JSON format  
<img width="721" height="415" alt="AWS Architecture Diagram" src="https://github.com/user-attachments/assets/e740bc54-ee94-4659-98e3-ada019f44ce5" />


---

## ⚙️ AWS Components

### Lambda Functions
- **createPost** – Adds a new post to DynamoDB  
- **getPosts** – Fetches all posts  
- **deletePost** – Deletes a post using its unique post ID  

### DynamoDB
- Table name: `postsData`  
- Partition key: `postid`  
- Stores post metadata including category, title, content, and timestamp  

### API Gateway
- REST API with GET, POST, and DELETE methods  
- Lambda proxy integration enabled  
- CORS configured for browser access  

---

## 🌐 Deployment

- Frontend files (`index.html`, `create.html`, `style.css`, `script.js`) are hosted on Amazon S3  
- Static website hosting enabled  
- Backend APIs connected using the API Gateway invoke URL  

Screenshots of AWS setup and application UI are included in the project documentation.

---

## 🎯 Purpose of the Project

This project was built to:
- Understand serverless application development  
- Learn end-to-end AWS integration  
- Practice REST API design and frontend-backend communication  
- Build a real world web application  


---

## 📌 Note

This application intentionally avoids user authentication to preserve anonymity and simplicity.

---

## 🧑‍💻 Author

Built with ❤️ as a learning project to explore AWS serverless architecture.
