import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Inventory Management API",
        version: "1.0.0",
        description: "API documentation for Inventory Management System",
      },
      servers: [
        { url: "http://localhost:5000" } // ✅ important
      ],
    },
    apis: ["./src/routes/*.ts"], // adjust if needed
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
