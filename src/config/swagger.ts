import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  // Swagger configuration
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Inventory Management API",
        version: "1.0.0",
        description:
          "This is a simple Inventory Management API built with Node.js, Express, TypeScript, and MongoDB. Includes checkout, payment, stock tracking, and cancellation logic.",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./src/routes/*.ts"], // <== will auto-scan all route files for @swagger comments
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
