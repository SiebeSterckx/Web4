import * as dotenv from "dotenv";
import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bookingRoutes from './controller/booking.routes';
import profileRoutes from './controller/profile.routes';
import userRoutes from './controller/user.routes';
import carRoutes from './controller/car.routes';
import {expressjwt} from "express-jwt";
import {jwtSecret} from "./jwt";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

// Swagger configuration
const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});


// Throw error if user is unauthorized
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).json({status: 'unauthorized', message: error.message});
  } else if (error.name === 'ForbiddenError') {
    res.status(400).json({status: 'forbidden', message: error.message});
  } else {
    next();
  }
});


// Pages that can be accessed without login
app.use(
    expressjwt({secret: jwtSecret, algorithms: ['HS256']}).unless({
        path: [/^\/api-docs($|\/.*)/, /^\/users($|\/.*)/, '/status', /^\/profiles($|\/.*)/],
    })
);

// Route handlers
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/cars', carRoutes);

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});
