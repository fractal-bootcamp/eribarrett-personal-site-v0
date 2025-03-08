import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt function
const prompt = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

async function createBlogPost() {
    try {
        console.log('=== Create Blog Post ===');

        const title = await prompt('Title: ');
        const slug = await prompt('Slug (leave empty to generate from title): ');
        const excerpt = await prompt('Excerpt (optional): ');
        const content = await prompt('Content (HTML): ');
        const publishedInput = await prompt('Publish immediately? (y/n): ');

        const published = publishedInput.toLowerCase() === 'y';

        // Generate slug from title if not provided
        const finalSlug = slug || title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');

        const post = await prisma.post.create({
            data: {
                title,
                slug: finalSlug,
                excerpt: excerpt || undefined,
                content,
                published,
            },
        });

        console.log('\nBlog post created successfully:');
        console.log(`ID: ${post.id}`);
        console.log(`Title: ${post.title}`);
        console.log(`Slug: ${post.slug}`);
        console.log(`Published: ${post.published ? 'Yes' : 'No'}`);
        console.log(`Created at: ${post.createdAt}`);

    } catch (error) {
        console.error('Error creating blog post:', error);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

createBlogPost(); 