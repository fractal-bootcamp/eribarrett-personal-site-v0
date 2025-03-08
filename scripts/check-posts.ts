import { PrismaClient } from '@prisma/client';

async function checkPosts() {
    const prisma = new PrismaClient();

    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Connected successfully');

        console.log('Counting posts...');
        const count = await prisma.post.count();
        console.log(`Found ${count} posts`);

        if (count > 0) {
            console.log('Fetching posts...');
            const posts = await prisma.post.findMany();
            console.log('Posts:', posts);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkPosts(); 