import { parse } from 'csv-parse';
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const csvPath = './queries.csv';
const prisma = new PrismaClient();

const seed = async () => {
    try {
        let currentQuery: any;
        let line = 1;
        const records = []
        fs.createReadStream(csvPath)
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', async (row) => {

                if (row[0].split(" ").length == 3) {
                    records.push(row[0])
                } else {
                    if (row[0].length > 0) {
                        records.push(row[0]);
                    }
                    line++;
                }
            })
            .on('end', async () => {
                // executed when parsing is complete
                // console.log('File read successful', records);
                for (let index = 0; index < records.length; index++) {
                    if (records[index].split(" ").length === 3) {
                        const timeSent = records[index].split(" ")
                        const timestamp = new Date(`${timeSent[1]} ${timeSent[2]}`)
                        console.log(line, timeSent, " : ", timestamp)
                        const senderName =
                            faker.person.firstName() +
                            ' ' +
                            faker.person.lastName() +
                            ' ' +
                            uuidv4();
                        const user = await prisma.user.upsert({
                            where: {
                                name: senderName,
                            },
                            update: {},
                            create: {
                                name: senderName,
                                type: 'CUSTOMER',
                            },
                        });
                        const query = await prisma.query.create({
                            data: {
                                dateCreated: timestamp,
                                customerName: user.name,
                            },
                        });
                        currentQuery = query;
                        console.log(currentQuery)
                    } else {
                        console.log(records[index])
                        await prisma.message.create({
                            data: {
                                content: records[index],
                                timestamp: currentQuery?.dateCreated ?? new Date(),
                                senderName: currentQuery?.customerName,
                                senderType: "CUSTOMER",
                                queryId: currentQuery.id
                            },
                        });
                    }

                }
            });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

seed();
