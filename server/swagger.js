// server/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for Task Manager",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    Task: {
      type: "object",
      required: ["user", "title"], // same as Mongoose required fields
      properties: {
        _id: {
          type: "string",
          description: "MongoDB ObjectId of the task",
          example: "64fa1f4c6c8b6b1e4c3d2a99"
        },
        user: {
          type: "string",
          description: "ID of the user who owns the task",
          example: "64fa1f4c6c8b6b1e4c3d2a11"
        },
        title: {
          type: "string",
          description: "Title of the task",
          example: "Finish Swagger Documentation"
        },
        description: {
          type: "string",
          description: "Optional details about the task",
          example: "Write Swagger docs for Task Manager project"
        },
        completed: {
          type: "boolean",
          description: "Whether the task is completed",
          default: false,
          example: false
        },
        createdAt: {
          type: "string",
          format: "date-time",
          description: "Task creation timestamp",
          example: "2025-08-30T14:48:00.000Z"
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          description: "Task last updated timestamp",
          example: "2025-08-31T12:15:00.000Z"
        },
      },
    },
  },
}




  },
  apis: ["./routes/*.js"], // adjust path where your routes live
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
