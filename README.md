# Full Stack Meal Planner

A full-stack meal planning web application designed to generate personalized meal suggestions filtered by calories and meal type.

This application is built using a modern, decoupled architecture featuring a responsive React user interface and a Spring Boot REST API backed by a MySQL database.

## Architecture Overview

- **Frontend:** A multi-page application built with React using React Router. It communicates asynchronously with the backend via RESTful API endpoints.
- **Backend:** A Spring Boot Java REST API implementing the traditional controller-service-repository design pattern.
- **Database:** A relational MySQL database handling persistent storage for user data, calories, meal ideas and meal types.

## Tech Stack

- React (JavaScript / HTML5 / CSS3)
- React Router DOM
- Spring Boot (Java)
- Spring Data JPA / Hibernate
- Maven
- MySQL
- Hosted via Railway (PaaS) utilizing continuous deployment pipelines linked directly to GitHub

## Local Development Setup

To run this project locally, ensure you have Java 17+, Node.js, and MySQL Server installed.
