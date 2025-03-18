// Add missing type declarations here
declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  
  // Add more flexible types for libraries
  declare module 'cloudinary' {
    const v2: any;
    export { v2 };
  }
  
  // Add any other missing type declarations