// future updates: make chatgpt process the content and proofread it
// AI to generate summary of blog post


import { PrismaClient } from '@prisma/client';

import fs from 'fs';
import path from 'path';
import { SupportLanguage } from 'prettier';
import readline from 'readline';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// create a slug from a title

function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// extract an excerpt from the content
function createExcerpt(content: string): string {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
}

/**
 * Prompts the user with a question in the console and returns their answer as a Promise
 * This function creates a readline interface to handle user input/output in the terminal
 * Used for collecting blog post information like title and content interactively
 * @param question The prompt text to display to the user
 * @returns A Promise that resolves to the user's input string
 */
async function promptUser(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin, // sets input source to standard input stream (via keys)
        output: process.stdout, // sets output destination to standard output stream (console)
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function readFromFile(filePath: string): Promise<string> {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        throw new Error('Failed to read file');
    }
}

async function createBlogPost() {
    try {
        console.log('=== Blog Post Creation Tool ===')

        //Get post title 
        const title = await promptUser('Enter blog post title: ');

        //Get post content source 
        const contentSource = await promptUser('Enter content source (1 for file upload, 2 for paste): ');

        let content = '';

        if (contentSource === '1') {
            //File upload 
            const filePath = await promptUser('Enter the path to your text file: ');
            content = await readFromFile(path.resolve(filePath));
        } else {
            //Paste content
            console.log('Paste your content below (press Ctrl+D when finished):');
            const contentLines: string[] = [];

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            for await (const line of rl) {
                contentLines.push(line);
            }

            content = contentLines.join('\n');
        }

        // generate the slug, excerpt and metadata
        const slug = createSlug(title);
        const excerpt = createExcerpt(content);
        const id = uuidv4();

        // Save to database
        const post = await prisma.post.create({
            data: {
                id,
                title,
                content,
                slug,
                excerpt,
                createdAt: new Date(),
            }
        });

        console.log('Blog post created successfully!');
        console.log(`Title: ${post.title}`);
        console.log(`Slug: ${post.slug}`);
        console.log(`Excerpt: ${post.excerpt}`);

        // Save to file 
        const timestamp = Date.now();
        const fileName = `${slug}-${timestamp}.md`;
        const filePath = path.resolve(__dirname, '..', '..', 'content', 'blog', fileName);

        fs.writeFileSync(filePath, content);
        console.log(`Blog post saved to ${filePath}`);

    } catch (error) {
        console.error('Error creating blog post:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script if executed directly
if (require.main === module) {
    createBlogPost();
}

export { createBlogPost, createSlug };

