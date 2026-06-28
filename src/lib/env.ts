interface EnvVar {
  name: string;
  required: boolean;
  description: string;
}

const envVars: EnvVar[] = [
  {
    name: "DATABASE_URL",
    required: true,
    description: "PostgreSQL database connection string",
  },
  {
    name: "NEXTAUTH_SECRET",
    required: true,
    description: "Secret key for NextAuth session encryption",
  },
  {
    name: "NEXTAUTH_URL",
    required: true,
    description: "Base URL of your application",
  },
  {
    name: "GROQ_API_KEY",
    required: true,
    description: "API key for Groq AI service",
  },
  {
    name: "RAZORPAY_KEY_ID",
    required: true,
    description: "Razorpay key ID for payment processing",
  },
  {
    name: "RAZORPAY_KEY_SECRET",
    required: true,
    description: "Razorpay key secret for payment processing",
  },
  {
    name: "GOOGLE_CLIENT_ID",
    required: false,
    description: "Google OAuth client ID (optional)",
  },
  {
    name: "GOOGLE_CLIENT_SECRET",
    required: false,
    description: "Google OAuth client secret (optional)",
  },
];

export function validateEnv(): void {
  const missing: EnvVar[] = [];
  const errors: string[] = [];

  for (const envVar of envVars) {
    const value = process.env[envVar.name];

    if (envVar.required && !value) {
      missing.push(envVar);
      errors.push(
        `❌ Missing required environment variable: ${envVar.name}\n   Description: ${envVar.description}`
      );
    } else if (value && value.includes("your-") || value === "") {
      if (envVar.required) {
        missing.push(envVar);
        errors.push(
          `⚠️  Environment variable ${envVar.name} is not configured properly\n   Description: ${envVar.description}`
        );
      }
    }
  }

  if (missing.length > 0) {
    console.error("\n=== Environment Variable Validation Failed ===\n");
    errors.forEach((error) => console.error(error));
    console.error("\nPlease set these environment variables before starting the server.\n");
    console.error("You can copy .env.example to .env and fill in the values.\n");
    console.error("=== End Validation Errors ===\n");
    
    // Only throw in runtime, not during build time
    if (typeof window === "undefined" && process.env.NODE_ENV !== "test" && process.env.NEXT_PHASE !== "build") {
      throw new Error(
        `Missing required environment variables: ${missing.map((v) => v.name).join(", ")}`
      );
    }
  } else {
    console.log("✅ All required environment variables are configured.");
  }
}

export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

export function getOptionalEnvVar(name: string): string | undefined {
  return process.env[name];
}
