declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: string;
    }
  }
}

export {};

//this is an interface merging file;
//global, nodeJS and prcessEnv are located in process.debugPort.ts file
////This is declaration merging - you're extending/augmenting the existing interface rather than replacing it. Very common pattern for adding custom environment variables to the Node.js ProcessEnv interface!and we just adding more fields to interface
//This is declaration merging - you're extending/augmenting the existing interface rather than replacing it. Very common pattern for adding custom environment variables to the Node.js ProcessEnv interface!
