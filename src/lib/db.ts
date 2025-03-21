import { PrismaClient } from '@prisma/client';
import { Signer } from '@aws-sdk/rds-signer';

// Extend the global type for Prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Function to generate the database URL with IAM authentication
async function getDbUrl(): Promise<string> {
  try {
    const signer = new Signer({
      region: process.env.REGION || 'ap-southeast-2',
      hostname: 'db-proxy-test.proxy-c1igocew6ur2.ap-southeast-2.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
    });
    const token = await signer.getAuthToken();
    return `postgresql://postgres:${token}@db-proxy-test.proxy-c1igocew6ur2.ap-southeast-2.rds.amazonaws.com:5432/nextjs_app?schema=public&sslmode=require`;
  } catch (error) {
    console.error('Failed to generate IAM token for RDS Proxy:', error);
    throw error;
  }
}

// Singleton pattern for Prisma client with lazy initialization
class PrismaSingleton {
  private static instance: PrismaClient | null = null;
  private static isConnecting = false;
  private static initializationPromise: Promise<PrismaClient> | null = null;

  static async getInstance(): Promise<PrismaClient> {
    // If already initialized, return the instance
    if (PrismaSingleton.instance) {
      return PrismaSingleton.instance;
    }

    // If an initialization is already in progress, wait for it
    if (PrismaSingleton.initializationPromise) {
      return PrismaSingleton.initializationPromise;
    }

    // Prevent multiple concurrent initializations
    if (PrismaSingleton.isConnecting) {
      // Wait until the ongoing initialization completes
      while (PrismaSingleton.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (PrismaSingleton.instance) {
        return PrismaSingleton.instance;
      }
      throw new Error('Prisma client initialization failed');
    }

    // Start a new initialization
    PrismaSingleton.isConnecting = true;
    PrismaSingleton.initializationPromise = (async () => {
      try {
        // If we're in build mode (e.g., `next build`), skip database connection
        if (process.env.NEXT_PHASE === 'phase-production-build') {
          console.log('Skipping Prisma initialization during build phase');
          const client = new PrismaClient();
          PrismaSingleton.instance = client;
          return client;
        }

        // In development or runtime, initialize the real client
        if (!global.prisma) {
          const url = await getDbUrl();
          global.prisma = new PrismaClient({
            datasources: { db: { url } },
            log: ['query', 'info', 'warn', 'error'],
          });

          // Connect to the database
          await global.prisma.$connect();
          console.log('Connected to RDS Proxy successfully');
        }

        PrismaSingleton.instance = global.prisma;

        // In development, store in global for hot reloading
        if (process.env.NODE_ENV !== 'production') {
          global.prisma = PrismaSingleton.instance;
        }

        return PrismaSingleton.instance;
      } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
      } finally {
        PrismaSingleton.isConnecting = false;
        PrismaSingleton.initializationPromise = null;
      }
    })();

    return PrismaSingleton.initializationPromise;
  }
}

// Export a function to get the Prisma client
export async function getPrismaClient(): Promise<PrismaClient> {
  return PrismaSingleton.getInstance();
}

// Export a pre-initialized client for convenience in most cases
let prismaPromise: Promise<PrismaClient> | null = null;

export const prisma = {
  get client() {
    if (!prismaPromise) {
      prismaPromise = PrismaSingleton.getInstance();
    }
    return prismaPromise;
  },
};