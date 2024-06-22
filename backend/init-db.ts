// Execute: npx ts-node init-db.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    // Use the prisma API to fill the database with some initial data

    // Add 4 users
    await prisma.user.createMany({
        data: [
            {
                id: 1,
                username: "admin",
                password: "$2b$12$5JrazC0ViY33wPN38WUXjO5XSsb/lICE/uLeX.bJaOO6CLddcDJCq",
            },
            {
                id: 2,
                username: "user",
                password: "$2b$12$5JrazC0ViY33wPN38WUXjO5XSsb/lICE/uLeX.bJaOO6CLddcDJCq",
            },
            {
                id: 3,
                username: "andere_user",
                password: "$2b$12$5JrazC0ViY33wPN38WUXjO5XSsb/lICE/uLeX.bJaOO6CLddcDJCq",
            },
            {
                id: 4,
                username: "andere_2_user",
                password: "$2b$12$5JrazC0ViY33wPN38WUXjO5XSsb/lICE/uLeX.bJaOO6CLddcDJCq",
            },
        ],
    })


    // Add 4 cars
    await prisma.car.createMany({
        data: [
            {
                chassisNumber: "VF15R5E0F54678912",
                brand: "Renault",
                model: "Clio",
                carType: "Hatchback",
                buildYear: 2015,
                color: "Black",
                mileage: 100000,
                fuelType: "Benzine",
            },
            {
                chassisNumber: "WUAC6AFR3CA900872",
                brand: "Audi",
                model: "RS5",
                carType: "Coupe",
                buildYear: 2012,
                color: "Red",
                mileage: 80000,
                fuelType: "Benzine",
            },
            {
                chassisNumber: "1FTFW1RG9JFC07972",
                brand: "Ford",
                model: "F-150 Raptor",
                carType: "Pickup",
                buildYear: 2018,
                color: "Red",
                mileage: 50000,
                fuelType: "Diesel",
            },
            {
                chassisNumber: "WF0DP3TH9L4111111",
                brand: "Ford",
                model: "Focus RS",
                carType: "Hatchback",
                buildYear: 2020,
                color: "Blue",
                mileage: 20000,
                fuelType: "Benzine",
            },
        ],
    })

    // Add 3 profiles
    await prisma.profile.createMany({
        data: [
            {
                id: 1,
                firstName: "admin",
                lastName: "admin",
                email: "admin.admin@gmail.com",
                phoneNumber: "123456789",
            },
            {
                id: 2,
                firstName: "user",
                lastName: "user",
                email: "user.user@gmail.com",
                phoneNumber: "987654321",
            },
            {
                id: 3,
                firstName: "andere user",
                lastName: "andere user",
                email: "andere.user@gmail.com",
                phoneNumber: "45454545",
            },
        ],
    })

    // Add profile 1 to user 1
    await prisma.user.update({
        where: { id: 1 },
        data: {
            profileId: 1,
        },
    });

    // Add profile 2 to user 2
    await prisma.user.update({
        where: { id: 2 },
        data: {
            profileId: 2,
        },
    });

    // Add profile 3 to user 3
    await prisma.user.update({
        where: { id: 3 },
        data: {
            profileId: 3,
        },
    });


    // add 3 bookings
    await prisma.booking.create({
        data: {
            startDate: new Date(2023, 4, 1),
            endDate: new Date(2023, 4,10),
            userId: 1,
            cars: {
                connect: [{ chassisNumber: "VF15R5E0F54678912" }]
            }
        }
    });

    await prisma.booking.create({
        data: {
            startDate: new Date(2023, 5,4),
            endDate: new Date(2023, 5, 28),
            userId: 2,
            cars: {
                connect: [{ chassisNumber: "WUAC6AFR3CA900872" }]
            }
        }
    });


    await prisma.booking.create({
        data: {
            startDate: new Date(2023, 6, 21),
            endDate: new Date(2023, 7, 28),
            userId: 3,
            cars: {
                connect: [
                    { chassisNumber: "1FTFW1RG9JFC07972" },
                    { chassisNumber: "WF0DP3TH9L4111111" }
                ]
            }
        },
        include: {
            booker: {
                include: {
                    Profile: true // include profile data of the user who is booking
                }
            }
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
